<script setup lang="ts">
  import './AuthBase.scss';

  const { title } = defineProps<{
    title: string;
  }>();
</script>

<template>
  <div class="auth-base">
    <div class="auth-base__wrapper">
      <div class="auth-base__container">
        <div class="auth-base__logo">
          <a href="#">
            <img src="@/../assets/images/sm_logo.png" />
          </a>
        </div>
        <div class="auth-base__head">
          <h3 class="auth-base__title">{{ title }}</h3>
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>
