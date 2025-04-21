<script lang="ts" setup>
  import { IconArrowleft } from '@starter-core/icons';
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRoute } from 'vue-router';
  import { PageWrapper, PAGE_WRAPPER_SLOTS, SubheaderTitle } from '../../../components';
  import { MenuItems, MenuItemsNavigationForms } from '../components';
  import { useNavigationMenu } from '../composables';
  import { NAVIGATION_ROUTES_DATA } from '../constants';
  import { useBEMBuilder } from '@/helpers';
  import { PortletComponent, PortletBody, DashLink } from '@starter-core/dash-ui/src';

  import './MenuPage.scss';

  const { t } = useI18n();
  const route = useRoute();
  const menuId = computed(() => Number(route.params.menuId));
  const { data } = useNavigationMenu(menuId);
  const pageDescription = computed(() => data?.value?.name ?? 'Single menu');
  const [block, element] = useBEMBuilder('menu-page');
</script>
<template>
  <PageWrapper :class="block">
    <template #[PAGE_WRAPPER_SLOTS.subheaderMain]>
      <SubheaderTitle title="Menu" :description="pageDescription" />
    </template>
    <template #[PAGE_WRAPPER_SLOTS.subheaderToolbox]>
      <DashLink :to="{ name: NAVIGATION_ROUTES_DATA.menus.name }" :icon="IconArrowleft" theme="clean">
        {{ t('buttons.back') }}
      </DashLink>
    </template>
    <PortletComponent>
      <PortletBody>
        <div :class="element('content').value">
          <div :class="element('navigations').value">
            <MenuItemsNavigationForms :menu-id="menuId" />
          </div>
          <div :class="element('items').value">
            <MenuItems :menu-id="menuId" />
          </div>
        </div>
      </PortletBody>
    </PortletComponent>
  </PageWrapper>
</template>
