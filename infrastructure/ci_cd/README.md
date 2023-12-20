# Public Content (Nuxt Server Side Rendering)

Vue.js is a progressive JavaScript framework for building user interfaces. It emphasizes simplicity and flexibility, allowing developers to create interactive and dynamic front-end applications with ease.

## Development Server

For the Nuxt Public Content SSR start the app container by running:
```shell
docker exec -it node /bin/bash
```
Then in folder within the node container **server/client/public** run the following commands:
```shell
npm install && npm run dev
```

## Production

Build the application for production:

```bash
npm install && npm run build
```
Start pm2 process manager:

```bash
pm2 start ecosystem.config.cjs --only dev
```