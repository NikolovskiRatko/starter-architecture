## Public Content

This guide covers the local development and production build steps for the Nuxt public-facing application.

## Development

Start the shared Node container:

```shell
docker exec -it node /bin/bash
```

Then run the application from the public project directory:

```shell
cd /usr/app/client/public
npm install
npm run dev
```

## Production Build

To build the public application for production, run:

```shell
cd /usr/app/client/public
npm install
npm run build
```

## Notes

- This application runs inside the shared `node` container used by the local Docker development environment.
- The public application is a Nuxt SSR app.
- For the full local setup flow, including Docker Compose startup, Laravel bootstrap, and browser testing, see the development environment guide in `infrastructure/dev_env/README.md`.
