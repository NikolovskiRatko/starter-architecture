<script setup lang="ts">
  import { inject, computed } from "vue";
  import { isMenuMinimizedKey, menuTypeKey } from "../constants";
  import type { MenuLinkProps } from "./types";
  import "./MenuLink.scss";

  const {
    icon = null,
    listStyle = null,
    hasSubmenu = false,
    isSubmenuLink = false,
    badge = null,
    isActive = false,
    level = 1
  } = defineProps<MenuLinkProps>();

  const emit = defineEmits(["click"]);
  const menuType = inject(menuTypeKey);
  const isMinimized = inject(isMenuMinimizedKey);

  const shouldHaveRightArrow = computed<Boolean>(() => {
    if (hasSubmenu) {
      return (
        menuType === "vertical" ||
        (menuType === "horizontal" && level > 1)
      );
    }
    return false;
  });

  const handleClick = (event: Event) => {
    if (hasSubmenu) {
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
      `kt-menu__link--level-${level}`,
      {
        'kt-menu__toggle': hasSubmenu,
        'kt-menu__link--active': isActive,
        'kt-menu__link--submenu-link': isSubmenuLink,
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
          'kt-menu__link-icon--active': isActive,
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
          'kt-menu__link-text--active': isActive,
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
            'kt-menu__link-arrow--active': isActive,
            'kt-menu__link-arrow--here': isActive,
          },
        ]"
      />
    </template>
  </router-link>
</template>
