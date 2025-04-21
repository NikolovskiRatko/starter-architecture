<script lang="ts" setup>
  import { IconPlus } from '@starter-core/icons';
  import { useI18n } from 'vue-i18n';
  import { useNavigations } from '../composables';
  import { NAVIGATION_ROUTES_DATA, NAVIGATIONS_TABLE_COLUMNS } from '../constants';
  import { PageWrapper } from '@/components';
  import { useBEMBuilder } from '@/helpers';
  import { useUserCheck } from '@/modules/users/composables';
  import { USER_PERMISSIONS } from '@/modules/users/constants';
  import {
    // useDatatable,
    DatatableComponent,
    DatatableHeader,
    TableRow,
    TableColumn,
    DashLink,
  } from '@starter-core/dash-ui/src';

  const { checkUser } = useUserCheck();
  const { t } = useI18n();
  const [block] = useBEMBuilder('navigations-page');

  const { isLoading, data: navigations } = useNavigations();
  // const { query } = useDatatable();
</script>
<template>
  <div :class="block">
    <PageWrapper>
      <DatatableComponent :isLoading="isLoading" :columns="NAVIGATIONS_TABLE_COLUMNS">
        <template #header>
          <DatatableHeader title="Navigations" subtitle="List of navigations">
            <DashLink
              v-if="checkUser('permissions', USER_PERMISSIONS.writeNavigation)"
              :to="{ name: NAVIGATION_ROUTES_DATA.addNavigation.name }"
              :icon="IconPlus"
            >
              {{ t('navigation.add') }}
            </DashLink>
          </DatatableHeader>
        </template>
        <template #default>
          <TableRow v-for="navigation in navigations" v-bind:key="navigation.id">
            <TableColumn>
              <RouterLink
                :to="{
                  name: NAVIGATION_ROUTES_DATA.editNavigation.name,
                  params: { navigationId: navigation.id },
                }"
              >
                {{ navigation.title }}
              </RouterLink>
            </TableColumn>
            <TableColumn> {{ navigation.parent_path }}/{{ navigation.slug }} </TableColumn>
            <TableColumn>
              {{ navigation.livedate }}
            </TableColumn>
            <TableColumn>
              {{ navigation.enddate }}
            </TableColumn>
            <TableColumn>
              <span v-if="navigation.static">Static</span>
              <span v-else>Editable</span>
            </TableColumn>
          </TableRow>
        </template>
      </DatatableComponent>
    </PageWrapper>
  </div>
</template>
