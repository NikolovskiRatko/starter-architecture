<script setup>
import { ref } from "vue";
import useAuthComp from "@/composables/useAuthComp";
import "./HeaderUserBar.scss";

const { logout, user } = useAuthComp();
const isDropdownVisible = ref(false);

const toggleDropdown = () =>
  (isDropdownVisible.value = !isDropdownVisible.value);
</script>
<template>
  <div
    class="kt-header__topbar-item kt-header__topbar-item--user header-user-bar"
  >
    <div class="kt-header__topbar-wrapper" @click="toggleDropdown">
      <div class="kt-header__topbar-user">
        <span class="kt-header__topbar-welcome kt-hidden-mobile">Hi,</span>
        <span class="kt-header__topbar-username kt-hidden-mobile">{{
          user.name
        }}</span>
        <img class="kt-hidden" alt="Pic" src="" />

        <!--use below badge element instead the user avatar to display username's first letter(remove kt-hidden class to display it) -->
        <span
          class="kt-badge kt-badge--username kt-badge--unified-success kt-badge--lg kt-badge--rounded kt-badge--bold"
          >S</span
        >
      </div>
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
          <img class="kt-hidden" alt="Pic" src="" />

          <!--use below badge element instead the user avatar to display username's first letter(remove kt-hidden class to display it) -->
          <span
            class="kt-badge kt-badge--lg kt-badge--rounded kt-badge--bold kt-font-success"
            >S</span
          >
        </div>
        <div class="kt-user-card__name">
          {{ user.name }}
        </div>
        <div class="kt-user-card__badge">
          <span class="btn btn-success btn-sm btn-bold btn-font-md"
            >23 messages</span
          >
        </div>
      </div>

      <!--end: Head -->

      <!--begin: Navigation -->
      <div class="kt-notification">
        <a href="#" class="kt-notification__item">
          <div class="kt-notification__item-icon">
            <i class="flaticon2-calendar-3 kt-font-success" />
          </div>
          <div class="kt-notification__item-details">
            <div class="kt-notification__item-title kt-font-bold">
              My Profile
            </div>
            <div class="kt-notification__item-time">
              Account settings and more
            </div>
          </div>
        </a>
        <a href="#" class="kt-notification__item">
          <div class="kt-notification__item-icon">
            <i class="flaticon2-mail kt-font-warning" />
          </div>
          <div class="kt-notification__item-details">
            <div class="kt-notification__item-title kt-font-bold">
              My Messages
            </div>
            <div class="kt-notification__item-time">Inbox and tasks</div>
          </div>
        </a>
        <a href="#" class="kt-notification__item">
          <div class="kt-notification__item-icon">
            <i class="flaticon2-rocket-1 kt-font-danger" />
          </div>
          <div class="kt-notification__item-details">
            <div class="kt-notification__item-title kt-font-bold">
              My Activities
            </div>
            <div class="kt-notification__item-time">Logs and notifications</div>
          </div>
        </a>
        <a href="#" class="kt-notification__item">
          <div class="kt-notification__item-icon">
            <i class="flaticon2-hourglass kt-font-brand" />
          </div>
          <div class="kt-notification__item-details">
            <div class="kt-notification__item-title kt-font-bold">My Tasks</div>
            <div class="kt-notification__item-time">
              latest tasks and projects
            </div>
          </div>
        </a>
        <a href="#" class="kt-notification__item">
          <div class="kt-notification__item-icon">
            <i class="flaticon2-cardiogram kt-font-warning" />
          </div>
          <div class="kt-notification__item-details">
            <div class="kt-notification__item-title kt-font-bold">Billing</div>
            <div class="kt-notification__item-time">
              billing & statements
              <span
                class="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill kt-badge--rounded"
                >2 pending</span
              >
            </div>
          </div>
        </a>
        <div class="kt-notification__custom kt-space-between">
          <a
            class="btn btn-label btn-label-brand btn-sm btn-bold"
            @click.prevent="logout"
            >Sign Out</a
          >
          <a
            href="demo1/custom/user/login-v2.html"
            target="_blank"
            class="btn btn-clean btn-sm btn-bold"
            >Upgrade Plan</a
          >
        </div>
      </div>

      <!--end: Navigation -->
    </div>
  </div>
</template>
