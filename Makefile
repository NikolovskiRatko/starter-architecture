# DOCKER TASKS
starter: ## Start docker containers
	docker compose -f ./infrastructure/dev_env/docker-compose.yml up

starter-node-shell: ## Run node container
	docker exec -it node /bin/bash

starter-app-shell: ## Run PHP container
	docker exec -it app /bin/bash

starter-database-shell: ## Run MongoDB container
	docker exec -it database bash
