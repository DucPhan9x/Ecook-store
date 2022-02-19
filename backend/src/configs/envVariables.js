require("dotenv").config();

export const envVariables = {
  baseUrl: process.env.baseUrl,
  port: process.env.PORT,
  connectString: process.env.CONNSTR,
  nodeEnv: process.env.NODE_ENV,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  tokenLife: process.env.TOKEN_LIFE,
  refreshTokenLife: process.env.REFRESH_TOKEN_LIFE,
  jwtSecret: process.env.JWTSERCRET,
  nodemailerEmail: process.env.NODE_EMAILER_EMAIL,
  nodemailerPassword: process.env.NODE_EMAILER_PASSWORD,
  frontendURL: process.env.FRONTEND_URL,
  cloud_name: process.env.CLOUD_NAME,
  api_key_cloud: process.env.API_KEY_CLOUD,
  api_secret_cloud: process.env.API_SECRET_CLOUD,
  clientIdPaypal: process.env.CLIENT_ID_PAYPAL,
  clientSecretPaypal: process.env.CLIENT_SECRET_PAYPAL,
  modePaypal: process.env.MODE_PAYPAL,
  PAYPAL_API: process.env.PAYPAL_API,
};
