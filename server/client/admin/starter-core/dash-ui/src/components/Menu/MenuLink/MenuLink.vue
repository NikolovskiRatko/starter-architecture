<script setup lang="ts">
  import { inject, computed } from "vue";
  import { isMenuMinimizedKey, menuTypeKey } from "../constants";
  import type { MenuLinkProps } from "./types";
  import "./MenuLink.scss";

  const props = withDefaults(defineProps<MenuLinkProps>(), {
    listStyle: null,
    hasSubmenu: false,
    isSubmenuLink: false,
    isActive: false,
    badge: null,
    level: 1,
  });
  const emit = defineEmits(["click"]);
  const menuType = inject(menuTypeKey);
  const isMinimized = inject(isMenuMinimizedKey);

  const shouldHaveRightArrow = computed<Boolean>(() => {
    if (props.hasSubmenu) {
      return (
        menuType === "vertical" ||
        (menuType === "horizontal" && props.level > 1)
      );
    }
    return false;
  });

  const handleClick = (event: Event) => {
    if (props.hasSubmenu) {
      event.preventDefault();
      emit("click");
    }
  };
</script>

<template>
  <router-link
    :to="route"
    :class="[
      'kt-menu__link',
      `kt-menu__link--${menuType}`,
      `kt-menu__link--level-${props.level}`,
      {
        'kt-menu__toggle': props.hasSubmenu,
        'kt-menu__link--active': props.isActive,
        'kt-menu__link--submenu-link': props.isSubmenuLink,
        'kt-menu__link--minimized': isMinimized,
      },
    ]"
    @click="handleClick"
  >
    <span
      v-if="icon"
      :class="[
        'kt-menu__link-icon',
        `kt-menu__link-icon--${menuType}`,
        {
          'kt-menu__link-icon--active': props.isActive,
        },
      ]"
    >
      <component :is="icon" />
    </span>

    <i
      v-if="listStyle && !isMinimized"
      :class="['kt-menu__link-bullet', `kt-menu__link-bullet--${listStyle}`]"
    >
      <span />
    </i>

    <span
      :class="[
        'kt-menu__link-text',
        `kt-menu__link-text--${menuType}`,
        {
          'kt-menu__link-text--active': props.isActive,
          'kt-menu__link-text--minimized': isMinimized,
        },
      ]"
    >
      {{ label }}
    </span>

    <span v-if="badge && !isMinimized" class="kt-menu__link-badge">
      <span :class="`kt-badge kt-badge--${badge.theme}`">
        {{ badge.label }}
      </span>
    </span>

    <template v-if="shouldHaveRightArrow && !isMinimized">
      <i
        :class="[
          `kt-menu__link-arrow--${menuType}`,
          'la la-angle-right',
          {
            'kt-menu__link-arrow--active': props.isActive,
            'kt-menu__link-arrow--here': props.isActive,
          },
        ]"
      />
    </template>
  </router-link>
</template>
