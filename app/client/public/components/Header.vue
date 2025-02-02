<script lang="ts" setup>
import "./Header.css";
</script>
<template>
  <nav>
    <div class="wrapper">
      <div class="logo"><NuxtImg src="/logo_white.png" /></div>
      <input type="radio" name="slider" id="menu-btn" />
      <input type="radio" name="slider" id="close-btn" />
      <ul class="nav-links">
        <li><nuxt-link to="/">Home</nuxt-link></li>
        <li><nuxt-link to="/about">About</nuxt-link></li>
        <li><nuxt-link to="/contact">Contact</nuxt-link></li>
      </ul>
      <label for="menu-btn" class="btn menu-btn"
        ><i class="fas fa-bars"></i
      ></label>
    </div>
  </nav>
</template>
