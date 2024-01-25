import Vue from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';
import { Context } from '@nuxt/types';

export default (ctx: Context) => {
    Vue.use(VueAxios, axios);
    ctx.$axios.setBaseURL(Vue.axios.defaults.baseURL);
    Vue.axios.defaults.withCredentials = true;
    // Init axios for form
    if (process.client) {
        window['axios'] = axios;
    }

};
