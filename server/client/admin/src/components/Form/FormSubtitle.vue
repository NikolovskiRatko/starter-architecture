<script setup lang="ts">
  const props = defineProps(["subtitle", "id"]);
</script>

<template>
  <div>
    <hr />
    <div class="form-row">
      <div class="col-12">
        <h4>{{ subtitle }}</h4>
      </div>
    </div>
  </div>
</template>
