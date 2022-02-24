import { Router } from "express";
import { certificateController } from "../controllers";
import { jwtMiddleware, validatePermission } from "../middlewares";

const baseUrl = "/api/v1/certification";
const {
  createNewCertification,
  updateCertification,
  getCertificationById,
  deleteCertificationById,
  getListCertificationPerPage,
  getCertificationByClientIdAndCourseId,
} = certificateController;

export const certificationRoute = Router();
certificationRoute.use(`${baseUrl}`, jwtMiddleware);
certificationRoute
  .route(`${baseUrl}`)
  .post(validatePermission.isCustomerRole, createNewCertification);
certificationRoute
  .route(`${baseUrl}/:certificationId`)
  .get(getCertificationById);
certificationRoute.route(`${baseUrl}?`).get(getListCertificationPerPage);
certificationRoute
  .route(`${baseUrl}`)
  .delete(validatePermission.isInstructorRole, deleteCertificationById);
certificationRoute
  .route(`${baseUrl}`)
  .put(validatePermission.isInstructorRole, updateCertification);
certificationRoute
  .route(`${baseUrl}/client?`)
  .get(getCertificationByClientIdAndCourseId);
