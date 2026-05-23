<script setup lang="ts">
definePageMeta({ requireAuth: false });

const auth = useAuthStore();
const route = useRoute();

const email = ref('');
const password = ref('');
const error = ref<string | null>(null);

const submit = async () => {
  error.value = null;
  try {
    await auth.login({ email: email.value, password: password.value });
    const redirect = (route.query.redirect as string) || '/dashboard';
    await navigateTo(redirect);
  } catch (err: unknown) {
    const e = err as { data?: { message?: string }; message?: string };
    error.value = e?.data?.message ?? e?.message ?? 'Login failed.';
  }
};

useHead({ title: 'Login' });
</script>

<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="card shadow-sm">
          <div class="card-body">
            <h1 class="card-title h3 mb-4">Sign in</h1>
            <form @submit.prevent="submit">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  class="form-control"
                  placeholder="public-user@example.com"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  id="password"
                  v-model="password"
                  type="password"
                  class="form-control"
                  placeholder="password"
                  required
                />
              </div>
              <div v-if="error" class="alert alert-danger py-2">{{ error }}</div>
              <button type="submit" class="btn btn-primary w-100" :disabled="auth.isLoading">
                <span v-if="auth.isLoading">Signing in…</span>
                <span v-else>Sign in</span>
              </button>
            </form>
            <p class="text-muted mt-3 small mb-0">
              Public users see their dashboard at <code>/dashboard</code>. Admin users
              should sign into the admin panel instead.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
