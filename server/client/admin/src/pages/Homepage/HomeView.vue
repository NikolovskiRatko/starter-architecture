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
    <div class="row">
        <div class="col-md-6">
            <button @click="logoutUser"
                    class="mt-4 btn-pers">
                Logout
            </button>
        </div>
    </div>
</template>