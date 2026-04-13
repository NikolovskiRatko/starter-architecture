## Run Development Environment And Build Application (MANUALLY)

### Prerequisites

1. Install Docker, Docker Compose, and Git locally.
2. Add the local development domain to `/etc/hosts` on your host machine:

```shell
sudo vim /etc/hosts
```

Add:

```text
127.0.0.1 starter.test
```

### Proxy note for local development

If `starter.test` opens a proxy / Squid error page, the domain is valid, but the request is being sent through a proxy instead of directly to Docker.

Check for proxy variables:

```shell
env | grep -i proxy
```

Temporarily bypass the proxy in the current shell:

```shell
unset http_proxy https_proxy HTTP_PROXY HTTPS_PROXY all_proxy ALL_PROXY
export NO_PROXY=localhost,127.0.0.1,::1,starter.test
export no_proxy=localhost,127.0.0.1,::1,starter.test
```

Verify the local URLs without proxy:

```shell
curl --noproxy '*' -I http://starter.test
curl --noproxy '*' -I http://starter.test/login
```

If these work in the terminal but not in the browser, add this to your browser or OS proxy bypass list:

```text
localhost,127.0.0.1,::1,starter.test
```

These commands affect only the current shell session.

### Build Development Environment

1. Create environment variable files from the build-oriented templates:

```shell
cp .env.build .env
cp ../../app/api/.env.build ../../app/api/.env
```

2. Make sure the `DOCUMENT_ROOT` value in `infrastructure/dev_env/.env` points to the repo `app` folder:

```env
DOCUMENT_ROOT=./../../app
```

3. Adjust ports in `infrastructure/dev_env/.env` if the defaults conflict with anything already running on your machine.

4. Create the bind-mounted directories in `infrastructure/dev_env`:

```shell
mkdir -p data/mysql data/redis logs/apache2 logs/mysql
```

5. From the `infrastructure/dev_env` directory, build and start the containers:

```shell
docker compose build
docker compose up -d
```

6. Verify that the project is mounted correctly inside the containers:

```shell
docker exec -it app bash -lc 'ls -la /var/www/html/starter/api'
docker exec -it node bash -lc 'ls -la /usr/app/client/admin && ls -la /usr/app/client/public'
```

### Bootstrap the application

#### Laravel API

```shell
docker exec -it app /bin/bash
```

Then run:

```shell
cd /var/www/html/starter/api
composer install
```

```shell
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


#### Vue.js Admin Panel SPA

Open a new terminal:

```shell
docker exec -it node /bin/bash
```

Then run:

```shell
cd /usr/app/client/admin
npm install
npm run dev
```

#### Nuxt Public Content SSR

Open another terminal:

```shell
docker exec -it node /bin/bash
```

Then run:

```shell
cd /usr/app/client/public
npm install
npm run dev
```

### Test in the browser

Open:

- `http://starter.test`
- `http://starter.test/login`

If the domain opens a proxy or Squid error page instead of the application, test the local route directly:

```shell
curl --noproxy '*' -I http://starter.test
curl --noproxy '*' -I http://starter.test/login
```

If these commands return `200 OK`, the local application is reachable and the remaining issue is in the browser or system proxy configuration.

### Tips

If you suspect an older broken Docker setup, stop and inspect containers first:

```shell
docker compose down
docker ps -a
```

Use a full Docker prune only if you intentionally want to remove broader Docker state and you understand it can affect other projects:

```shell
docker system prune -a
```

To fix permission issues for the Laravel folder in `app/api` outside of Docker containers:

```shell
sudo chown -R www-data. .
sudo setfacl -R -m u:$USER:rwx .
```

Option 2:

```shell
sudo chown -R $USER:www-data .
sudo find . -type f -exec chmod 664 {} \;
sudo find . -type d -exec chmod 775 {} \;
```

## Useful commands

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
