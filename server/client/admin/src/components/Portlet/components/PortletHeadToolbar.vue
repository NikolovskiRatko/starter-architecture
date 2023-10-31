<script setup lang="ts">
  import './PortletHeadToolbar.scss';
</script>

<template>
  <div class="kt-portlet__head__toolbar">
    <div class="kt-portlet__head__toolbar__wrapper">
      <div class="kt-portlet__head-actions">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
