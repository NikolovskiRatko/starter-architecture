<script setup lang="ts">
    import { toRefs } from 'vue';
    import './FormHelperText.scss';
    const props = defineProps<{
        text?: string;
        error?: string;
    }>();
    const { error, text } = toRefs(props);
</script>
<template>
    <div class="form-helper-text">
        <span v-if="error" class="form-helper-text__error">{{ error }}</span>
        <span v-if="text" class="form-helper-text__text">{{ text }}</span>
    </div>
</template>