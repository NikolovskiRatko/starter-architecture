<script setup lang="ts">
    import './Login.scss';

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
    <div class="peers ai-s fxw-nw h-100vh">
        <div class="col-12 col-md-8 d-n@sm- peer peer-greed h-100 pos-r bgr-n bgpX-c bgpY-c bgsz-cv">
            <div class="col-md-6 d-flex justify-content-center align-items-center">
                <div class="bgc-white pos-r md_size_logo">
                </div>
                <div class="starter-font">
                    Starter
                </div>
            </div>
        </div>
        <div class="col-12 col-md-4 peer pX-40 pY-80 h-100 bgc-white scrollable pos-r" style='min-width: 320px;'>
            <h4 class="fw-300 c-grey-900 mB-40">Login</h4>
            <form @submit.prevent="submitForm">
                <div class="mb-3">
                    <label for="login_email" class="text-normal text-dark form-label">Email address</label>
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
                    <!-- If there's an error for the email, you can display it below the input -->
                    <div v-if="formErrors.email" class="text-danger mt-1">{{ formErrors.email }}</div>
                </div>
                <div class="mb-3">
                    <label for="login_password" class="text-normal text-dark form-label">Password</label>
                    <input
                            id="login_password"
                            class="form-control"
                            type="password"
                            name="password"
                            placeholder="password"
                            required
                            v-model="form.password"
                    />
                    <!-- If there's an error for the password, you can display it below the input -->
                    <div v-if="formErrors.password" class="text-danger mt-1">{{ formErrors.password }}</div>
                </div>
                <div class="">
                    <div class="peers ai-c jc-sb fxw-nw">
                        <div class="peer">
                            <div class="checkbox checkbox-circle checkbox-info peers ai-c">
                                <input type="checkbox" id="inputCall1" name="inputCheckboxesCall" class="peer">
                                <label for="inputCall1" class=" peers peer-greed js-sb ai-c form-label">
                                    <span class="peer peer-greed">Remember Me</span>
                                </label>
                            </div>
                        </div>
                        <div class="peer">
                            <button type="submit" class="btn btn-primary btn-color" id="login_button">
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>