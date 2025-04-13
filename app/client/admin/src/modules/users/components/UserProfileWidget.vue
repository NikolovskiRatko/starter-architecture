<script setup lang="ts">
  import { computed } from "vue";
  import { useI18n } from "vue-i18n";
  import { MY_PROFILE_WIDGET_LINKS } from "../constants";
  import UserRole from "./UserRole.vue";
  import { useAuth } from "@/composables";
  import { PortletComponent, PortletBody } from "@starter-core/dash-ui/src";
  import "./UserProfileWidget.scss";

  const { user, avatar } = useAuth();
  const { t } = useI18n();

  const fullName = computed(() => {
    if (user) {
      return `${user.first_name} ${user.last_name}`;
    }

    return null;
  });

  const widgetInfo = [
    {
      label: t("users.email.label"),
      value: user.email,
    },
    {
      label: "Phone",
      value: "",
    },
    {
      label: "Location",
      value: "",
    },
  ];
</script>
<template>
  <PortletComponent>
    <PortletBody>
      <div class="user-profile-widget user-profile-widget--user-profile-1">
        <div class="user-profile-widget__head">
          <div class="user-profile-widget__media">
            <img v-if="avatar" :src="avatar" alt="image" />
          </div>
          <div class="user-profile-widget__content">
            <div class="user-profile-widget__section">
              <span class="user-profile-widget__username">
                {{ fullName }}
              </span>
              <span class="user-profile-widget__subtitle">
                <UserRole :userRoleId="user.role" />
              </span>
            </div>
          </div>
        </div>
        <div class="user-profile-widget__body">
          <div class="user-profile-widget__content">
            <div
              v-for="info in widgetInfo"
              :key="info.label"
              class="user-profile-widget__info"
            >
              <span class="user-profile-widget__label">{{ info.label }}:</span>
              <a href="#" class="user-profile-widget__data">{{ info.value }}</a>
            </div>
          </div>
          <div class="user-profile-widget__items">
            <router-link
              v-for="{ label, routeName, Icon } in MY_PROFILE_WIDGET_LINKS"
              :key="label"
              :to="{ name: routeName }"
              active-class="user-profile-widget__item--active"
              class="user-profile-widget__item"
            >
              <span class="user-profile-widget__section">
                <span class="user-profile-widget__icon">
                  <component :is="Icon"></component>
                </span>
                <span class="user-profile-widget__desc"> {{ label }} </span>
              </span>
            </router-link>
          </div>
        </div>
      </div>
    </PortletBody>
  </PortletComponent>
</template>
