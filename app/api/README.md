## Laravel API

This guide covers the local Docker-based setup and bootstrap steps for the Laravel back-end API.

## Configuration

1. Copy `.env.build` to `.env`:

```shell
cp .env.build .env
```

2. For the Docker development environment, make sure the Laravel database and Redis settings point to the Docker service names:

```env
DB_HOST=database
DB_PORT=3306
DB_DATABASE=starter
DB_USERNAME=root
DB_PASSWORD=8a4hV034dXRsfK

REDIS_HOST=redis
REDIS_PORT=6379
```

3. Add the local domain to `/etc/hosts` on your host machine:

```shell
sudo vim /etc/hosts
```

Add:

```text
127.0.0.1 starter.test
```

4. If your browser, OS, or shell uses a proxy, add `starter.test` to the proxy bypass list.

## Bootstrap the Application

After starting the local Docker Compose development environment from `infrastructure/dev_env`, bootstrap the application from the running containers.

### Laravel API

```shell
docker exec -it app /bin/bash
```

Then run:

```shell
cd /var/www/html/starter/api
composer install
php artisan config:clear
php artisan view:clear
php artisan route:clear
composer dump-autoload
php artisan cache:clear
php artisan config:cache
php artisan route:cache
```

Note: `php artisan migrate:fresh` drops all tables and recreates the database. Use it only for a clean local setup.

```shell
php artisan migrate:fresh
php artisan db:seed
```

### Vue.js Admin Panel SPA

```shell
docker exec -it node /bin/bash
```

Then run:

```shell
cd /usr/app/client/admin
npm install
npm run dev
```

### Nuxt Public Content SSR

```shell
docker exec -it node /bin/bash
```

Then run:

```shell
cd /usr/app/client/public
npm install
npm run dev
```

## Troubleshooting

To fix permission issues for the Laravel folder in `app/api` outside of Docker containers:

```shell
sudo chown -R www-data. .
sudo setfacl -R -m u:$USER:rwx .
```

If `starter.test` opens a proxy page instead of the application, test the local routes directly:

```shell
curl --noproxy '*' -I http://starter.test
curl --noproxy '*' -I http://starter.test/login
```

If these commands return `200 OK`, the local application is reachable and the remaining issue is in the browser or system proxy configuration.

## Useful Commands

Get a list of running or failed containers:

```shell
docker ps -a
```

Execute commands inside the app container:

```shell
docker exec -it app /bin/bash
```

Execute commands inside the node container:

```shell
docker exec -it node /bin/bash
```
