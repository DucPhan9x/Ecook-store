export const envVariables = {
  baseUrl: process.env.baseUrl || "http://localhost:3000",
  port: process.env.PORT || 3000,
  connectString:
    process.env.CONNSTR ||
    "mongodb+srv://ecook:ecook@cluster0.fp7hq.mongodb.net/ecook?retryWrites=true&w=majority",
  tokenSecret: process.env.JWTSERCRET || "",
  refreshTokenSecret: process.env.REFRESHTOKEN || "",
  tokenLife: "30d",
  refreshTokenLife: 86400,
};
