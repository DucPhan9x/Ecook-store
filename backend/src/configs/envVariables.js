require("dotenv").config();

export const envVariables = {
  baseUrl: process.env.baseUrl || "http://localhost:5001/",
  port: process.env.PORT || "5001",
  connectString:
    process.env.CONNSTR ||
    "mongodb+srv://ecook:ecook@cluster0.fp7hq.mongodb.net/ecook?retryWrites=true&w=majority",
  nodeEnv: process.env.NODE_ENV || "development",
  refreshTokenSecret:
    process.env.REFRESH_TOKEN_SECRET || "ecooksystem_refresh_secret",
  tokenLife: process.env.TOKEN_LIFE || "864000",
  refreshTokenLife: process.env.REFRESH_TOKEN_LIFE || "30d",
  jwtSecret: process.env.JWTSERCRET || "ecooksystem",
  nodemailerEmail: process.env.NODE_EMAILER_EMAIL || "system.ecook@gmail.com",
  nodemailerPassword: process.env.NODE_EMAILER_PASSWORD || "Trongduc@22851999",
  frontendURL: process.env.FRONTEND_URL || "http://localhost:3000/",
  cloud_name: process.env.CLOUD_NAME || "duc",
  api_key_cloud: process.env.API_KEY_CLOUD || "812936253661222",
  api_secret_cloud:
    process.env.API_SECRET_CLOUD || "s6gT1bYHE3ssHzwpP0U5UQpT9KE",
  clientIdPaypal:
    process.env.CLIENT_ID_PAYPAL ||
    "ARUIrTW8NhtmXUbAC9kQTEexJJKUAQITsztb-EDlHbbO61N8Se_pzIHbyd8DQAklr5SP-BQhGpq6kHa4",
  clientSecretPaypal:
    process.env.CLIENT_SECRET_PAYPAL ||
    "ENXELU7qdJ4afwlkvujA7s8crVI_8nrXEhkW9WtgFevCG012qNJzKWtzugt8a4DCPZV0moJmACJNRDKU",
  modePaypal: process.env.MODE_PAYPAL || "sandbox",
  PAYPAL_API: process.env.PAYPAL_API || "https://api-m.sandbox.paypal.com",
  API_GOOGLEMAP_KEY:
    process.env.API_GOOGLEMAP_KEY || "AIzaSyClKcvRulhEqBlzazZFLxrTNr5W_DMCps8",
  MY_ADDRESS:
    process.env.MY_ADDRESS ||
    "62/07, nguyen luong bang, hoa khanh, lien chieu, da nang",
};
