import createHttpError from "http-errors";

export const errorHandleMiddleware = (server) => {
  server.use((req, res, next) => {
    next(createHttpError(404, "Not found"));
  });
  server.use((err, req, res, next) => {
    const status = err.status ? err.status : 500;
    return res.status(status).json({
      msg: err.message,
      status,
    });
  });
};
