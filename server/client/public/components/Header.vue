<template>
  <nav>
    <div class="wrapper">
      <div class="logo"><NuxtImg src="/logo_white.png" /></div>
        
      <input type="radio" name="slider" id="menu-btn">
      <input type="radio" name="slider" id="close-btn">
      <ul class="nav-links">
        <label for="close-btn" class="btn close-btn"><i class="fas fa-times"></i></label>
        <li><nuxt-link to="/">Home</nuxt-link></li>
        <li><nuxt-link to="/about">About</nuxt-link></li>
        <li><nuxt-link to="/technology">Technology</nuxt-link></li>
        <li><nuxt-link to="/contact">Contact</nuxt-link></li>
        
      </ul>
      <label for="menu-btn" class="btn menu-btn"><i class="fas fa-bars"></i></label>
    </div>
  </nav>
</template>

<style scoped>
.logo > img {
  width: 225px;
}

</style>