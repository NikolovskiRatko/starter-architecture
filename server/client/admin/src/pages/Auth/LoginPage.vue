<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import useAuthComp from "@/composables/useAuthComp";

const form = ref({ email: "", password: "" });
const formErrors = ref({ email: "", password: "" });
const authError = ref(false);
const staySignedIn = ref(true);

const router = useRouter();
const { login } = useAuthComp();

const validateForm = () => {
  let isValid = true;
  formErrors.value.email = "";
  formErrors.value.password = "";

  if (!form.value.email) {
    formErrors.value.email = "Email is required";
    isValid = false;
  }
  if (!form.value.password) {
    formErrors.value.password = "Password is required";
    isValid = false;
  }

  return isValid;
};

const submitForm = async () => {
  if (!validateForm()) return;

  login({
    data: form.value,
    redirect: false,
    remember: false,
    staySignedIn: staySignedIn.value,
  }).catch((error) => {
    authError.value = true;
    console.log(error);
  });
};
</script>

<template>
  <div class="auth-login">
    <div class="auth-base__head">
      <h3 class="auth-base__title">Login 1.6</h3>
    </div>
    <form class="kt-form auth-base__form" @submit.prevent="submitForm">
      <div class="input-group">
        <input
          v-model="form.email"
          class="form-control"
          type="text"
          placeholder="admin@example.com"
          name="email"
          autocomplete="off"
          required
          autofocus
        />
      </div>
      <div class="input-group">
        <input
          v-model="form.password"
          class="form-control"
          type="password"
          placeholder="password"
          name="password"
          required
        />
      </div>
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
        <div class="col kt-align-right">
          <!--                    <router-link id="kt_login_forgot" to="/password/reset" class="auth-base__link">-->
          <!--                        Password Reset-->
          <!--                    </router-link>-->
        </div>
      </div>
      <div class="auth-base__actions">
        <input
          class="btn btn-brand btn-elevate auth-base__btn-primary"
          type="submit"
          value="Sign In"
        />
      </div>
    </form>
  </div>
</template>
