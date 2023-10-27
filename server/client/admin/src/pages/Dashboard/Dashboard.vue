<script setup lang="ts">
    import { onMounted } from 'vue';

    // typing inject
    import { injectStrict } from '@/types/injectTyped'
    import { AxiosKey, AuthKey } from '@/types/symbols'

    const auth = injectStrict(AuthKey);
    const http = injectStrict(AxiosKey) // it's typed now

    const openUri = '/guest/test';

    onMounted(async () => {
        console.log(openUri);
        const response = await http.get(openUri)
        console.log(response)
    })

    const logoutUser = async () => {
        try {
            await auth.logout();
            console.log('Logged out successfully');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }

</script>
<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Admin Dashboard</div>
                    <div class="card-body">
                        <p>This is the dashboard.</p>
                        <button class="btn btn-danger" @click="logoutUser">Logout</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>