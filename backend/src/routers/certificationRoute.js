import { Router } from "express";
import { certificateController } from "../controllers";
import { jwtMiddleware } from "../middlewares";

const baseUrl = "/api/v1/certification";
const {
  createNewCertification,
  updateCertification,
  getCertificationById,
  deleteCertificationById,
  getListCertificationPerPage,
} = certificateController;

export const certificationRoute = Router();
certificationRoute.use(`${baseUrl}`, jwtMiddleware);
certificationRoute.route(`${baseUrl}`).post(createNewCertification);
certificationRoute
  .route(`${baseUrl}/:certificationId`)
  .get(getCertificationById);
certificationRoute.route(`${baseUrl}`).get(getListCertificationPerPage);
certificationRoute
  .route(`${baseUrl}/:certificationId`)
  .delete(deleteCertificationById);
certificationRoute
  .route(`${baseUrl}/:certificationId`)
  .put(updateCertification);
