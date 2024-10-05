<script setup lang="ts">
  import {
    PortletComponent,
    PortletBody,
    PortletHead,
    PortletHeadLabel,
    ContentLoader,
  } from "@starter-core/dash-ui";
  import { IconAirpods as Icon } from "@starter-core/icons";
  import { ref, onMounted } from "vue";
  import { PageWrapper } from "@/components";
  // import { get } from "@/services/HTTP";
  import { useRootStore } from "@/store/root";

  // const categories = ref([]);
  const isLoading = ref(false);
  const { setActiveClasses } = useRootStore();
  onMounted(() => {
    isLoading.value = true;
    setActiveClasses({
      main: "item_dashboard",
      sub: "item_dashboard",
      title: "strings.dashboard",
    });

    // get('/common/dashboard/get')
    //     .then((response) => {
    //         isLoading.value = false;
    //         categories.value = response.data;
    //     })
  });
</script>
<template>
  <PageWrapper>
    <div class="row">
      <div class="col-md-4">
        <PortletComponent>
          <PortletHead>
            <PortletHeadLabel>
              Content loader
              <Icon size="32" />
            </PortletHeadLabel>
          </PortletHead>
          <PortletBody>
            <ContentLoader />
          </PortletBody>
        </PortletComponent>
      </div>
    </div>
  </PageWrapper>
</template>
