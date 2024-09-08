<script setup lang="ts">
  import { computed, ref, inject, withDefaults } from "vue";
  import MenuLink from "../MenuLink/MenuLink.vue";
  import SubMenu from "../SubMenu/SubMenu.vue";
  import { menuTypeKey, menuThemeKey, isMenuMinimizedKey } from "../constants";
  import useOnClickOutside from "@/composables/useOnClickOutside";
  import type { MenuItemProps } from "./types";
  import "./MenuItem.scss";

  const props = withDefaults(defineProps<MenuItemProps>(), {
    isTopLevelItem: false,
    isActive: false,
    level: 1
  })

  const isSubmenuVisible = ref(false);
  const menuType = inject(menuTypeKey);
  const menuTheme = inject(menuThemeKey);
  const isMinimized = inject(isMenuMinimizedKey);
  const itemRef = ref();

  const menuItemClass = computed(() => {
    const { submenu } = props.item;
    let classNameArray = [
      "kt-menu__item",
      `kt-menu__item--${menuType}`,
      `kt-menu__item--level-${props.level}`,
    ];

    if (isMinimized?.value) {
      classNameArray.push("kt-menu__item--minimized");
    }

    if (submenu) {
      classNameArray.push("kt-menu__item--submenu");
      if (menuTheme === "classic") {
        classNameArray.push("kt-menu__item--rel");
      }
      if (isSubmenuVisible.value) {
        classNameArray.push("kt-menu__item--hover");
      }
    }

    if (props.level === 1) {
      classNameArray.push("kt-menu__item--top-level");
    } else {
      classNameArray.push("kt-menu__item--submenu-item");
    }

    if (props.isActive) {
      classNameArray.push("kt-menu__item--active");
    }

    // classNameArray.push('kt-menu__item--open kt-menu__item--here');
    return classNameArray.join(" ");
  });
  const submenu = computed(() => props.item.submenu ?? null);

  const toggleSubmenu = (visibility?: boolean, delay?: number) => {
    const valueToSet =
      visibility !== undefined ? visibility : !isSubmenuVisible.value;
    if (delay) {
      setTimeout(() => {
        isSubmenuVisible.value = valueToSet;
      }, delay);
    } else {
      isSubmenuVisible.value = valueToSet;
    }
  };

  const menuClickHandler = () => {
    if (
      (menuType === "horizontal" && submenu && props.isTopLevelItem) ||
      (menuType === "vertical" && submenu)
    ) {
      toggleSubmenu();
    }
  };

  const mouseOverHandler = () => {
    if (submenu && !props.isTopLevelItem && menuType === "horizontal") {
      toggleSubmenu(true);
    }
  };

  const mouseLeaveHandler = () => {
    if (submenu && !props.isTopLevelItem && menuType === "horizontal") {
      toggleSubmenu(false, 300);
    }
  };

  useOnClickOutside(itemRef, () => {
    if (isSubmenuVisible.value && menuType === "horizontal") {
      toggleSubmenu(false);
    }
  });

</script>

<template>
  <li
    :class="menuItemClass"
    aria-haspopup="true"
    @mouseover="mouseOverHandler"
    @mouseleave="mouseLeaveHandler"
    ref="itemRef"
  >
    <MenuLink
      :route="item.route"
      :icon="item.icon"
      :list-style="style"
      :label="item.label"
      :badge="item.badge"
      :is-active="props.isActive || isSubmenuVisible"
      :has-submenu="!!submenu"
      :is-submenu-link="!props.isTopLevelItem"
      :level="props.level"
      @click="menuClickHandler"
    />
    <SubMenu
      v-if="!!submenu && !isMinimized"
      :items="submenu.items"
      :stick-to-side="submenu.stickToSide"
      :is-expanded="submenu.isExpanded"
      :is-mega-menu="submenu.isMegaMenu"
      :is-visible="isSubmenuVisible"
      :list-style="submenu.listStyle"
      :level="props.level"
    />
  </li>
</template>
