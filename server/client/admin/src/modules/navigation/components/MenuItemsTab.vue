<script lang="ts" setup>
  import { ref, computed } from "vue";
  import { useCreateNavigationMenuItem } from "../composables";
  import type { Navigation } from "../types";
  import MenuItems from "./MenuItems.vue";
  import MenusDropdown from "./MenusDropdown.vue";
  import NavigationsForm from "./NavigationsForm.vue";
  import { useBEMBuilder } from "@/helpers";
  import {
    AccordionContent,
    AccordionItem,
    DashButton,
  } from "@starter-core/dash-ui/src";
  import "./MenuItemsTab.scss";

  const selectedNavigations = ref<Navigation[]>([]);
  const { mutate: createNavigationItem } = useCreateNavigationMenuItem();

  const selectedMenu = ref<string>("");
  const [block, element] = useBEMBuilder("menu-items-tab");

  const addHandler = () => {
    createNavigationItem({
      label: selectedNavigations.value[0].title,
      navigation_id: selectedNavigations.value[0].id,
      menu_id: Number(selectedMenu.value),
    });
  };

  const isSubmitDisabled = computed(
    () => !selectedNavigations.value.length || Number(selectedMenu.value) <= 0,
  );
</script>
<template>
  <div :class="block">
    <div :class="element('navigations').value">
      <AccordionContent>
        <AccordionItem label="Internal navigation" id="internal-navigation">
          <div :class="element('navigations-content').value">
            <NavigationsForm v-model="selectedNavigations" />
            <DashButton
              size="sm"
              @click="addHandler"
              :state="isSubmitDisabled ? 'disabled' : undefined"
            >
              Add to menu
            </DashButton>
          </div>
        </AccordionItem>
        <AccordionItem label="External url" id="external-url">
          External url form
        </AccordionItem>
      </AccordionContent>
    </div>
    <div :class="element('items').value">
      <MenusDropdown v-model="selectedMenu" />
      <MenuItems :menu-id="selectedMenu" />
    </div>
  </div>
</template>
