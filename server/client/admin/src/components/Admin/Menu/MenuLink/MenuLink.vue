<script setup lang="ts">
import { defineComponent, PropType } from "vue";

import { briefcaseIcon } from "@/data/navMenu";

import { BadgeType } from "./types";
import { MenuListStyle } from "../Submenu/types";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  route: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: false,
    default: "",
  },
  listStyle: {
    type: String as PropType<MenuListStyle> | null,
    required: false,
    default: null,
  },
  hasSubmenu: Boolean,
  badge: {
    type: Object as PropType<BadgeType> | null,
    required: false,
    default: null,
  },
});
const emit = defineEmits(["click"]);

const svgIcon = briefcaseIcon;

const handleClick = (event) => {
  if (props.hasSubmenu) {
    event.preventDefault();
    emit("click");
  }
};
</script>

<template>
  <a
    :href="route"
    :class="[
      'kt-menu__link',
      {
        'kt-menu__toggle': hasSubmenu,
      },
    ]"
    @click="handleClick"
  >
    <span v-if="icon" class="kt-menu__link-icon" v-html="svgIcon" />

    <i
      v-if="listStyle"
      :class="['kt-menu__link-bullet', `kt-menu__link-bullet--${listStyle}`]"
    >
      <span />
    </i>

    <span class="kt-menu__link-text">
      {{ label }}
    </span>

    <span v-if="badge" class="kt-menu__link-badge">
      <span :class="`kt-badge kt-badge--${badge.theme}`">
        {{ badge.label }}
      </span>
    </span>

    <template v-if="hasSubmenu">
      <i class="kt-menu__hor-arrow la la-angle-right" />
      <i class="kt-menu__ver-arrow la la-angle-right" />
    </template>
  </a>
</template>
