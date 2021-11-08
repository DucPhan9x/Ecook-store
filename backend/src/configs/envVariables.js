export const envVariables = {
  baseUrl: process.env.baseUrl || "http://localhost:5000",
  port: process.env.PORT || 5000,
  connectString:
    process.env.CONNSTR ||
    "mongodb+srv://ecook:ecook@cluster0.fp7hq.mongodb.net/ecook?retryWrites=true&w=majority",
  refreshTokenSecret: process.env.REFRESHTOKEN || "",
  tokenLife: "30d",
  refreshTokenLife: 86400,
  jwtSecret: process.env.JWTSERCRET || "ecooksystem",
};
