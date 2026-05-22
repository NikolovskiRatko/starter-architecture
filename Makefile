# Makefile

# Export UID/GID so docker compose substitutes the running user's IDs into
# the app image's WWW_DATA_UID / WWW_DATA_GID build args. Bash's $UID is a
# shell variable, not always exported; explicit `export` here removes the
# ambiguity for any non-interactive invocation (CI, scripts, `make -j`).
export UID := $(shell id -u)
export GID := $(shell id -g)

# Define variables for Docker Compose and project paths
DOCKER_COMPOSE := $(shell \
  if docker compose version >/dev/null 2>&1; then \
    echo "docker compose"; \
  elif docker-compose version >/dev/null 2>&1 2>&1; then \
    echo "docker-compose"; \
  else \
    echo ""; \
  fi)
DEV_ENV_DIR = infrastructure/dev_env
API_DIR = app/api
CLIENT_DIR = app/client

# Define .env build files
DEV_ENV_SAMPLE = $(DEV_ENV_DIR)/.env.build
API_ENV_SAMPLE = $(API_DIR)/.env.build

# Define Docker containers names
APP_CONTAINER = app
NODE_CONTAINER = node
DATABASE_CONTAINER = database
REDIS_CONTAINER = redis

# Path to docker-compose.yml
DOCKER_COMPOSE_FILE = $(DEV_ENV_DIR)/docker-compose.yml

# Default target
.PHONY: help
help:
	@echo "Available Makefile targets:"
	@echo "  make setup_env         	# Setup environment variables by copying .env.build to .env"
	@echo "  make build             	# Build Docker images"
	@echo "  make up                	# Start Docker containers in detached mode"
	@echo "  make install_api       	# Install PHP dependencies and run Laravel setup inside app container"
	@echo "  make install_client_admin  # Install Vue.js dependencies inside node container (for Vue.js Admin Panel SPA)"
	@echo "  make install_client_public # Install Nuxt.js dependencies inside node container (for Nuxt.js Public facing SSR)"
	@echo "  make migrate_seed      	# Run Laravel migrations and seeders inside app container"
	@echo "  make start_client_admin    # Start Vue.js development server inside node container"
	@echo "  make start_client_public   # Start Nuxt.js development server inside node container"
	@echo "  make down              	# Stop Docker containers (safe; non-destructive)"
	@echo "  make clean             	# Stop containers + 'docker system prune -a -f' (WARNING: affects all Docker state on the machine)"
	@echo "  make fix_permissions   	# Opt-in: chown app/api so the host user + container www-data both have write access (NOT in full_setup; run only if you hit permission errors)"
	@echo "  make shell_app         	# Open a bash shell inside the app container"
	@echo "  make shell_node        	# Open a bash shell inside the node container"
	@echo "  make full_setup        	# Run all setup steps sequentially (non-interactive — no sudo)"

# 1. Setup Environment Variables
.PHONY: setup_env
setup_env:
	@echo "Setting up environment variables..."
	@if [ ! -f $(DEV_ENV_DIR)/.env ]; then \
		cp $(DEV_ENV_SAMPLE) $(DEV_ENV_DIR)/.env; \
		echo "Copied $(DEV_ENV_SAMPLE) to $(DEV_ENV_DIR)/.env"; \
	else \
		echo "$(DEV_ENV_DIR)/.env already exists. Skipping copy."; \
	fi
	@if [ ! -f $(API_DIR)/.env ]; then \
		cp $(API_ENV_SAMPLE) $(API_DIR)/.env; \
		echo "Copied $(API_ENV_SAMPLE) to $(API_DIR)/.env"; \
	else \
		echo "$(API_DIR)/.env already exists. Skipping copy."; \
	fi
	# Create the bind-mount target subdirectories. docker-compose.yml binds
	# data/mysql, data/redis, logs/apache2, logs/mysql — if Docker creates
	# them lazily they end up owned by root, which can break MySQL boot on
	# some Linux configurations. `mkdir -p` is idempotent so this is safe
	# to re-run.
	@mkdir -p \
		$(DEV_ENV_DIR)/data/mysql \
		$(DEV_ENV_DIR)/data/redis \
		$(DEV_ENV_DIR)/logs/apache2 \
		$(DEV_ENV_DIR)/logs/mysql
	@echo "Ensured $(DEV_ENV_DIR)/{data/mysql,data/redis,logs/apache2,logs/mysql}"
	@echo "Environment variables setup process completed."

# 2. Build Docker Images
.PHONY: build
build:
	@echo "Building Docker images..."
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) build
	@echo "Docker images built successfully."

