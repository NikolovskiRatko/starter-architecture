<script setup lang="ts">
definePageMeta({ requireAuth: false });
useHead({ title: 'Access denied' });
</script>

<template>
  <div class="container py-5 text-center">
    <h1 class="display-5">Access denied</h1>
    <p class="lead text-muted">
      Your account doesn't have access to this page. If you believe this is a mistake,
      contact your administrator.
    </p>
    <NuxtLink to="/" class="btn btn-primary mt-3">Back to home</NuxtLink>
  </div>
</template>
