// vue.d.ts
import { AxiosInstance } from 'axios';
import { Router } from 'vue-router';
import { VueAuth } from '@websanova/vue-auth';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    auth: VueAuth;
    axios: AxiosInstance;
    router: Router;
  }
}
