import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import express from "express";
import { upload, envVariables } from "../configs";
const { nodeEnv } = envVariables;
const morgan = nodeEnv !== "production" && require("morgan");
export const defaultMiddleware = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(helmet());
  app.use(cors({ origin: "*" }));
  app.use(express.json());
  app.use(upload.any());
  app.use(express.static("public"));
  morgan && app.use(morgan("dev"));
};
