# Getting Started

## Setup

This setup assumes your client app is created with Vite and vue-ts template, and you use 'npm link' to link to `my-lib` locally.

In your `package.json`, you shall have the dependencies compatible with the following:

```json
"dependencies": {
  "primeflex": "^3.1.2",
  "primeicons": "^5.0.0",
  "primevue": "^3.11.1",
  "vue": "^3.2.25"
}
```

In your `vite.config.ts`, you shall configure to dedupe `vue`:

```ts
export default defineConfig({
  resolve: {
    dedupe: ["vue"],
  },
});
```

In your `main.ts`, you shall import the libraries and CSS:

```ts
import "@starter-core/dash-ui/src/assets/main.scss";
import "@starter-core/dash-ui/index.css";
```

Import components from this library in your own component:

```html
<script setup lang="ts">
    import { PortletComponent, PortletBody } from "@starter-core/dash-ui";
</script>
```
