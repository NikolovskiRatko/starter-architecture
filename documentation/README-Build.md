## CLONE, BUILD AND RUN (AUTOMATED)

### Clone Git Repository, Run Docker Compose Development Environment, Build and Start the Application

### Prerequisites

1. Install Docker Compose, Git, and Make locally.

    ## Installation Guides

    - [Windows Setup Guide](./README-Windows.md)
    - [macOS Setup Guide](./README-macOS.md)
    - [Linux Setup Guide](./README-Linux.md)

    ## Automated Build and Run

    - [Makefile Setup Guide](./README-Automated.md)

    ## Manual Build and Run

    - [Docker Compose Setup Guide](./README-Manual.md)


2. Append the dev domain name `127.0.0.1   starter.test` in `/etc/hosts`:

    ```shell
    sudo vim /etc/hosts
    ```

### Clone the Git Repository (Public)

https://github.com/NikolovskiRatko/starter-architecture

1. Clone the public git repository by running the following command in the terminal:

    ```shell
    git clone https://github.com/NikolovskiRatko/starter-architecture.git
    ```
   
### Run using Makefile

1. Run all setup steps sequentially in the root folder of the project (cd user-login)

    ```shell
    make full_setup
    ```

2. Start Vue.js development server for the Admin Panel SPA inside node container

    ```shell
    make start_client_admin
    ```
   
3. Start Nuxt.js development server for the Public Content SSR app inside node container

    ```shell
    make start_client_public
    ```
4. Visit starter.test url in the browser

   http://starter.test/login

**Happy Coding! 🚀**

### Available Makefile targets

Run `make help` for the always-current list. Snapshot:

**make setup_env**           # Copy `.env.build` → `.env` in `infrastructure/dev_env/` and `app/api/`; create the bind-mount subdirs (`data/{mysql,redis}`, `logs/{apache2,mysql}`)

**make build**               # Build Docker images

**make up**                  # Start Docker containers in detached mode

**make install_api**         # Install PHP deps and run Laravel `config:clear` / `cache:clear` / `config:cache` cycle inside the `app` container

**make install_client_admin**   # `npm install` inside the `node` container for the Vue SPA admin panel

**make install_client_public**  # `npm install` inside the `node` container for the Nuxt SSR public app

**make migrate_seed**        # Run `php artisan migrate:fresh --seed` (DESTRUCTIVE — drops all tables; use only for clean local setup)

**make start_client_admin**  # `npm run dev` for the Vue admin SPA (Vite on :5173, HMR)

**make start_client_public** # `npm run dev` for the Nuxt SSR public app (:3030)

**make down**                # Stop containers (safe, non-destructive)

**make clean**               # `down` + `docker system prune -a -f` (WARNING: affects all Docker state on the machine, not just this project)

**make fix_permissions**     # Opt-in: `chown` `app/api` so the host user + container's `www-data` both have write access. NOT part of `full_setup` because it needs `sudo`. Run only if you hit "Permission denied" errors.

**make shell_app** / **make shell_node**  # Open a bash shell inside the named container

**make full_setup**          # Non-interactive end-to-end: `setup_env` → `build` → `up` → `install_api` → `install_client_admin` → `install_client_public` → `migrate_seed`. No `sudo` required.
