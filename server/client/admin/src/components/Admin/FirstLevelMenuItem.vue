<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useAuth } from "@websanova/vue-auth/src/v3.js";
import SecondLevelMenuItem from "@/components/Admin/SecondLevelMenuItem.vue";
import MenuLinkIcon from "@/components/Admin/MenuLinkIcon.vue";

interface Item {
  label: String;
  name: String;
  link: String;
  expanded: boolean;
  permission: String;
  subcategories?: Array<any>;
}

export default defineComponent({
  name: "FirstLevelMenuItem",
  components: {
    SecondLevelMenuItem,
    MenuLinkIcon,
  },
  props: {
    item: {
      type: Object as PropType<Item>,
      default: () => {},
    },
  },
  data() {
    return {
      isExpanded: false,
    };
  },
  computed: {
    submenu() {
      const permissionsArray = this.auth.user().permissions_array;
      return (
        this.item.subcategories?.filter((subMenuItem) =>
          permissionsArray.includes(subMenuItem.permission),
        ) || []
      );
    },
  },
  mounted() {
    this.setInitialExpanded();
  },
  methods: {
    toggleMenu() {
      this.isExpanded = !this.isExpanded;
    },
    isActiveClass(input) {
      let path = input.link;
      let curPath = this.$route.name;
      return path === curPath;
    },
    setInitialExpanded() {
      const currentRoute = this.$route.name;
      const isSubcategoryActive =
        this.item.subcategories?.some((menuItem) => {
          const firstLevelIsActive = menuItem.link === currentRoute;
          if (firstLevelIsActive) {
            return true;
          } else {
            return (
              menuItem.subcategories?.some(
                (secondLevelMenuItem) =>
                  secondLevelMenuItem.link === currentRoute,
              ) || false
            );
          }
        }) || false;

      this.isExpanded = this.item.expanded || isSubcategoryActive;
    },
  },
  setup() {
    const auth = useAuth();
    return { auth };
  },
});
</script>

<template>
  <!-- TODO: add class for submenuyus .kt-menu__item--submenu -->
  <li
    class="kt-menu__item"
    :class="{
      'kt-menu__item--open': isExpanded,
      'kt-menu__item--active': isActiveClass(item),
    }"
  >
    <template v-if="submenu.length">
      <span class="kt-menu__link kt-menu__toggle" @click="toggleMenu()">
        <menu-link-icon />
        <span class="kt-menu__link-text">
          {{ $t(item.label) }}
        </span>
        <i class="kt-menu__ver-arrow la la-angle-right" />
      </span>

      <div class="kt-menu__submenu">
        <span class="kt-menu__arrow" />
        <ul class="kt-menu__subnav">
          <li class="kt-menu__item kt-menu__item--parent" aria-haspopup="true">
            <span class="kt-menu__link">
              <span class="kt-menu__link-text">{{ $t(item.label) }}</span>
            </span>
          </li>
          <second-level-menu-item
            v-for="(subMenuItem, key) in submenu"
            :key="key"
            :subitem="subMenuItem"
          />
        </ul>
      </div>
    </template>

    <router-link v-else :to="{ name: item.link }" class="kt-menu__link">
      <menu-link-icon />
      <span class="kt-menu__link-text">
        {{ $t(item.label) }}
      </span>
    </router-link>
  </li>
</template>
