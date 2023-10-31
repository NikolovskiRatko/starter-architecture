<script setup lang="ts">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router'
    import { AuthKey } from '@/types/symbols';
    import { injectStrict } from '@/types/injectTyped'


    const form = ref({ email: '', password: '' });
    const formErrors = ref({ email: '', password: '' });
    const authError = ref(false);
    const isSending = ref(false);
    const staySignedIn = ref(true);

    const router = useRouter();
    const auth = injectStrict(AuthKey);

    const validateForm = () => {
        let isValid = true;
        formErrors.value.email = '';
        formErrors.value.password = '';

        if (!form.value.email) {
            formErrors.value.email = 'Email is required';
            isValid = false;
        }
        if (!form.value.password) {
            formErrors.value.password = 'Password is required';
            isValid = false;
        }

        return isValid;
    }

    const submitForm = async () => {
        if (!validateForm()) return;

        isSending.value = true;

        // Logging the data being sent to the login method
        console.log("Logging in with data:", form.value);

        try {
            const response = await auth.login({
                body: form.value,
                data: form.value,
                redirect: null,
                remember: false,
                staySignedIn: staySignedIn.value
            });

            if (response.status === 200) {
                // Redirect to the desired route after successful login
                router.push('/admin/dashboard');
            } else {
                // Handle non-200 response status here
                console.error(`Received response with status ${response.status}:`, response.data);
                formErrors.value.email = 'An unexpected error occurred. Please try again.';
                authError.value = true;
            }

        } catch (err) {
            formErrors.value.email = 'An error occurred. Please try again';
            authError.value = true;
            // Log any error messages or details for debugging
            console.error("Login error:", err);
            if (err.response) {
                console.error("Error response:", err.response);
            }
        } finally {
            isSending.value = false;
        }
    };

</script>

<template>
    <div class="auth-login">
        <div class="auth-base__head">
            <h3 class="auth-base__title">Login</h3>
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
                >
            </div>
            <div class="input-group">
                <input
                        v-model="form.password"
                        class="form-control"
                        type="password"
                        placeholder="password"
                        name="password"
                        required
                >
            </div>
            <span v-if="authError" class="error invalid-feedback">
                Authentication failed
            </span>
            <div class="row auth-base__extra">
                <div class="col">
                    <label class="kt-checkbox">
                        <input v-model="staySignedIn" type="checkbox" name="remember">
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