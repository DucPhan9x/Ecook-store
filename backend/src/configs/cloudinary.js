import cloud from "cloudinary";
import createHttpError from "http-errors";
import multer from "multer";
import { nextTick } from "process";
import { envVariables } from "../configs";
const { cloud_name, api_key_cloud, api_secret_cloud } = envVariables;
cloud.v2.config({
  cloud_name: cloud_name,
  api_key: api_key_cloud,
  api_secret: api_secret_cloud,
});

export const upload = new multer({
  dest: "uploads/",
});
export const uploadSingle = async (file) => {
  return new Promise((resolve) => {
    cloud.uploader
      .upload(file, {
        folder: "food",
      })
      .then((result) => {
        if (result) {
          const fs = require("fs");
          fs.unlinkSync(file);
          resolve({
            url: result.secure_url,
          });
        }
      });
  });
};
export const deleteImage = async (asset_id) => {
  try {
    await cloud.v2.uploader.destroy(asset_id);
  } catch (error) {
    console.log(error);
    throw createHttpError(400, error);
  }
};
