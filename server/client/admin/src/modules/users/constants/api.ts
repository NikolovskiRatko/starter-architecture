export const USER_API_ENDPOINTS = {
  get: (userId: number) => `/user/${userId}`,
  create: "/user/create",
  patch: (userId: number) => `/user/${userId}`,
  uploadAvatar: (userId: number) => `/user/avatar/${userId}`,
};
