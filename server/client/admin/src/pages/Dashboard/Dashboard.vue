<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useRootStore } from '@/store/root'

    // typing inject
    import { injectStrict } from '@/types/injectTyped'
    import { AxiosKey } from '@/types/symbols'

    const http = injectStrict(AxiosKey) // it's typed now

    const categories = ref([]);
    const isLoading = ref(false);
    const { setActiveClasses } = useRootStore();

    onMounted(() => {
        isLoading.value = true;
        setActiveClasses({
            main: 'item_dashboard',
            sub: 'item_dashboard',
            title: 'strings.dashboard'
        })

        http.get('/common/dashboard/get')
            .then((response) => {
                isLoading.value = false;
                categories.value = response.data;
            });
    })
</script>
<template>
    <div class="row">
        <div class="col-md-6" />
        <div class="col-md-6" />
    </div>
</template>

<style lang="scss">
    .home {
        padding: 0;
        background-color: transparent;

        .admin-page-title {
            text-align: right;
            display: block;
            width: 100%;
            font-size: 13px;
        }
    }
</style>
