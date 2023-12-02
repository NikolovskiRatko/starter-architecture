<script setup lang="ts">
import { onMounted } from "vue";
// import AdminUserForm from '../../../features/Admin/UsersCrud/_components/MyProfileForm.vue';
import { useRootStore } from "@/store/root";

const { setBackUrl, setActiveClasses } = useRootStore();

onMounted(() => {
  setActiveClasses({
    main: "/users",
    sub: "edit.user",
    title: "users.myprofile",
  });

  // Not 100% sure but probably this is used for the same purpose as redirect route and should be removed
  setBackUrl("/");
});
</script>

<template>
  <span>My profile form</span>
  <!--  <admin-user-form />-->
</template>
