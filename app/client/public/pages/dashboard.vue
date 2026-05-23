<script setup lang="ts">
definePageMeta({
  requireContext: 'public',
});

const auth = useAuthStore();
const { api } = useApi();

interface DashboardPayload {
  message: string;
  user_id: number;
}

const { data: dashboard } = await useAsyncData('public-dashboard', () => api<DashboardPayload>('/public/dashboard'));

const logout = async () => {
  await auth.logout();
  await navigateTo('/');
};

useHead({ title: 'Dashboard' });
</script>

<template>
  <div class="container py-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 m-0">Welcome, {{ auth.user?.first_name }}!</h1>
      <button type="button" class="btn btn-outline-secondary" @click="logout">Sign out</button>
    </div>

    <div class="row g-3">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2 class="h5 card-title">Identity</h2>
            <dl class="row mb-0">
              <dt class="col-sm-4">Name</dt>
              <dd class="col-sm-8">{{ auth.user?.first_name }} {{ auth.user?.last_name }}</dd>
              <dt class="col-sm-4">Email</dt>
              <dd class="col-sm-8">{{ auth.user?.email }}</dd>
              <dt class="col-sm-4">Roles</dt>
              <dd class="col-sm-8">
                <span v-for="role in auth.roles" :key="role" class="badge bg-secondary me-1">{{ role }}</span>
              </dd>
            </dl>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2 class="h5 card-title">Access contexts</h2>
            <ul class="list-unstyled mb-0">
              <li>
                <span class="badge" :class="auth.contexts.admin ? 'bg-success' : 'bg-light text-muted'">
                  admin
                </span>
                <span class="ms-2">{{ auth.contexts.admin ? 'enabled' : 'not granted' }}</span>
              </li>
              <li class="mt-2">
                <span class="badge" :class="auth.contexts.public ? 'bg-success' : 'bg-light text-muted'">
                  public
                </span>
                <span class="ms-2">{{ auth.contexts.public ? 'enabled' : 'not granted' }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h2 class="h5 card-title">Dashboard payload</h2>
            <pre class="mb-0">{{ dashboard }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
