<script setup lang="ts">
  import { nextTick, ref, useTemplateRef, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import './ConfirmDialog.scss';

  type ConfirmVariant = 'default' | 'danger';

  const {
    show,
    message,
    confirmLabel,
    cancelLabel,
    variant = 'default',
  } = defineProps<{
    show: boolean;
    message?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: ConfirmVariant;
  }>();

  const emit = defineEmits<{
    confirm: [];
    close: [];
  }>();

  const { t } = useI18n();
  const cancelButton = useTemplateRef<HTMLButtonElement>('cancelButton');
  const previouslyFocused = ref<HTMLElement | null>(null);

  const onBackdropClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      emit('close');
    }
  };

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      emit('close');
    }
  };

  watch(
    () => show,
    async (isOpen) => {
      if (isOpen) {
        previouslyFocused.value = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        document.addEventListener('keydown', onKeydown);
        await nextTick();
        cancelButton.value?.focus();
      } else {
        document.removeEventListener('keydown', onKeydown);
        previouslyFocused.value?.focus();
        previouslyFocused.value = null;
      }
    },
    { immediate: true }
  );
</script>

<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="confirm-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-message"
      @click="onBackdropClick"
    >
      <div class="confirm-dialog__panel">
        <p id="confirm-dialog-message" class="confirm-dialog__message">
          <slot name="message">{{ message }}</slot>
        </p>
        <div class="confirm-dialog__actions">
          <button
            ref="cancelButton"
            type="button"
            class="confirm-dialog__button confirm-dialog__button--cancel"
            @click="emit('close')"
          >
            <slot name="cancel-label">{{ cancelLabel ?? t('buttons.cancel') }}</slot>
          </button>
          <button
            type="button"
            class="confirm-dialog__button"
            :class="`confirm-dialog__button--${variant}`"
            @click="emit('confirm')"
          >
            <slot name="confirm-label">{{ confirmLabel ?? t('buttons.confirm') }}</slot>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
