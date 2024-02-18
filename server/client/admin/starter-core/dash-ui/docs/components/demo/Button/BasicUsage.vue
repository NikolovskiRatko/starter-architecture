<script setup>
  import { DashButton } from "../../../../src/index.ts";
  import Icon from "../components/Icon.vue";
</script>

<template>
  <DashButton theme="primary">Primary</DashButton>
  <DashButton theme="secondary">Secondary</DashButton>
  <DashButton theme="success">Success</DashButton>
  <DashButton theme="info">Info</DashButton>
  <DashButton theme="warning">Warning</DashButton>
  <DashButton theme="danger">Danger</DashButton>
  <DashButton theme="link">Link</DashButton>
  <hr />
  <DashButton theme="dark">Link</DashButton>
  <DashButton theme="brand">Link</DashButton>
  <DashButton theme="light">Link</DashButton>
  <hr />
  <DashButton theme="primary" theme-mod="outline">Primary outline</DashButton>
  <DashButton theme="secondary" theme-mod="outline">Secondary outline</DashButton>
  <DashButton theme="success" theme-mod="outline">Success outline</DashButton>
  <DashButton theme="info" theme-mod="outline">Info outline</DashButton>
  <DashButton theme="warning" theme-mod="outline">Warning outline</DashButton>
  <DashButton theme="danger" theme-mod="outline">Danger outline</DashButton>
  <DashButton theme="link" theme-mod="outline">Link outline</DashButton>
  <hr />
  <DashButton theme="primary" theme-mod="outline-hover">Primary hover outline</DashButton>
  <DashButton theme="success" theme-mod="outline-hover">Success hover outline</DashButton>
  <DashButton theme="info" theme-mod="outline-hover">Info hover outline</DashButton>
  <DashButton theme="warning" theme-mod="outline-hover">Warning hover outline</DashButton>
  <DashButton theme="danger" theme-mod="outline-hover">Danger hover outline</DashButton>
  <hr />
  <DashButton :icon="Icon" theme="primary">Primary icon</DashButton>
  <DashButton :icon="Icon" theme="secondary">Secondary icon</DashButton>
  <DashButton :icon="Icon" theme="success">Success icon</DashButton>
  <hr />
  <DashButton theme="primary" size="lg">Primary large</DashButton>
  <DashButton theme="secondary" size="lg">Secondary large</DashButton>
  <DashButton theme="success" size="lg">Success large</DashButton>
  <hr />
  <DashButton theme="primary" size="sm">Primary small</DashButton>
  <DashButton theme="secondary" size="sm">Secondary small</DashButton>
  <DashButton theme="success" size="sm">Success small</DashButton>
  <hr />
  <DashButton theme="primary" font-size="lg">Primary large font</DashButton>
  <DashButton theme="secondary" font-size="lg">Secondary large font</DashButton>
  <DashButton theme="success" font-size="lg">Success large font</DashButton>
  <hr />
  <DashButton theme="primary" font-size="sm">Primary small font</DashButton>
  <DashButton theme="secondary" font-size="sm">Secondary small font</DashButton>
  <DashButton theme="success" font-size="sm">Success small font</DashButton>
  <hr />
  <DashButton theme="primary" is-wide>Primary wide</DashButton>
  <DashButton theme="secondary" is-wide>Secondary wide</DashButton>
  <DashButton theme="success" is-wide>Success wide</DashButton>
  <hr />
  <DashButton theme="primary" height="tall">Primary tall</DashButton>
  <DashButton theme="secondary" height="taller">Secondary taller</DashButton>
  <DashButton theme="success" height="tallest">Success tallest</DashButton>
  <hr />
  <DashButton theme="primary" state="active">Active</DashButton>
  <DashButton theme="secondary" state="disabled">Disabled</DashButton>
  <DashButton theme="dark" state="active">Active</DashButton>
  <DashButton theme="success" state="disabled">Disabled</DashButton>
  <hr />
  <DashButton theme="brand">Brand</DashButton>
  <DashButton theme="default" font-weight="bold" text-transform="uppercase">Button</DashButton>
  <DashButton theme="clean" font-weight="bold" text-transform="uppercase">Button</DashButton>
  <DashButton theme="default" font-weight="bold" text-transform="uppercase" size="sm">Button</DashButton>
  <hr />
  <DashButton theme="primary" type="link" :link-props="{ to: 'http://www.google.com/' }">External link</DashButton>
  <DashButton theme="success" type="submit">External link</DashButton>
  <DashButton theme="brand" type="link" :link-props="{ to: { name: 'dashboard' } }">Router link</DashButton>
  <hr />
  <DashButton theme="primary" is-square>Square</DashButton>
  <DashButton theme="secondary" is-square>Square</DashButton>
  <DashButton theme="success" is-square>Square</DashButton>
  <hr />
  <DashButton theme="info" is-pill>Pill</DashButton>
  <DashButton theme="warning" is-pill>Pill</DashButton>
  <DashButton theme="danger" is-pill>Pill</DashButton>
  <hr />
  <DashButton theme="primary" is-square elevate="elevate">Square elevated</DashButton>
  <DashButton theme="secondary" is-square elevate="elevate">Square elevated</DashButton>
  <DashButton theme="success" is-square elevate="elevate">Square elevated</DashButton>
  <hr />
  <DashButton theme="info" elevate="elevate" is-pill>Pill elevated</DashButton>
  <DashButton theme="warning" elevate="elevate" is-pill>Pill elevated</DashButton>
  <DashButton theme="danger" elevate="elevate" is-pill>Pill elevated</DashButton>
  <hr />
  <DashButton theme="info" elevate="elevate" size="sm" is-pill>Small pill elevated</DashButton>
  <DashButton theme="warning" elevate="elevate" size="sm" is-pill>Small pill elevated</DashButton>
  <DashButton theme="danger" elevate="elevate" size="sm" is-pill>Small pill elevated</DashButton>
  <hr />
  <DashButton theme="info" elevate="elevate-air">Hover elevated</DashButton>
  <DashButton theme="warning" elevate="elevate-air">Hover elevated</DashButton>
  <DashButton theme="danger" elevate="elevate-air">Hover elevated</DashButton>
  <hr />
  <DashButton theme="info" elevate="elevate-air" is-pill>Pill Hover elevated</DashButton>
  <DashButton theme="warning" elevate="elevate-air" is-pill>Pill Hover elevated</DashButton>
  <DashButton theme="danger" elevate="elevate-air" is-pill>Pill Hover elevated</DashButton>
  <hr />
  <DashButton theme="info" elevate="elevate-air" size="sm" is-pill>Small pill Hover elevated</DashButton>
  <DashButton theme="warning" elevate="elevate-air" size="sm" is-pill>Small pill Hover elevated</DashButton>
  <DashButton theme="danger" elevate="elevate-air" size="sm" is-pill>Small pill Hover elevated</DashButton>
</template>

<style scoped>
  .btn {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
  hr {
    margin: 1rem 0;
  }
</style>
