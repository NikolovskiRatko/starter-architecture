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