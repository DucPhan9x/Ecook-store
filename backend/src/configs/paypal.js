import { envVariables } from "./envVariables";

const paypal = require("paypal-rest-sdk");
paypal.configure({
  mode: envVariables.modePaypal,
  client_id: envVariables.clientIdPaypal,
  client_secret: envVariables.clientSecretPaypal,
});
export default paypal;
