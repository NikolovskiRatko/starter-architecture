# Admin Panel (Vue.js Single Page Application)

Vue.js is a progressive JavaScript framework that helps build interactive user interfaces by combining a simple core library with an ecosystem of supporting tools for large-scale applications.

A single-page application in Vue.js is a web application that dynamically updates and renders only the necessary parts of the page as users interact, rather than reloading the entire page for each request, resulting in a fast and seamless user experience.

## Development Server

For the Vuejs Admin Panel SPA start the app container by running:

```shell
docker exec -it node /bin/bash
```

Then in folder within the node container **app/client/admin** run the following commands:

```shell
npm install && npm run dev
```

## Production

Build the application for production:

```bash
npm install && npm run build
```
