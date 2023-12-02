import { createAuth } from "@websanova/vue-auth/src/v3.js";
import driverAuthBearer from "@websanova/vue-auth/src/drivers/auth/bearer.js";
import driverHttpAxios from "@websanova/vue-auth/src/drivers/http/axios.1.x.js";
import driverRouterVueRouter from "@websanova/vue-auth/src/drivers/router/vue-router.2.x.js";
import driverOAuth2Google from "@websanova/vue-auth/src/drivers/oauth2/google.js";
import driverOAuth2Facebook from "@websanova/vue-auth/src/drivers/oauth2/facebook.js";

// Constants for OAuth2 configurations (move to environment or config files later)
const GOOGLE_CLIENT_ID =
  "547886745924-4vrbhl09fr3t771drtupacct6f788566.apps.googleusercontent.com";
const FACEBOOK_CLIENT_ID = "196729390739201";

// Configure OAuth2 drivers
driverOAuth2Google.params.client_id = GOOGLE_CLIENT_ID;
driverOAuth2Facebook.params.client_id = FACEBOOK_CLIENT_ID;

// The function to initialize and configure the auth plugin
export default (app) => {
  app.use(
    createAuth({
      plugins: {
        http: app.axios,
        router: app.router,
      },
      drivers: {
        http: driverHttpAxios,
        auth: driverAuthBearer,
        router: driverRouterVueRouter,
        oauth2: {
          google: driverOAuth2Google,
          facebook: driverOAuth2Facebook,
        },
      },
      options: {
        rolesKey: "permissions_array",
        parseUserData: function (data) {
          return data;
        },
      },
    }),
  );
};
