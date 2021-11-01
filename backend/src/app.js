import { Server, dbConnection, envVariables } from "./configs";
import { defaultMiddleware, errorHandleMiddleware } from "./middlewares";
const { port, connectString } = envVariables;
const main = async () => {
  const server = new Server(port);

  server.registerMiddleware(defaultMiddleware);
  server.listen();
  dbConnection(connectString);
  server.registerMiddleware(errorHandleMiddleware);
};
main();
