# Makefile

# Define variables for Docker Compose and project paths
DOCKER_COMPOSE = docker-compose
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
	@echo "  make clean             	# Stop containers and prune Docker resources"
	@echo "  make fix_permissions   	# Fix file permissions for Laravel API"
	@echo "  make lint:fix          	# Run ESLint with auto-fix"
	@echo "  make full_setup        	# Run all setup steps sequentially"

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
	# Create 'data' directory if it does not exist
	@if [ ! -d $(DEV_ENV_DIR)/data ]; then \
		mkdir $(DEV_ENV_DIR)/data; \
		echo "Created $(DEV_ENV_DIR)/data directory"; \
	else \
		echo "$(DEV_ENV_DIR)/data directory already exists. Skipping creation."; \
	fi
	# Create 'logs' directory if it does not exist
	@if [ ! -d $(DEV_ENV_DIR)/logs ]; then \
		mkdir $(DEV_ENV_DIR)/logs; \
		echo "Created $(DEV_ENV_DIR)/logs directory"; \
	else \
		echo "$(DEV_ENV_DIR)/logs directory already exists. Skipping creation."; \
	fi
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
	docker exec -it -w /var/www/html/starter/api $(APP_CONTAINER) bash -c "composer install"
	docker exec -it -w /var/www/html/starter/api $(APP_CONTAINER) bash -c "php artisan config:clear"
	docker exec -it -w /var/www/html/starter/api $(APP_CONTAINER) bash -c "php artisan view:clear"
	docker exec -it -w /var/www/html/starter/api $(APP_CONTAINER) bash -c "php artisan route:clear"
	docker exec -it -w /var/www/html/starter/api $(APP_CONTAINER) bash -c "composer dump-autoload"
	docker exec -it -w /var/www/html/starter/api $(APP_CONTAINER) bash -c "php artisan cache:clear"
	docker exec -it -w /var/www/html/starter/api $(APP_CONTAINER) bash -c "php artisan config:cache"
	docker exec -it -w /var/www/html/starter/api $(APP_CONTAINER) bash -c "php artisan route:cache"
	@echo "PHP dependencies installed and Laravel setup completed."

# 5. Install Admin Panel SPA Vue.js Dependencies
.PHONY: install_client_admin
install_client_admin:
	@echo "Installing Node.js dependencies..."
	docker exec -it -w /usr/app/client/admin $(NODE_CONTAINER) bash -c "npm install"
	@echo "Node.js dependencies installed successfully."

# 6. Run Laravel Migrations and Seeders
.PHONY: migrate_seed
migrate_seed:
	@echo "Running Laravel migrations and seeders..."
	docker exec -it -w /var/www/html/starter/api $(APP_CONTAINER) bash -c "php artisan migrate:fresh --seed"
	@echo "Migrations and seeders executed successfully."

# 7. Start Admin Panel Vue.js Development Server
.PHONY: start_client_admin
start_client_admin:
	@echo "Starting Vue.js development server..."
	docker exec -it -w /usr/app/client/admin $(NODE_CONTAINER) bash -c "npm run dev"
	@echo "Vue.js development server is running."

# 8. Install Public facing SSR Nuxt.js Dependencies
.PHONY: install_client_public
install_client_public:
	@echo "Installing Node.js dependencies..."
	docker exec -it -w /usr/app/client/public $(NODE_CONTAINER) bash -c "npm install"
	@echo "Node.js dependencies installed successfully."

# 9. Start Public facing SSR Nuxt.js Development Server
.PHONY: start_client_public
start_client_public:
	@echo "Starting Vue.js development server..."
	docker exec -it -w /usr/app/client/public $(NODE_CONTAINER) bash -c "npm run dev"
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
.PHONY: fix_permissions
fix_permissions:
	@echo "Fixing file permissions for Laravel API..."
	sudo chown -R $(USER):www-data $(API_DIR)
	sudo find $(API_DIR) -type f -exec chmod 664 {} \;
	sudo find $(API_DIR) -type d -exec chmod 775 {} \;
	@echo "File permissions fixed successfully."

# 12. Full Setup (All Steps)
.PHONY: full_setup
full_setup: setup_env build up fix_permissions install_api install_client_admin install_client_public migrate_seed
	@echo "Full setup completed successfully."