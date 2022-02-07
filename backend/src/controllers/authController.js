import { Role, User, UserDetail, Wishlist } from "../models";
import bcrypt from "bcryptjs";
import createHttpError from "http-errors";
import { encodeToken, destroyToken } from "../utils";
import { sendEmail, getResetCode, confirmResetCode } from "../utils";
import { envVariables } from "../configs";
import crypto from "crypto";

const createAdminAccount = async (req, res, next) => {
  const { email, password, roleId, fullName } = req.body;
  try {
    const userExisted = await User.findOne({ email });
    if (userExisted) {
      throw createHttpError(400, "This email is used by others!");
    }
    // Check role
    const checkRole = await Role.findOne({ id: roleId });
    if (!checkRole || checkRole.roleName != "admin") {
      throw createHttpError(400, "Role is invalid");
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const activeToken = await crypto
      .createHash("md5")
      .update(Math.random().toString().substring(2))
      .digest("hex");

    const newUser = await User.create({
      email,
      password: hashPassword,
      roleId: roleId,
      createAt: Date.now(),
      isActive: true,
      activeToken,
    });

    await UserDetail.create({
      userId: newUser._id,
      fullName,
      phoneNumber: "",
      address: "",
      imageUrl: "",
    });

    res.status(200).json({
      status: 200,
      msg: "Created admin account successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const registerCustomer = async (req, res, next) => {
  const { email, password, roleId, fullName } = req.body;
  try {
    const userExisted = await User.findOne({ email });
    if (userExisted) {
      throw createHttpError(400, "This email is used by others!");
    }
    // Check role
    const checkRole = await Role.findOne({ id: roleId });
    if (!checkRole || checkRole.roleName != "customer") {
      throw createHttpError(400, "Role is invalid");
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const activeToken = await crypto
      .createHash("md5")
      .update(Math.random().toString().substring(2))
      .digest("hex");
    // send link to active account
    const message = `Click to active: <a href="${envVariables.baseUrl}api/v1/auth/confirm/${activeToken}">Activate</a>`;
    await sendEmail(email, "Active your account", "Click to active: ", message);

    const newUser = await User.create({
      email,
      password: hashPassword,
      roleId: roleId,
      createAt: Date.now(),
      isActive: false,
      activeToken,
    });

    await UserDetail.create({
      userId: newUser._id,
      fullName,
      phoneNumber: "",
      address: "",
      imageUrl: "",
    });
    await Wishlist.create({
      userId: newUser._id,
      itemIds: [],
    });

    res.status(200).json({
      status: 200,
      msg: "Register is success!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const activeAccount = async (req, res, next) => {
  const { token } = req.params;
  try {
    const user = await User.findOne({ activeToken: token });
    if (!user) {
      return res.redirect(`${envVariables.frontendURL}/register`);
    }
    user.isActive = true;
    await user.save();
    return res.redirect(`${envVariables.frontendURL}/login`);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userExisted = await User.findOne({ email, roleId: 1 });
    if (!userExisted) {
      throw createHttpError(400, "Email doesn't exist!");
    }
    const match = await bcrypt.compare(password, userExisted.password);
    if (!match) {
      throw createHttpError(400, "Password is incorrect!");
    }
    if (!userExisted.isActive) {
      throw createHttpError(
        400,
        "Your account hasn't activated, please check email to active right now!"
      );
    }
    const userData = {
      _id: userExisted._id,
      email: userExisted.email,
      roleId: userExisted.roleId,
    };

    const token = await encodeToken(userData);
    const userDetail = await UserDetail.findOne({ userId: userExisted._id }, [
      "imageUrl",
      "fullName",
      "address",
      "dateOfBirth",
      "phoneNumber",
      "gender",
    ]);
    res.status(200).json({
      status: 200,
      msg: "success!",
      user: {
        _id: userExisted._id,
        roleId: userExisted.roleId,
        token,
        userId: userExisted._id,
        fullName: userDetail.fullName,
        dateOfBirth: userDetail.dateOfBirth,
        phoneNumber: userDetail.phoneNumber,
        gender: userDetail.gender,
        address: userDetail.address,
        imageUrl: userDetail.imageUrl,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userExisted = await User.findOne({ roleId: { $gt: 1 }, email });
    if (!userExisted) {
      throw createHttpError(400, "Email doesn't exist!");
    }
    const match = await bcrypt.compare(password, userExisted.password);
    if (!match) {
      throw createHttpError(400, "Password is incorrect!");
    }
    if (!userExisted.isActive) {
      throw createHttpError(
        400,
        "Your account hasn't activated, please check email to active right now!"
      );
    }
    const userData = {
      _id: userExisted._id,
      email: userExisted.email,
      roleId: userExisted.roleId,
    };

    const token = await encodeToken(userData);
    const userDetail = await UserDetail.findOne({ userId: userExisted._id }, [
      "imageUrl",
      "fullName",
      "address",
    ]);
    res.status(200).json({
      status: 200,
      msg: "success!",
      user: {
        _id: userExisted._id,
        roleId: userExisted.roleId,
        token,
        userId: userExisted._id,
        imageUrl: userDetail.imageUrl,
        fullName: userDetail.fullName,
        address: userDetail.address,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    console.log(req.user._id);
    const userId = req.user._id;
    await destroyToken(userId);
    res.status(200).json({
      status: 200,
      msg: "Logout success!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const sendResetCode = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createHttpError(400, "Email is invalid!");
    }
    const code = await getResetCode(user._id, next);
    const message = "Your code for reset password is: " + code;
    await sendEmail(email, "Reset Code for change password", message, "");
    res.status(200).json({
      status: 200,
      msg: "Send reset code successfully!. Please check your email.",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { code, email, newPassword, confirmPassword } = req.body;

    const user = await User.findOne({ email });
    const confirmed = await confirmResetCode(code, user._id, next);
    const match = await bcrypt.compare(newPassword, user.password);

    if (!confirmed) {
      throw createHttpError(400, "Reset code is invalid!");
    }
    if (newPassword != confirmPassword)
      throw createHttpError(
        400,
        "New password and confirm password are not matched!"
      );
    if (match)
      throw createHttpError(400, "New password duplicate old password!");

    const hashPassword = await bcrypt.hash(newPassword, 12);
    await User.findByIdAndUpdate(user._id, {
      password: hashPassword,
    });
    res.status(200).json({
      status: 200,
      msg: "Reset password successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) throw createHttpError(400, "Old password is incorrect!");
    if (newPassword != confirmPassword)
      throw createHttpError(
        400,
        "New password and confirm password is not match!"
      );
    const hashPassword = await bcrypt.hash(newPassword, 12);
    await User.findByIdAndUpdate(user._id, {
      password: hashPassword,
    });
    res.status(200).json({
      status: 200,
      msg: "Change password successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getRoleId = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 200,
      msg: "Get roleId successfully!",
      roleId: req.user.roleId,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const authController = {
  registerCustomer,
  login,
  loginAdmin,
  logout,
  sendResetCode,
  resetPassword,
  changePassword,
  activeAccount,
  getRoleId,
  createAdminAccount,
};
