import {createAuth}          from '@websanova/vue-auth/src/v3.js';
import driverAuthBearer      from '@websanova/vue-auth/src/drivers/auth/bearer.js';
import driverHttpAxios       from '@websanova/vue-auth/src/drivers/http/axios.1.x.js';
import driverRouterVueRouter from '@websanova/vue-auth/src/drivers/router/vue-router.2.x.js';
import driverOAuth2Google    from '@websanova/vue-auth/src/drivers/oauth2/google.js';
import driverOAuth2Facebook  from '@websanova/vue-auth/src/drivers/oauth2/facebook.js';
import http from '@/services/http'
import router from '@/router'

// TODO: Update with real values, these are example from docs
driverOAuth2Google.params.client_id = '547886745924-4vrbhl09fr3t771drtupacct6f788566.apps.googleusercontent.com';
driverOAuth2Facebook.params.client_id = '196729390739201';

const auth = createAuth({
    plugins: {
        http: http,
        router: router,
    },
    drivers: {
        http: driverHttpAxios,
        auth: driverAuthBearer,
        router: driverRouterVueRouter,
        oauth2: {
            google: driverOAuth2Google,
            facebook: driverOAuth2Facebook,
        }
    },
    options: {
        rolesKey: 'permissions',
    }
})

export default auth