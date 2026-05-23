<script lang="ts" setup>
import './Header.css';

const auth = useAuthStore();
</script>
<template>
  <nav>
    <div class="wrapper">
      <div class="logo"><NuxtImg src="/logo_white.png" /></div>
      <input id="menu-btn" type="radio" name="slider" />
      <input id="close-btn" type="radio" name="slider" />
      <ul class="nav-links">
        <li><nuxt-link to="/">Home</nuxt-link></li>
        <li><nuxt-link to="/about">About</nuxt-link></li>
        <li><nuxt-link to="/contact">Contact</nuxt-link></li>
        <li v-if="auth.isAuthenticated && auth.contexts.public">
          <nuxt-link to="/dashboard">Dashboard</nuxt-link>
        </li>
        <li v-if="!auth.isAuthenticated">
          <nuxt-link to="/login">Sign in</nuxt-link>
        </li>
      </ul>
      <label for="menu-btn" class="btn menu-btn"><i class="fas fa-bars" /></label>
    </div>
  </nav>
</template>
