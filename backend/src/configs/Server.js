import express from "express";
export class Server {
  constructor(port) {
    this.port = port;
    this.app = express();
    this.server = require("http").Server(this.app);
  }
  getApp() {
    return this.app;
  }
  getServer() {
    return this.server;
  }
  registerMiddleware(middleware) {
    middleware(this.app);
  }
  registerRouter(router) {
    this.app.use(router);
  }
  listen() {
    this.server.listen(this.port, () => {
      console.log("Start server at port", this.port);
    });
  }
}
