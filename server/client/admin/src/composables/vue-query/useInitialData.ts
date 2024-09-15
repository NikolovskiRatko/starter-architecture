import type { QueryFunction, UseQueryReturnType } from "@tanstack/vue-query";
import { useQuery } from "@tanstack/vue-query";
import axios from "axios";

interface InitialData {
  mainMenu: any;
  navMenu: any;
}

export const getInitialData: QueryFunction<InitialData> = async () => {
  const { data } = await axios.get("vue");
  return data;
};

export const useInitialData = (): UseQueryReturnType<InitialData, unknown> => {
  return useQuery({
    queryKey: ["initial-data"],
    queryFn: getInitialData,
    initialData: {
      mainMenu: [],
      navMenu: [],
    },
  });
};
