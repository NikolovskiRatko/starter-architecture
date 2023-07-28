<script setup lang="ts">
    import { ref } from 'vue';
    import formValidation from '../../services/formValidation';
    import {useAuth} from '@websanova/vue-auth/src/v3.js';

    const auth   = useAuth();
    const form = ref({});
    const authError = ref(false);
    const isSending = ref(false);
    const staySignedIn = ref(false);

    const submitForm = (evt) => {
        if (!formValidation(evt)) return;

        isSending.value = true;
        auth.login({
            body: form.value,
            data: form.value,
            redirect: null,
            remember: false,
            staySignedIn: staySignedIn.value,
        }).then(response => {
            const { status, data } = response;
            // this.setUser(this.$auth.user());

            if (status === 401) {
                authError.value = true;
            }

            // this.setData();

            if (data.roles_array.includes(1)) {
                window.location.assign('/admin');
            }
            if (data.roles_array.includes(3)) {
                // this.$router.push({ name: 'user.dashboard' });
            }
        }).catch(() => {
            authError.value = true;
        });

        isSending.value = false;
    }

</script>

<template>
    <div>
        <h3 class="text-center">
            Log In
        </h3>
        <form id="login"
              @submit="submitForm">
            <div class="form-group">
                <label for="user_email">
                    Email
                </label>
                <input
                    id="user_email"
                    v-model="form.email"
                    type="email"
                    name="email"
                    required="required"
                    autofocus="autofocus"/>
                <span
                    v-if="authError"
                    class="help-block">
                  <strong>
                      Auth Failed
                  </strong>
                </span>
            </div>
            <div class="form-group">
                <label for="user_password">
                    Password
                </label>
                <input
                    id="user_password"
                    v-model="form.password"
                    type="password"
                    required="required"/>
            </div>
            <div class="form-group"
                 id="boxes">
                <div class="d-flex justify-content-between">
                    <checkbox
                            v-model="staySignedIn"
                            switch>
                        Keep me connected
                    </checkbox>
                    <button
                        variant="link"
                        to="/password/reset"
                        class="reset text-secondary pt-0 pr-0">
                        <i aria-hidden="true"
                           class="fa fa-question-circle"/>
                        &nbsp;Forgot Your Password ?
                    </button>
                </div>
            </div>
            <div class="form-group">
                <button
                        type="submit"
                        variant="primary"
                        class="btn-block"
                        :class="{ disabled: isSending }">
                    Login
                </button>
            </div>
        </form>
    </div>
</template>
