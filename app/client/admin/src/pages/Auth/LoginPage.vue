<script setup lang="ts">
  import { useForm } from 'vee-validate';
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useToast } from 'vue-toastification';
  import { AuthBase } from '@/components';
  import { useAuth } from '@/composables';
  import { getAPIErrorMessage } from '@/helpers';
  import type { LoginQuery } from '@/types';
  import { DashButton, FormInput, ContentLoader } from '@starter-core/dash-ui/src';

  const authError = ref(false);
  const staySignedIn = ref(true);

  const { t } = useI18n();
  const { login, isLoading } = useAuth();
  const toast = useToast();

  const { handleSubmit, errors, defineField, setErrors } = useForm<LoginQuery>({
    validationSchema: {
      email: (value: string) => !!value,
      password: (value: string) => !!value,
    },
  });

  const submitHandler = handleSubmit((values) => {
    login({
      data: values,
      remember: false,
      staySignedIn: staySignedIn.value,
    }).catch((error) => {
      authError.value = true;
      const errorMessage = getAPIErrorMessage(error);

      if (typeof errorMessage === 'string') {
        toast.error(errorMessage);
      } else {
        setErrors(errorMessage);
      }
    });
  });

  const [email] = defineField('email');
  const [password] = defineField('password');
</script>

<template>
  <AuthBase title="Login 1.3">
    <form class="kt-form auth-base__form" @submit.prevent="submitHandler">
      <FormInput id="email" v-model="email" name="Email" placeholder="admin@example.com" :error="errors['email']" />
      <FormInput
        id="email"
        type="password"
        v-model="password"
        name="password"
        placeholder="password"
        :error="errors['password']"
      />
      <span v-if="authError" class="error invalid-feedback"> Authentication failed </span>
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
          {{ t('buttons.login') }}
        </DashButton>
      </div>
      <div class="auth-base__account">
        <span class="auth-base__account-msg"> Don't have an account yet ? </span>
        <router-link class="auth-base__account-link" to="/sign-up"> Sign Up! </router-link>
      </div>
    </form>
  </AuthBase>
</template>
