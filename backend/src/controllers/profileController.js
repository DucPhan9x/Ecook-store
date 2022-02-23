import createHttpError from "http-errors";
import { deleteImage, uploadSingle } from "../configs";
import { User, UserDetail } from "../models";

const getProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findOne({ _id: userId });
    const userDetail = await UserDetail.findOne({ userId }, [
      "imageUrl",
      "fullName",
      "address",
      "dateOfBirth",
      "phoneNumber",
    ]);

    if (!user) {
      throw createHttpError(404, "User is not exists");
    }
    res.status(200).json({
      status: 200,
      msg: "Get user profile successfully!",
      data: {
        _id: userId,
        email: user.email,
        roleId: user.roleId,
        fullName: userDetail.fullName,
        dateOfBirth: userDetail.dateOfBirth,
        phoneNumber: userDetail.phoneNumber,
        address: userDetail.address,
        imageUrl: userDetail.imageUrl,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { fullName, phoneNumber, dateOfBirth, address } = req.body;
    const userId = req.user._id;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw createHttpError(404, "User is not exist!");
    }
    await UserDetail.findOneAndUpdate(
      { userId },
      {
        phoneNumber,
        fullName,
        dateOfBirth,
        address,
      }
    );
    res.status(200).json({
      status: 200,
      msg: "Update profile successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const userDetail = await UserDetail.findOne({
      userId: req.user._id,
    });
    if (!userDetail) {
      throw createHttpError(404, "User is not exist");
    }
    const asset_id = userDetail.imageUrl.split("/").pop().split(".")[0];
    if (asset_id) {
      await deleteImage(asset_id);
    }
    const image = await uploadSingle(req.files[0].path);
    await UserDetail.findByIdAndUpdate(userDetail._id, {
      imageUrl: image.url,
    });
    res.status(200).json({
      status: 200,
      msg: "Update avatar successfully!",
      imageUrl: image.url,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const profileController = {
  getProfile,
  updateProfile,
  updateAvatar,
};
