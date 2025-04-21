// This is required to type Provide/Inject
import type { Auth } from '@websanova/vue-auth';
import type { AxiosInstance } from 'axios';
import type { InjectionKey } from 'vue';

export const AxiosKey: InjectionKey<AxiosInstance> = Symbol('axios');
export const AuthKey: InjectionKey<Auth> = Symbol('auth');
