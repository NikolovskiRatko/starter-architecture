### Run using Makefile

Prerequisites: Docker, Docker Compose, Make, and (one-time) the host entry `127.0.0.1 starter.test` in `/etc/hosts` (requires `sudo`).

1. From the repo root, run the full end-to-end setup. Non-interactive; no `sudo` prompts:

    ```shell
    make full_setup
    ```

    This runs `setup_env` → `build` → `up` → `install_api` → `install_client_admin` → `install_client_public` → `migrate_seed`. `migrate_seed` is destructive (`migrate:fresh --seed`) — re-run only on a clean DB.

2. Start the Vue admin SPA dev server (Vite on `:5173`, HMR) in one terminal:

    ```shell
    make start_client_admin
    ```

3. Start the Nuxt SSR public app (on `:3030`) in another terminal:

    ```shell
    make start_client_public
    ```

4. Open the application in a browser:

   - Laravel + admin SPA: <http://starter.test/login>
   - Nuxt public: <http://localhost:3030>

If `make help` and this guide disagree on target descriptions, `make help` wins — see [`README-Build.md`](./README-Build.md) for the canonical snapshot.