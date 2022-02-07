import { Router } from "express";
import { profileController } from "../controllers";
import { jwtMiddleware } from "../middlewares";
import { validateRequestBody } from "../middlewares";
const { validateProfileData } = validateRequestBody;

const baseUrl = "/api/v1/profile";
const { getProfile, updateProfile, updateAvatar } = profileController;

export const profileRoute = Router();
profileRoute.use(`${baseUrl}`, jwtMiddleware);
profileRoute.route(`${baseUrl}`).get(getProfile);
profileRoute.route(`${baseUrl}`).put(validateProfileData, updateProfile);
profileRoute.route(`${baseUrl}/avatar`).put(updateAvatar);
