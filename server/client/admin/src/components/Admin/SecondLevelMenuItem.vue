<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import ThirdLevelMenuItem from '@/components/Admin/ThirdLevelMenuItem.vue';

  interface Item {
    label: String;
    name: String;
    link: String;
    expanded: boolean;
    permission: String;
    subcategories?: Array<any>;
  }

  export default defineComponent({
    name: 'SecondLevelMenuItem',
    components: {
      ThirdLevelMenuItem
    },
    props: {
      subitem: {
        type: Object as PropType<Item>,
        default: () => {}
      }
    },
    data() {
      return {
        isExpanded: false
      }
    },
    computed: {
      submenu() {
        const permissionsArray = this.$auth.user().permissions_array;
        return this.subitem.subcategories?.filter(subMenuItem => permissionsArray.includes(subMenuItem.permission)) || [];
      }
    },
    mounted() {
      const isSubcategoryActive = this.subitem.subcategories?.some(menuItem => menuItem.link === this.$route.name) || false;
      this.isExpanded = this.subitem.expanded || isSubcategoryActive;
    },
    methods: {
      toggleMenu() {
        this.isExpanded = !this.isExpanded;
      },
      isActiveClass(input) {
        let path = input.link;
        let curPath = this.$route.name;
        return path === curPath;
      }
    }
  })
</script>

<template>
  <li
    class="kt-menu__item kt-menu__item--submenu"
    :class="{
      'kt-menu__item--open' : isExpanded,
      'kt-menu__item--active' : isActiveClass(subitem),
    }"
    aria-haspopup="true"
  >
    <template v-if="submenu.length">
      <span
        class="kt-menu__link kt-menu__toggle vtoriotoggle"
        @click="toggleMenu()"
      >
        <i class="kt-menu__link-bullet kt-menu__link-bullet--line"><span /></i>
        <span class="kt-menu__link-text">
          {{ $t(subitem.label) }}
        </span>
        <i class="kt-menu__ver-arrow la la-angle-right" />
      </span>

      <div class="kt-menu__submenu ">
        <span class="kt-menu__arrow" />
        <ul class="kt-menu__subnav">
          <third-level-menu-item
            v-for="(subMenuItem,key) in submenu"
            :key="key"
            :subsubitem="subMenuItem"
          />
        </ul>
      </div>
    </template>

    <router-link
      v-else
      class="kt-menu__link"
      :to="{ name: subitem.link, params: { type: subitem.type } }"
    >
      <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
        <span />
      </i>
      <span class="kt-menu__link-text">{{ $t(subitem.label) }}</span>
    </router-link>
  </li>
</template>
