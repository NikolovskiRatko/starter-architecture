#!/bin/bash
#  @author:       ESOF Starter
#  @description:  Pull and Deploy from branch
#

BRANCH="dev"
ROOT_DIR=$(cat "$(dirname "$0")/deploy/sensitive/root_dir")
LOG_FILE="$ROOT_DIR/starter-architecture/basic_infrastructure/ci_cd/logs/deploy.log"
WEBSITE_APP_ROOT="$ROOT_DIR/starter-architecture/server"
DEV_ENV_ROOT="$ROOT_DIR/starter-architecture/infrastructure/dev_env"
DEPLOY_ROOT="$ROOT_DIR/starter-architecture/basic_infrastructure/ci_cd/deploy"

run_pull(){
  cd $WEBSITE_APP_ROOT
  echo -e "\n--=========== Starting execution of pull $BRANCH at $(date)  ===========--\n"

  git checkout -- . && git pull origin "$BRANCH"
}

run_build(){
  # Restore owner and mode
  cd $WEBSITE_APP_ROOT
  sudo chown -R www-data. . && sudo setfacl -R -m u:$USER:rwx .

  cd $DEV_ENV_ROOT

  echo -e "\n--=========== Starting Build stage using Docker Compose at $(date)  ===========--\n"

  echo -e '\n Start dockerized build environment'
  docker compose -f docker-compose.yml up -d
  sleep 10

  echo -e '\n Build API'
  docker exec app /bin/sh -c 'cd starter/api composer install --optimize-autoloader --no-dev'
  docker exec app /bin/sh -c 'cd starter/api php artisan key:generate'
  docker exec app /bin/sh -c 'cd starter/api php artisan config:clear'
  docker exec app /bin/sh -c 'cd starter/api php artisan cache:clear'
  docker exec app /bin/sh -c 'cd starter/api php artisan view:clear'
  docker exec app /bin/sh -c 'cd starter/api php artisan route:clear'
  docker exec app /bin/sh -c 'cd starter/api composer dump-autoload'
  docker exec app /bin/sh -c 'cd starter/api php artisan config:cache'
  docker exec app /bin/sh -c 'cd starter/api php artisan route:cache'

  echo -e '\n Run database migrations'
  docker exec app 'cd starter/api php artisan migrate'

  echo -e '\n Run the build commands for the Admin Panel Vuejs3 SPA'
  docker exec node /bin/sh -c 'cd client/admin && npm install'
  docker exec node /bin/sh -c 'cd client/admin && npm run prod'

  echo -e '\n Run the build commands for the Public Nuxt3 SSR'
  docker exec node /bin/sh -c 'cd client/public && npm install'
  docker exec node /bin/sh -c 'cd client/public && npm run build'
}

run_deploy(){
  echo -e "\n--=========== Starting Deploy stage using Ansible Playbook at $(date)  ===========--\n"
  cd $DEPLOY_ROOT
  ansible-playbook -i inventory starter.yml -vvv
}

run(){
  run_pull >> "$LOG_FILE"
  run_build >> "$LOG_FILE"
  run_deploy >> "$LOG_FILE"
}

run