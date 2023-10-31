<script setup lang="ts">
  import './AuthBase.scss';
</script>

<template>
  <div class="auth-base">
    <div class="auth-base__wrapper">
      <div class="auth-base__container">
        <div class="auth-base__logo">
          <a href="#">
            <img src="build/images/sm_logo.png">
          </a>
        </div>
        <router-view />
        <div class="auth-base__account">
          <span class="auth-base__account-msg">
            Don't have an account yet ?
          </span>
          <a class="auth-base__account-link">Sign Up!</a>
        </div>
      </div>
    </div>
  </div>
</template>
