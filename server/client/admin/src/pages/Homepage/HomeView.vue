<script setup lang="ts">
    import { onMounted } from 'vue';

    // typing inject
    import { injectStrict } from '@/types/injectTyped'
    import { AxiosKey } from '@/types/symbols'

    const http = injectStrict(AxiosKey) // it's typed now

    const openUri = '/guest/test';
    const authUri = '/test';

    onMounted(async () => {
        console.log(openUri);
        const response = await http.get(openUri)
        console.log(response)
    })
</script>
<template>
    <div class="row">
        <div class="col-md-6"> Home 1 </div>
        <div class="col-md-6"> Home 2 </div>
    </div>
</template>