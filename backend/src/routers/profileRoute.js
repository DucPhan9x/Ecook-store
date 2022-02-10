import { Router } from "express";
import { upload } from "../configs";
import { profileController } from "../controllers";
import { jwtMiddleware } from "../middlewares";

const baseUrl = "/api/v1/profile";
const { getProfile, updateProfile, updateAvatar } = profileController;

export const profileRoute = Router();
profileRoute.use(`${baseUrl}`, jwtMiddleware);
profileRoute.route(`${baseUrl}`).get(getProfile);
profileRoute.route(`${baseUrl}`).put(updateProfile);
profileRoute.route(`/api/v1/avatar`).put(jwtMiddleware, updateAvatar);
