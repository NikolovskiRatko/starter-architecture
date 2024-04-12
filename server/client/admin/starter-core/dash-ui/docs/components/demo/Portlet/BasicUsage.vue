<script setup>
import {
  PortletComponent,
  PortletBody,
  PortletHead,
  PortletHeadLabel,
  PortletFoot,
} from "../../../../src/index.ts";
</script>
<template>
  <PortletComponent>
    <PortletHead>
      <PortletHeadLabel>
        <h4>Portlet Head</h4>
      </PortletHeadLabel>
    </PortletHead>
    <PortletBody> This is a body </PortletBody>
    <PortletFoot> This is a footer </PortletFoot>
  </PortletComponent>
</template>
