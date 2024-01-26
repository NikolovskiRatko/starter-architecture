<script setup>
    import {ref, onMounted, defineProps} from 'vue';
    import useAxios from '@/composables/useAxios';
    const { getAll } = useAxios();
    const model = ref([]);

    const {
        type,
        modelColumns} =
        defineProps([
            'type',
            'modelColumns']);

    onMounted(async () => {
        fetchData();
    });

    async function fetchData() {
        try {
            const response = await getAll(type);
            model.value = response;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

</script>

<template>
    <div>
        <div class="jumbotron_background">

        </div>
        <div class="container-fluid">
            <h1>{{type}}</h1>
            <h5 class="add_new-button">
                <router-link
                        :to="{
                            name: `${type}s-id`,
                            params: { id: 'new' } }">
                    Add New {{type}}
                </router-link>
            </h5>
            <DatatableComponent
                    v-if="model.length > 0"
                    :records=model
                    :type=type
                    :mainRow="modelColumns" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    body {
        font-family: 'lato', sans-serif;
        background-color: white !important;
        color: black;
        background-color: white;
    }
    .container {
        max-width: 1000px;
        margin-left: auto;
        margin-right: auto;
        padding-left: 10px;
        padding-right: 10px;
    }

    h2 {
        font-size: 26px;
        margin: 20px 0;
        text-align: center;
        small {
            font-size: 0.5em;
        }
    }
    .add_new-button {
        & > a {
            color: black;
            background: lightblue;
        }
        text-align: right;
        font-weight: 700;
    }
</style>
