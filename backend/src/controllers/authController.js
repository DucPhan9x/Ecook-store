import { Role, User, UserDetail, Wishlist } from "../models";
import bcrypt from "bcryptjs";
import createHttpError from "http-errors";
import { encodeToken, destroyToken } from "../utils";
import { sendEmail } from "../utils";
/**
 * @api {post} /api/v1/auth/register-customer register for customer
 * @apiName Register for customer
 * @apiGroup Auth
 * @apiParam {String} email email's customer account
 * @apiParam {String} password password's customer account
 * @apiParam {Int} roleID role's customer require "customer"
 * @apiParam {String} fullName name's customer
 * @apiParam {String} phoneNumber phone's customer
 * @apiParam {Date} birthday birthday's customer
 * @apiParam {String} address address's customer
 * @apiSuccess {String} msg <code>Regitser success</code> if everything went fine.
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Regitser is success"
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400
 *     {
 *       "status" : 400,
 *       "msg": "\"role\" is required"
 *     }
 */
const registerCustomer = async (req, res, next) => {
  const { email, password, roleId, fullName } = req.body;
  try {
    console.log(req.body);
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
    const newUser = await User.create({
      email,
      password: hashPassword,
      roleId: roleId,
    });

    await UserDetail.create({
      userId: newUser._id,
      fullName,
      phoneNumber,
      address,
    });
    await Wishlist.create({
      userId: newUser._id,
      foodIds: [],
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
/**
 * @api {post} /api/v1/auth/login login for all users
 * @apiName Login for all users
 * @apiGroup Auth
 * @apiParam {String} email email's user account
 * @apiParam {String} password password's user account
 * @apiSuccess {Int} status <code> 200</code>
 * @apiSuccess {String} msg <code>Login success</code> if everything went fine.
 * @apiSuccess {String} token <code>Token of user </code>
 * @apiSuccess {Array[Int]} roleId <code> An array role of user </code>
 * @apiSuccess {ObjectId} userId
 * @apiSuccess {String} imageUrl
 * @apiSuccess {String} fullName
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Login is success",
 *         roleId: [1],
 *         token: "xxx.xxx.xxx",
 *         userId:"605a06776c02022ab46cc160",
 *         imageUrl:"211d2s12c3fsf3s2df",
 *         fullName: "Nguyen Quang Phieu"
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400
 *     {
 *       "status" : 400,
 *       "msg":  userName or password is incorrect!"
 *     }
 */
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userExisted = await User.findOne({ email });
    if (!userExisted) {
      throw createHttpError(400, "Email doesn't exist!");
    }
    const match = await bcrypt.compare(password, userExisted.password);
    if (!match) {
      throw createHttpError(400, "Password is incorrect!");
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
      roleId: userExisted.roleId,
      token,
      userId: userExisted._id,
      imageUrl: userDetail.imageUrl,
      fullName: userDetail.fullName,
      address: userDetail.address,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
/**
 * @api {post} /api/v1/auth/logout Logout for all user
 * @apiName Logout for all user
 * @apiGroup Auth
 * @apiHeader {String} Authorization The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *      "Authorization: Bearer AAA.BBB.CCC"
 * @apiSuccess {Number} status <code> 200 </code>
 * @apiSuccess {String} msg <code>Logoutsuccessfully</code>
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Logout successfully!",
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400
 *     {
 *       "status" : 400,
 *       "msg": "Not found"
 *     }
 */
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
/**
 * @api {post} /api/v1/auth/send-reset-code Send code to reset passsword
 * @apiName Send code to reset passsword
 * @apiGroup Auth
 * @apiParam {String} email email's customer account
 * @apiSuccess {String} msg <code>Send reset code successfully!. Please check your email.</code> if everything went fine.
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Send reset code successfully!. Please check your email."
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400
 *     {
 *       "status" : 400,
 *       "msg": email is invalid!
 *     }
 */
const sendResetCode = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createHttpError(400, "email is invalid!");
    }
    const code = await getResetCode(user._id, next);
    const message = "Your code for reseting password is: " + code;
    await sendEmail(email, "Reset Code for change password", message, "", next);
    res.status(200).json({
      status: 200,
      msg: "Send reset code successfully!. Please check your email.",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
/**
 * @api {post} /api/v1/auth/new-password Reset password when forgot
 * @apiName Reset password when forgot
 * @apiGroup Auth
 * @apiParam {String} email email's user account
 * @apiParam {String} newPassword New password for account
 * @apiParam {String} confirmPassword Confirm password is required matching with new password
 * @apiParam {email} code The code for reseting password. Check in email box.
 * @apiSuccess {Int} status <code> 200</code>
 * @apiSuccess {String} msg <code>Reset password successfully</code> if everything went fine.
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Reset password successfully",
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400
 *     {
 *       "status" : 400,
 *       "msg":  Reset code is invalid!"
 *     }
 */
const resetPassword = async (req, res, next) => {
  try {
    const { code, email, newPassword, confirmPassword } = req.body;
    const user = await User.findOne({ email });
    const confirmed = await confirmResetCode(code, user._id, next);
    if (!confirmed) {
      throw createHttpError(400, "Reset code is invalid!");
    }
    if (newPassword != confirmPassword)
      throw createHttpError(
        400,
        "New password and confirm password are not matched!"
      );
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
/**
 * @api {post} /api/v1/auth/change-password Change password
 * @apiName change password
 * @apiGroup Auth
 * @apiParam {String} oldPassword current password of account
 * @apiParam {String} newPassword  New password for changing passsword
 * @apiParam {String} confirmPassword  Required matching with new password
 * @apiSuccess {Int} status <code> 200</code>
 * @apiSuccess {String} msg <code>Change password successfully</code> if everything went fine.
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Change password successfully",
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400
 *     {
 *       "status" : 400,
 *       "msg":  "Old password is incorrect!"
 *     }
 */
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
/**
 * @api {get} /api/v1/auth/roleId get roleId
 * @apiName get roleId
 * @apiGroup Auth
 * @apiHeader {String} Authorization The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *      "Authorization: Bearer AAA.BBB.CCC"
 * @apiSuccess {Int} status <code> 200</code>
 * @apiSuccess {String} msg <code>get roleId successfully</code> if everything went fine.
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "get roleId successfully",
 *          roleId: 1
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400
 *     {
 *       "status" : 400,
 *       "msg":  "token is invalid!"
 *     }
 */
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
  logout,
  sendResetCode,
  resetPassword,
  changePassword,
  getRoleId,
};
