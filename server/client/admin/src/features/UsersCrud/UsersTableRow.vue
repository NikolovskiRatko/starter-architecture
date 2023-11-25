<script setup lang="ts">
  import { useAuth } from '@websanova/vue-auth/src/v3.js';
  import { TableColumn, TableRow } from '@/components/Datatables'
  const props = defineProps(['value', 'columns', 'user', 'index']);
  const isEvenRow = props.index % 2 === 0;
  const auth = useAuth();
</script>

<template>
  <TableRow :section="'body'" :is-even="isEvenRow">
    <!--kt-datatable__row&#45;&#45;even-->

    <TableColumn :width="columns[0].width">
      {{ user.first_name }}
    </TableColumn>

    <TableColumn :width="columns[1].width">
      {{ user.last_name }}
    </TableColumn>

    <TableColumn :width="columns[2].width">
      {{ user.email }}
    </TableColumn>

    <TableColumn :width="columns[3].width">
      {{ user.roles }}
    </TableColumn>

    <TableColumn :width="columns[4].width">
      <template v-if="user.is_disabled">
        {{ $t('users.status.disabled') }}
      </template>
      <template v-else>
        {{ $t('users.status.enabled') }}
      </template>
    </TableColumn>


    <TableColumn :width="columns[5].width">
      <router-link
        v-if="auth.user().permissions_array.includes('write_users')"
        :to="{ name: 'edit.user', params: { userId: user.id }}"
        exact=""
      >
        <i
          aria-hidden="true"
          class="la la-pencil"
        /> 
        {{ $t('buttons.edit') }}
      </router-link>
    </TableColumn>

    <TableColumn :width="columns[6].width">
      <i
        v-if="auth.user().permissions_array.includes('delete_users')"
        variant="link"
        aria-hidden="true"
        class="la la-trash"
        @click="deleteUser(user, user.id)"
      />
    </TableColumn>
  </TableRow>
</template>
