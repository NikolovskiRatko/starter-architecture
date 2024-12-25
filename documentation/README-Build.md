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

### Available Makefile targets:

**make setup_env**         # Setup environment variables by copying .env.build to .env

**make build**             # Build Docker images

**make up**                # Start Docker containers in detached mode

**make install_api**      # Install PHP dependencies and run Laravel setup inside app container

**make install_client_admin**    # Install Admin Panel SPA Vue.js dependencies inside node container

**make install_client_public**    # Install Public Content SSR Nuxt.js dependencies inside node container

**make migrate_seed**      # Run Laravel migrations and seeders inside app container

**make start_client_admin**      # Start Admin Panel SPA Vue.js development server inside node container

**make start_client_public**      # Start Public Content SSR Nuxt.js development server inside node container

**make clean**            # Stop containers and prune Docker resources

**make fix_permissions**   # Fix file permissions for Laravel API

**make lint:fix**        # Run ESLint with auto-fix

**make full_setup**        # Run all setup steps sequentially
