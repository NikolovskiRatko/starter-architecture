<script setup lang="ts">
    import { ref } from 'vue';
    import { AuthKey, RouterKey } from '@/types/symbols';
    import { injectStrict } from '@/types/injectTyped'


    const form = ref({ email: '', password: '' });
    const formErrors = ref({ email: '', password: '' });
    const isSending = ref(false);
    const staySignedIn = ref(true);

    const router = injectStrict(RouterKey);
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
                router.push('/dashboard');
            } else {
                // Handle non-200 response status here
                console.error(`Received response with status ${response.status}:`, response.data);
                formErrors.value.email = 'An unexpected error occurred. Please try again.';
            }

        } catch (err) {
            formErrors.value.email = 'An error occurred. Please try again';

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
    <div class="container">
        <form @submit.prevent="submitForm">
            <h2 class="mb-3">Login</h2>
            <div class="input">
                <label for="login_email">Email</label>
                <input
                        id="login_email"
                        class="form-control"
                        type="email"
                        name="email"
                        placeholder="admin@example.com"
                        required
                        autofocus
                        v-model="form.email"
                />
            </div>
            <div class="input">
                <label for="login_password">Password</label>
                <input
                        id="login_password"
                        class="form-control"
                        type="password"
                        name="password"
                        placeholder="password"
                        required
                        v-model="form.password"
                />
            </div>
            <button type="submit" class="mt-4 btn-pers" id="login_button">
                Login
            </button>
        </form>
    </div>
</template>