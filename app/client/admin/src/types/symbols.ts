// This is required to type Provide/Inject
import { Auth } from "@websanova/vue-auth";
import { AxiosInstance } from "axios";
import { InjectionKey } from "vue";

export const AxiosKey: InjectionKey<AxiosInstance> = Symbol("axios");
export const AuthKey: InjectionKey<Auth> = Symbol("auth");
