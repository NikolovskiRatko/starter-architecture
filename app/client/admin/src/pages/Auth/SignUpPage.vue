<script setup lang="ts">
  import { useForm } from 'vee-validate';
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useToast } from 'vue-toastification';
  import { AuthBase } from '@/components';
  import { useAuth } from '@/composables';
  import type { SignUpForm } from '@/types';
  import { DashButton, DashLink, FormInput, ContentLoader, FormHelperText } from '@starter-core/dash-ui/src';

  const authError = ref(false);

  const { t } = useI18n();
  const { register, isLoading } = useAuth();
  const toast = useToast();

  const { handleSubmit, errors, defineField, setErrors } = useForm<SignUpForm>({
    validationSchema: {
      first_name: (value: string) => !!value,
      last_name: (value: string) => !!value,
      email: (value: string) => !!value,
      password: (value: string) => !!value,
      is_terms_and_conditions_agreed: (value: boolean) => {
        if (!value) {
          return 'You must agree to the terms and conditions';
        }
        return value;
      },
    },
  });

  const submitHandler = handleSubmit((values) => {
    const { is_terms_and_conditions_agreed, ...signUpQuery } = values;

    if (is_terms_and_conditions_agreed) {
      register(signUpQuery).catch((error) => {
        authError.value = true;

        if (typeof error === 'string') {
          toast.error(error);
        } else {
          setErrors(error);
        }
      });
    }
  });

  const [firstName] = defineField('first_name');
  const [lastName] = defineField('last_name');
  const [email] = defineField('email');
  const [password] = defineField('password');
  const [isTermsAndConditionsAgreed] = defineField('is_terms_and_conditions_agreed');
</script>

<template>
  <AuthBase title="Sign up">
    <form class="kt-form auth-base__form" @submit.prevent="submitHandler">
      <FormInput id="firstName" v-model="firstName" name="first_name" placeholder="John" :error="errors['first_name']" />
      <FormInput id="lastName" v-model="lastName" name="last_name" placeholder="Doe" :error="errors['last_name']" />
      <FormInput id="email" v-model="email" name="email" placeholder="admin@example.com" :error="errors['email']" />
      <FormInput
        id="email"
        type="password"
        v-model="password"
        name="password"
        placeholder="Password"
        :error="errors['password']"
      />
      <span v-if="authError" class="error invalid-feedback"> Authentication failed </span>
      <div class="row auth-base__extra">
        <div class="col">
          <label class="kt-checkbox">
            <input v-model="isTermsAndConditionsAgreed" type="checkbox" name="is_terms_and_conditions_agreed" />
            I Agree the terms and conditions
            <span></span>
            <FormHelperText v-if="errors['is_terms_and_conditions_agreed']" :error="errors['is_terms_and_conditions_agreed']" />
          </label>
        </div>
      </div>
      <div class="auth-base__actions">
        <ContentLoader v-if="isLoading" height-class="mh-5" />
        <template v-else>
          <DashButton type="submit" is-wide>
            {{ t('buttons.sign-up') }}
          </DashButton>
          <DashLink theme="primary" theme-mod="outline-hover" to="/login">
            {{ t('buttons.cancel') }}
          </DashLink>
        </template>
      </div>
    </form>
  </AuthBase>
</template>
