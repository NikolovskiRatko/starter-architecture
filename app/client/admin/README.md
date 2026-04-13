## Admin Panel

This guide covers the local development and production build steps for the Vue.js Admin Panel single-page application.

## Development

Start the shared Node container:

```shell
docker exec -it node /bin/bash
```

Then run the application from the admin project directory:

```shell
cd /usr/app/client/admin
npm install
npm run dev
```

## Production Build

To build the Admin Panel for production, run:

```shell
cd /usr/app/client/admin
npm install
npm run build
```

## Notes

- This application runs inside the shared `node` container used by the local Docker development environment.
- For the full local setup flow, including Docker Compose startup, Laravel bootstrap, and browser testing, see the development environment guide in `infrastructure/dev_env/README.md`.
