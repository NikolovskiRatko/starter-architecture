export const USER_API_ENDPOINTS = {
  get: (userId: number) => `/user/${userId}`,
  create: "/user/create",
  patch: (userId: number) => `/user/${userId}`,
  uploadAvatar: (userId: number) => `/user/avatar/${userId}`,
  table: "user/draw",
  myProfileGet: "user/myprofile",
  myProfileUpdate: "user/myprofile",
};

export const USERS_TABLE_QUERY_KEY = "users-table";
export const MY_PROFILE_CACHE_KEY = "my-profile";
