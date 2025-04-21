export const USER_PERMISSIONS = {
  readUsers: 'read_users',
  writeUsers: 'write_users',
  deleteUsers: 'delete_users',
  readNavigation: 'read_navigation',
  writeNavigation: 'write_navigation',
  deleteNavigation: 'delete_navigation',
} as const;

export const USER_ROLES = {
  admin: 1,
  editor: 2,
  collaborator: 3,
} as const;

export const USER_CHECK_BY = {
  roles: 'roles',
  permissions: 'permissions',
} as const;
