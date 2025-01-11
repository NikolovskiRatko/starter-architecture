<script setup lang="ts">
  import { inject, computed, ref } from "vue";
  import { isMenuMinimizedKey, menuTypeKey } from "../constants";
  import type { MenuLinkProps } from "./types";
  import MenuLinkIcon from "./MenuLinkIcon.vue";
  import { MENU_TYPE } from "../../../constants";
  import { useBEMBuilder } from "../../../helpers";

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
        menuType === MENU_TYPE.vertical ||
        (menuType === MENU_TYPE.horizontal && level > 1)
      );
    }
    return false;
  });

  const [block, element] = useBEMBuilder('kt-menu__link', ref({
    [`${menuType}`]: menuType,
    [`level-${level}`]: level,
    active: isActive,
    'submenu-link': isSubmenuLink,
    minimized: isMinimized
  }))

  const handleClick = (event: Event) => {
    if (hasSubmenu) {
      event.preventDefault();
      emit("click");
    }
  };
</script>

<template>
  <component
    :is="hasSubmenu ? 'span' : 'router-link'"
    :class="block"
    v-bind="hasSubmenu ? {} : { to: route }"
    @click="handleClick"
  >
    <MenuLinkIcon v-if="icon && listStyle === 'icons'" :icon="icon" :is-active="isActive" />
    <i
      v-if="!isMinimized && !['icons', 'none'].includes(listStyle)"
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
  </component>
</template>
