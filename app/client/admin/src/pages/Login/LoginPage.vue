<script setup lang="ts">
  import { useForm } from "vee-validate";
  import { ref } from "vue";
  import { useI18n } from "vue-i18n";
  import useAuthComp from "@/composables/useAuthComp";
  import type { UserFormItem } from "@/modules/users/types";
  import {
    DashButton,
    FormInput,
    ContentLoader,
  } from "@starter-core/dash-ui/src";

  const authError = ref(false);
  const staySignedIn = ref(true);

  const { t } = useI18n();
  const { login, isLoading } = useAuthComp();

  const { handleSubmit, errors, defineField } = useForm<UserFormItem>({
    validationSchema: {
      email: (value: string) => !!value,
      password: (value: string) => !!value,
    },
  });

  const submitHandler = handleSubmit((values) => {
    login({
      data: values,
      redirect: false,
      remember: false,
      staySignedIn: staySignedIn.value,
    }).catch((error) => {
      authError.value = true;
      console.log(error.message);
    });
  });

  const [email] = defineField("email");
  const [password] = defineField("password");
</script>

<template>
  <div class="auth-login">
    <div class="auth-base__head">
      <h3 class="auth-base__title">Login 1.3</h3>
    </div>
    <form class="kt-form auth-base__form" @submit.prevent="submitHandler">
      <FormInput
        id="email"
        v-model="email"
        name="Email"
        placeholder="admin@example.com"
        :error="errors['email']"
      />
      <FormInput
        id="email"
        type="password"
        v-model="password"
        name="password"
        placeholder="password"
        :error="errors['password']"
      />
      <span v-if="authError" class="error invalid-feedback">
        Authentication failed
      </span>
      <div class="row auth-base__extra">
        <div class="col">
          <label class="kt-checkbox">
            <input v-model="staySignedIn" type="checkbox" name="remember" />
            Remember Me
            <span></span>
          </label>
        </div>
        <!--                    <router-link id="kt_login_forgot" to="/password/reset" class="auth-base__link">-->
        <!--                        Password Reset-->
        <!--                    </router-link>-->
      </div>
      <div class="auth-base__actions">
        <ContentLoader v-if="isLoading" height-class="mh-5" />
        <DashButton v-else type="submit" is-wide>
          {{ t("buttons.login") }}
        </DashButton>
      </div>
    </form>
  </div>
</template>
