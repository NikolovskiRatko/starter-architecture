<script setup lang="ts">
import { Portlet } from "@/components";
import {
  PortletBody,
  PortletHeadLabel,
  PortletHead,
} from "@/components/Portlet/components";
import SkButton from "@/components/base/SkButton/SkButton.vue";
import SkSection from "@/components/base/typography/SkSection/SkSection.vue";

import buttons from "@/data/buttons";
</script>
<template>
  <div class="row">
    <div v-for="column in buttons" class="col-lg-6">
      <Portlet v-for="group in column">
        <PortletHead>
          <PortletHeadLabel>
            {{ group.title }}
          </PortletHeadLabel>
        </PortletHead>
        <PortletBody>
          <template v-for="section in group.sections">
            <SkSection>
              <div class="kt-section__info">{{ section.title }}:</div>
              <div class="kt-section__content kt-section__content--solid">
                <SkButton
                  v-for="{ label, ...props } in section.buttons"
                  v-bind="props"
                  >{{ label }}</SkButton
                >
              </div>
            </SkSection>
            <div
              class="kt-separator kt-separator--space-sm kt-separator--border-dashed"
            ></div>
          </template>
        </PortletBody>
      </Portlet>
    </div>
  </div>
</template>
