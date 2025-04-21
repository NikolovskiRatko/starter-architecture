<script lang="ts" setup>
  import { ref } from 'vue';
  import { PageWrapper, PAGE_WRAPPER_SLOTS, SubheaderTitle } from '../../../components';
  import { AddMenuForm } from '../components';
  import { useBEMBuilder } from '@/helpers';
  import { useNavigationMenus } from '@/modules/navigation/composables';
  import { NAVIGATION_ROUTES_DATA } from '@/modules/navigation/constants';
  import { PortletComponent, PortletBody } from '@starter-core/dash-ui/src';

  import './MenusPage.scss';

  const [block, element] = useBEMBuilder('menus-page');
  const { isLoading, data: menus } = useNavigationMenus();
</script>
<template>
  <PageWrapper :class="block">
    <template #[PAGE_WRAPPER_SLOTS.subheaderMain]>
      <SubheaderTitle title="Menus" description="Manage navigation menus" />
    </template>
    <PortletComponent>
      <PortletBody>
        <div :class="element('content').value">
          <AddMenuForm />
          <ul v-if="!isLoading" :class="element('list').value">
            <li :class="element('list-item').value" v-for="menu in menus" v-bind:key="menu.id">
              <router-link
                :to="{
                  name: NAVIGATION_ROUTES_DATA.menu.name,
                  params: {
                    menuId: menu.id,
                  },
                }"
              >
                <span
                  :class="
                    element(
                      'list-item-element',
                      ref({
                        name: true,
                      })
                    ).value
                  "
                  >{{ menu.name }}</span
                >
                <span
                  :class="
                    element(
                      'list-item-element',
                      ref({
                        description: true,
                      })
                    ).value
                  "
                  >{{ menu.description }}</span
                >
              </router-link>
            </li>
          </ul>
        </div>
      </PortletBody>
    </PortletComponent>
  </PageWrapper>
</template>
