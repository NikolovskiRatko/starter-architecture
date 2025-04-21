import type { DatatableColumns } from '@starter-core/dash-ui/src';

export const USERS_DATATABLE_COLUMNS: DatatableColumns = [
  {
    id: 0,
    label: 'users.datatable.avatar',
    name: 'avatar',
    sortable: false,
  },
  {
    id: 1,
    label: 'users.datatable.first_name',
    name: 'first_name',
    sortable: true,
  },
  {
    id: 2,
    label: 'users.datatable.last_name',
    name: 'last_name',
    sortable: true,
  },
  {
    id: 3,
    label: 'users.datatable.email',
    name: 'email',
    sortable: true,
  },
  {
    id: 4,
    label: 'users.datatable.user_role',
    name: 'roles',
  },
  {
    id: 5,
    label: 'users.datatable.status',
    name: 'status',
  },
  {
    id: 6,
    label: 'strings.actions',
    name: 'actions',
  },
  {
    id: 7,
    label: 'strings.delete',
    name: 'delete',
  },
];
