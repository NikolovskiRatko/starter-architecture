import { useQuery, UseQueryReturnType } from "@tanstack/vue-query";
import axios, { type AxiosError } from "axios";
import type { ComputedRef } from "vue";
import { USER_API_ENDPOINTS, USERS_TABLE_QUERY_KEY } from "../constants";
import { TableQuery } from "@/components/Datatables/typings";
import type { UsersTableResponse } from "@/modules/users/types";

export const useUsersTable = (
  query: ComputedRef<TableQuery>,
): UseQueryReturnType<UsersTableResponse, AxiosError> => {
  return useQuery({
    queryKey: [USERS_TABLE_QUERY_KEY, query],
    queryFn: async () => {
      const response = await axios.get(USER_API_ENDPOINTS.table, {
        params: query.value,
      });
      return response.data;
    },
  });
};
