<script setup lang="ts">
  import { ref, computed, useSlots } from "vue";
  import { useBEMBuilder } from "../../helpers";
  import DashButton from '../Button/DashButton.vue';
  import {
    PortletComponent,
    PortletBody,
    PortletFoot,
    PortletHead,
    PortletHeadLabel
  } from "../Portlet";
  import { MODAL_SLOTS } from './constants';

  import './ModalComponent.scss';

  const dialog = ref<HTMLDialogElement>();

  interface ModalComponentProps {
    title?: string;
    confirmText?: string;
    cancelText?: string;
    hideConfirm?: boolean;
    showCancel?: boolean;
  }

  const {
    title,
    confirmText = "Confirm",
    cancelText = "Cancel",
    hideConfirm,
    showCancel
  } = defineProps<ModalComponentProps>();

  defineSlots<{
    [MODAL_SLOTS.default]?: () => void;
    [MODAL_SLOTS.footer]?: () => void;
    [MODAL_SLOTS.actionButtons]?: () => void;
  }>();

  const slots = useSlots();

  const emit = defineEmits(['confirm', 'cancel']);
  const [block, element] = useBEMBuilder("dui-modal");

  const isFooterVisible = computed(() => {
    const defaultButtonsAreVisible = !hideConfirm || showCancel;
    const footerSlotIsProvided = !!slots[MODAL_SLOTS.footer]
      || !!slots[MODAL_SLOTS.actionButtons];

    return defaultButtonsAreVisible || footerSlotIsProvided
  });

  const cancel = () => {
    console.log('cancel');
    dialog.value?.close();
    emit('cancel');
  };

  const confirm = () => {
    console.log('confirm');
    dialog.value?.close();
    emit('confirm');
  };

  const visible = ref(false);

  const showModal = () => {
    dialog.value?.showModal();
    visible.value = true;
  };

  defineExpose({
    show: showModal,
    close: (returnVal?: string): void => dialog.value?.close(returnVal),
    visible,
  });
</script>

<template>
  <dialog
    ref="dialog"
    :class="block"
    @close="visible = false"
  >
    <form
      v-if="visible"
      method="dialog"
      :class="element('form').value"
    >
      <PortletComponent>
        <PortletHead v-if="title">
          <PortletHeadLabel>
            {{ title }}
          </PortletHeadLabel>
        </PortletHead>
        <PortletBody>
            <slot />
        </PortletBody>
        <PortletFoot v-if="isFooterVisible">
            <slot :name="MODAL_SLOTS.footer" />
            <div :class="element('action-buttons').value">
              <slot :name="MODAL_SLOTS.actionButtons">
                <dash-button v-if="showCancel" @click.prevent="cancel" theme="secondary">
                  {{ cancelText }}
                </dash-button>
                <dash-button v-if="!hideConfirm" @click.prevent="confirm">
                  {{ confirmText }}
                </dash-button>
              </slot>
            </div>
        </PortletFoot>
      </PortletComponent>
    </form>
  </dialog>
</template>
