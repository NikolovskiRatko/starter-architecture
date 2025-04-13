<script setup>
  import { IconUser } from "@starter-core/icons";
  import { ref, computed } from "vue";
  import HeaderUserBarListItem from "./HeaderUserBarListItem.vue";
  import { useAuth } from "@/composables";
  import { USER_ROUTES_DATA } from "@/modules/users/constants";
  import { BadgeComponent } from "@starter-core/dash-ui/src";
  import { useOnClickOutside } from "@starter-core/dash-ui/src/composables";

  import "./HeaderUserBar.scss";

  const { logout, user, avatar } = useAuth();
  const isDropdownVisible = ref(false);
  const dropdownRef = ref();

  const toggleDropdown = () =>
    (isDropdownVisible.value = !isDropdownVisible.value);

  useOnClickOutside(dropdownRef, () => {
    if (isDropdownVisible.value) {
      toggleDropdown();
    }
  });

  const userFirstLetter = computed(() =>
    (user?.first_name ?? "A")?.substring(0, 1),
  );
</script>
<template>
  <div
    class="kt-header__topbar-item kt-header__topbar-item--user header-user-bar"
  >
    <a
      class="kt-header__topbar-wrapper"
      @click.prevent="toggleDropdown"
      ref="dropdownRef"
    >
      <div class="kt-header__topbar-user">
        <span class="kt-header__topbar-welcome kt-hidden-mobile">Hi,</span>
        <span class="kt-header__topbar-username kt-hidden-mobile">{{
          user.first_name
        }}</span>
        <img v-if="avatar" alt="avatar" :src="avatar" />
        <BadgeComponent v-else font-weight="bold" size="lg">
          {{ userFirstLetter }}
        </BadgeComponent>
      </div>
      <div
        class="header-user-bar__dropdown dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl"
        :class="{
          show: isDropdownVisible,
        }"
      >
        <!--begin: Head -->
        <div
          class="header-user-bar__user-card kt-user-card kt-user-card--skin-dark kt-notification-item-padding-x"
        >
          <div class="kt-user-card__avatar">
            <img v-if="avatar" alt="avatar" :src="avatar" />
            <BadgeComponent v-else font-weight="bold" size="lg">
              {{ userFirstLetter }}
            </BadgeComponent>
          </div>
          <div class="kt-user-card__name">
            {{ user.first_name }}
          </div>
        </div>

        <!--end: Head -->

        <!--begin: Navigation -->
        <div class="kt-notification">
          <HeaderUserBarListItem
            :icon="IconUser"
            :to="{ name: USER_ROUTES_DATA.myProfilePersonalInfo.name }"
            title="My Profile"
            subtitle="Account settings and more"
          />
          <div class="kt-notification__custom kt-space-between">
            <a
              @click.prevent="logout"
              class="btn btn-label btn-label-brand btn-sm btn-bold"
              >Sign Out</a
            >
          </div>
        </div>

        <!--end: Navigation -->
      </div>
    </a>
  </div>
</template>
