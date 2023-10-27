<script setup lang="ts">
    // typing inject
    import { injectStrict } from '@/types/injectTyped'
    import {  AuthKey } from '@/types/symbols'

    const auth = injectStrict(AuthKey);

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
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
            <img src="build/assets/images/logo.png" width="30" alt="Logo" /> Vue Laravel Authentication
        </a>
        <a class="nav-link" href="#" @click="logoutUser">
            Logout
        </a>
        <!-- Add more navbar content as required -->
    </nav>
</template>
