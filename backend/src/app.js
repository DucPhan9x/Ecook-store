import { Server, dbConnection, envVariables } from "./configs";
import { defaultMiddleware, errorHandleMiddleware } from "./middlewares";
import {
  authRoute,
  feedbackRoute,
  foodRoute,
  profileRoute,
  courseRoute,
  recipeRoute,
  voucherRoute,
  wishlistRoute,
  employeeRoute,
  examinationRoute,
  testRoute,
  certificationRoute,
} from "./routers";
const { port, connectString } = envVariables;
const main = async () => {
  const server = new Server(port);

  server.registerMiddleware(defaultMiddleware);
  server.listen();
  dbConnection(connectString);

  server.registerRouter(authRoute);
  server.registerRouter(profileRoute);
  server.registerRouter(foodRoute);
  server.registerRouter(feedbackRoute);
  server.registerRouter(courseRoute);
  server.registerRouter(recipeRoute);
  server.registerRouter(voucherRoute);
  server.registerRouter(wishlistRoute);
  server.registerRouter(employeeRoute);
  server.registerRouter(examinationRoute);
  server.registerRouter(testRoute);
  server.registerRouter(certificationRoute);

  server.registerMiddleware(errorHandleMiddleware);
};
main();
