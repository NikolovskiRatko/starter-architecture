import type { InjectionKey } from "vue";
import { TableQuery } from "@/components/Datatables/typings";

type OnQueryUpdate = (query: TableQuery) => void;
export const onQueryUpdateKey = Symbol() as InjectionKey<OnQueryUpdate>;
