<script setup lang="ts">
import { PropType, computed, ref } from "vue";
import { MenuTheme } from "@/components/Admin/Menu/types";

const props = defineProps({
  item: {
    type: Object as PropType<any>,
    required: true,
  },
  theme: {
    type: String as PropType<MenuTheme>,
    default: "classic",
  },
  isTopLevelItem: {
    type: Boolean,
    default: false,
  },
});

const isSubmenuVisible = ref(false);
const hasSubmenu = !!props.item.submenu;

const menuItemClass = computed(() => {
  const { item, theme } = props;
  const { submenu, route } = item;
  let classNameArray = ["kt-menu__item"];

  if (submenu) {
    classNameArray.push("kt-menu__item--submenu");
    if (theme === "classic") {
      classNameArray.push("kt-menu__item--rel");
    }
    if (isSubmenuVisible.value) {
      classNameArray.push("kt-menu__item--hover");
    }
  }

  if (route === "demo1/index.html") {
    classNameArray.push("kt-menu__item--active");
  }

  // classNameArray.push('kt-menu__item--open kt-menu__item--here');
  return classNameArray.join(" ");
});

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
  if (hasSubmenu && props.isTopLevelItem) {
    toggleSubmenu();
  }
};

const mouseOverHandler = () => {
  if (hasSubmenu && !props.isTopLevelItem) {
    toggleSubmenu(true);
  }
};

const mouseLeaveHandler = () => {
  if (hasSubmenu && !props.isTopLevelItem) {
    toggleSubmenu(false, 300);
  }
};

//TODO: Add logic to compare with current route path
const isActive = (item) => item.route === "demo1/index.html";
</script>

<template>
  <li
    :class="menuItemClass"
    aria-haspopup="true"
    @mouseover="mouseOverHandler"
    @mouseleave="mouseLeaveHandler"
  >
    <MenuLink
      :route="item.route"
      :icon="item.icon"
      :list-style="item.listStyle"
      :label="item.label"
      :badge="item.badge"
      :has-submenu="hasSubmenu"
      @click="menuClickHandler"
    />
    <SubMenu
      v-if="hasSubmenu"
      :items="item.submenu.items"
      :stick-to-side="item.submenu.stickToSide"
      :theme="theme"
      :is-expanded="item.submenu.isExpanded"
      :list-style="item.submenu.listStyle"
    />
  </li>
</template>
