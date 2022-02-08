export const envVariables = {
  baseUrl: process.env.baseUrl || "http://localhost:5000/",
  port: process.env.PORT || 5000,
  connectString:
    process.env.CONNSTR ||
    "mongodb+srv://ecook:ecook@cluster0.fp7hq.mongodb.net/ecook?retryWrites=true&w=majority",
  nodeEnv: process.env.NODE_ENV || "development",
  refreshTokenSecret:
    process.env.REFRESH_TOKEN_SECRET || "ecooksystem_refresh_secret",
  tokenLife: process.env.TOKEN_LIFE || 86400,
  refreshTokenLife: process.env.REFRESH_TOKEN_LIFE || "30d",
  jwtSecret: process.env.JWTSERCRET || "ecooksystem",
  nodemailerEmail: process.env.NODE_EMAILER_EMAIL || "system.ecook@gmail.com",
  nodemailerPassword: process.env.NODE_EMAILER_PASSWORD || "Trongduc@22851999",
  frontendURL: process.env.FRONTEND_URL || "http://localhost:3000/",
  cloud_name: process.env.CLOUD_NAME || "duc",
  api_key_cloud: process.env.API_KEY_CLOUD || "812936253661222",
  api_secret_cloud:
    process.env.API_SECRET_CLOUD || "s6gT1bYHE3ssHzwpP0U5UQpT9KE",
};
