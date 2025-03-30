<script setup lang="ts">
import { computed } from "vue";
import "./ContentLoader.scss";

interface ContentLoaderProps {
  heightClass: string;
  fullCont?: boolean;
  transparent?: boolean;
}

const props = defineProps<ContentLoaderProps>();
const extraClass = props.fullCont;

const className = computed(() => {
  const classNames: Array<string> = [];
  const { fullCont, transparent, heightClass } = props;

  classNames.push(heightClass);

  if (fullCont) {
    classNames.push("full-cont");
  }

  if (transparent) {
    classNames.push("transparent-loader");
  }

  return classNames.join(" ");
});
</script>

<template>
  <div class="loading-cont" :class="className">
    <div class="loading-overlay">
      <div class="bounce-loader">
        <div class="bounce1" />
        <div class="bounce2" />
        <div class="bounce3" />
      </div>
    </div>
  </div>
</template>