# 3. Start Docker Containers
.PHONY: up
up:
	@echo "Starting Docker containers..."
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) up -d
	@echo "Docker containers started successfully."

# 4. Install PHP Dependencies and Laravel Setup
.PHONY: install_api
install_api:
	@echo "Installing PHP dependencies and setting up Laravel..."
	docker exec -w /var/www/html/starter/api $(APP_CONTAINER) bash -c "composer install"
	docker exec -w /var/www/html/starter/api $(APP_CONTAINER) bash -c "php artisan config:clear"
	docker exec -w /var/www/html/starter/api $(APP_CONTAINER) bash -c "php artisan view:clear"
	docker exec -w /var/www/html/starter/api $(APP_CONTAINER) bash -c "php artisan route:clear"
	docker exec -w /var/www/html/starter/api $(APP_CONTAINER) bash -c "composer dump-autoload"
	docker exec -w /var/www/html/starter/api $(APP_CONTAINER) bash -c "php artisan cache:clear"
	docker exec -w /var/www/html/starter/api $(APP_CONTAINER) bash -c "php artisan config:cache"
	docker exec -w /var/www/html/starter/api $(APP_CONTAINER) bash -c "php artisan route:cache"
	@echo "PHP dependencies installed and Laravel setup completed."

# 5. Install Admin Panel SPA Vue.js Dependencies
.PHONY: install_client_admin
install_client_admin:
	@echo "Installing Node.js dependencies..."
	docker exec -w /usr/app/client/admin $(NODE_CONTAINER) bash -c "npm install"
	@echo "Node.js dependencies installed successfully."

# 6. Run Laravel Migrations and Seeders
.PHONY: migrate_seed
migrate_seed:
	@echo "Running Laravel migrations and seeders..."
	docker exec -w /var/www/html/starter/api $(APP_CONTAINER) bash -c "php artisan migrate:fresh --seed"
	@echo "Migrations and seeders executed successfully."

# 7. Start Admin Panel Vue.js Development Server
.PHONY: start_client_admin
start_client_admin:
	@echo "Starting Vue.js development server..."
	docker exec -w /usr/app/client/admin $(NODE_CONTAINER) bash -c "npm run dev"
	@echo "Vue.js development server is running."

# 8. Install Public facing SSR Nuxt.js Dependencies
.PHONY: install_client_public
install_client_public:
	@echo "Installing Node.js dependencies..."
	docker exec -w /usr/app/client/public $(NODE_CONTAINER) bash -c "npm install"
	@echo "Node.js dependencies installed successfully."

# 9. Start Public facing SSR Nuxt.js Development Server
.PHONY: start_client_public
start_client_public:
	@echo "Starting Vue.js development server..."
	docker exec -w /usr/app/client/public $(NODE_CONTAINER) bash -c "npm run dev"
	@echo "Vue.js development server is running."

# 10. Stop Containers and Prune Docker Resources
.PHONY: clean
clean:
	@echo "Stopping Docker containers..."
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) down
	@echo "Pruning Docker system (this will remove all stopped containers, networks not used by any container, dangling images, and build cache)..."
	docker system prune -a -f
	@echo "Docker system pruned successfully."

# 11. Fix File Permissions for Laravel API
#
# Opt-in escape hatch. NOT part of full_setup because it requires interactive
# sudo. With the matched WWW_DATA_UID/GID from the host (set near the top of
# this Makefile), the container writes to app/api as the host user — so this
# target should rarely be needed. Run it manually only if you hit
# "Permission denied" when composer/artisan tries to write inside app/api.
.PHONY: fix_permissions
fix_permissions:
	@echo "Fixing file permissions for Laravel API (requires sudo)..."
	sudo chown -R $(USER):www-data $(API_DIR)
	sudo find $(API_DIR) -type f -exec chmod 664 {} \;
	sudo find $(API_DIR) -type d -exec chmod 775 {} \;
	@echo "File permissions fixed successfully."

# 12. Full Setup (All Steps) — non-interactive, no sudo required.
# fix_permissions is intentionally NOT in this chain; run it manually if needed.
.PHONY: full_setup
full_setup: setup_env build up install_api install_client_admin install_client_public migrate_seed
	@echo "Full setup completed successfully."

# 13. Enter node container shell
.PHONY: shell_node
shell_node:
	docker exec -it $(NODE_CONTAINER) /bin/bash

# 14. Enter app container shell
.PHONY: shell_app
shell_app:
	docker exec -it $(APP_CONTAINER) /bin/bash

# 15. Stop Docker Containers
.PHONY: down
down:
	@echo "Stopping Docker containers..."
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) down
	@echo "Docker containers are stopped successfully."