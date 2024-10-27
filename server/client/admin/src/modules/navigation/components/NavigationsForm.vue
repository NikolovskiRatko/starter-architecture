<script lang="ts" setup>
  import { DashButton } from "@starter-core/dash-ui/src";
  import { useNavigations } from "../composables";
  import { useBEMBuilder } from "@/helpers";
  import "./NavigationsForm.scss";

  const [block, element] = useBEMBuilder("navigations-form");

  const { isLoading, data: navigations } = useNavigations();

  const addHandler = () => {};
</script>
<template>
  <div :class="block">
    <ul :class="element('list').value" v-if="!isLoading">
      <li v-for="navigation in navigations" v-bind:key="navigation.slug">
        <label :class="element('label').value" :for="navigation.slug">
          <input type="checkbox" :id="navigation.slug" />
          {{ navigation.title }}
          <small>{{ navigation.slug }}</small>
        </label>
      </li>
    </ul>
    <DashButton
      size="sm"
      type="submit"
      :loading="isLoading"
      @click="addHandler"
    >
      Add to menu
    </DashButton>
  </div>
</template>
