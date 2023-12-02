<script setup lang="ts">
import { AdminSection } from "@/components/Form/index";
const props = defineProps(["route", "loading"]);
</script>

<template>
  <div class="col-md-9">
    <admin-section class="form-controls" :loading="loading">
      <h4 slot="header">
        {{ $t("locations.packages.contract_data.subtitle_4") }}
      </h4>

      <template #footer>
        <button
          type="submit"
          :loading="loading"
          class="btn btn-success col-md-6 col-sm-6"
        >
          <i class="la la-save mr-1" />
          {{ $t("buttons.save") }}
        </button>

        <router-link
          :loading="loading"
          :to="{ name: route }"
          exact=""
          class="btn btn-outline-secondary col-md-6 col-sm-6"
        >
          {{ $t("buttons.cancel") }}
        </router-link>
      </template>
    </admin-section>
  </div>
</template>
