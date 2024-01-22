<script setup lang="ts">
import { ref, inject } from "vue";
import type { Ref } from "vue";
import { onQueryUpdateKey } from "@/components/Datatables/typings";
import { PortletBody } from "@starter-core/dash-ui";

const onQueryUpdate = inject(onQueryUpdateKey, () => {});

const searchValue: Ref<string> = ref("");
const handleSearchChange = (event: HTMLInputElementEvent) => {
  onQueryUpdate({
    search: event.target.value,
  });
};
</script>

<template>
  <PortletBody>
    <!--begin: Search Form -->
    <div class="kt-form kt-form--label-right kt-margin-t-20 kt-margin-b-10">
      <div class="row align-items-center">
        <div class="col-xl-8 order-2 order-xl-1">
          <div class="row align-items-center">
            <div class="col-md-4 kt-margin-b-20-tablet-and-mobile">
              <div class="kt-input-icon kt-input-icon--left">
                <input
                  v-model="searchValue"
                  @input="handleSearchChange"
                  type="text"
                  class="form-control"
                  placeholder="Search..."
                  name="search"
                />
                <span class="kt-input-icon__icon kt-input-icon__icon--left">
                  <span>
                    <i class="las la-search" />
                  </span>
                </span>
              </div>
            </div>

            <div class="col-md-4 kt-margin-b-20-tablet-and-mobile">
              <div class="kt-form__group kt-form__group--inline">
                <div class="kt-form__label">
                  <label>Status:</label>
                </div>
                <div class="kt-form__control">
                  <select
                    id="kt_form_status"
                    class="form-control bootstrap-select"
                  >
                    <option value="">All</option>
                    <option value="1">Pending</option>
                    <option value="2">Delivered</option>
                    <option value="3">Canceled</option>
                    <option value="4">Success</option>
                    <option value="5">Info</option>
                    <option value="6">Danger</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4 order-1 order-xl-2 kt-align-right">
          <a href="#" class="btn btn-default kt-hidden">
            <i class="la la-cart-plus" /> New Order
          </a>
          <div
            class="kt-separator kt-separator--border-dashed kt-separator--space-lg d-xl-none"
          />
        </div>
      </div>
    </div>
    <!--end: Search Form -->
  </PortletBody>
</template>
