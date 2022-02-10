import createHttpError from "http-errors";
import { Feedback, Food, Reply, UserDetail } from "../models";

const addFeedback = async (req, res, next) => {
  try {
    const user = req.user;
    const userDetail = await UserDetail.findOne({ userId: user._id });
    let { numOfStars, content, foodId } = req.body;
    const food = await Food.findById(foodId);
    if (!food) throw createHttpError(404, "The id of food is invalid!");
    let foodNumOfStars = food.numOfStars || 0;
    let numOfFeedbacks = food.numOfFeedbacks || 0;
    foodNumOfStars = foodNumOfStars * numOfFeedbacks;
    numOfFeedbacks++;
    numOfStars = (numOfStars + foodNumOfStars) / numOfFeedbacks;
    await Food.findByIdAndUpdate(foodId, {
      numOfStars,
      numOfFeedbacks,
    });
    await Feedback.create({
      itemId: foodId,
      userId: userDetail.userId,
      content,
      numOfStars,
    });
    res.status(200).json({
      status: 200,
      msg: "Create feedback successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const reply = async (req, res, next) => {
  try {
    const userDetail = await UserDetail.findOne({ userId: req.user._id });
    const { feedbackId, content } = req.body;
    const newReply = Reply({
      userName: userDetail.fullName,
      content,
    });
    await Feedback.findByIdAndUpdate(feedbackId, {
      $push: {
        reply: newReply,
      },
    });
    res.status(200).json({
      status: 200,
      msg: "Reply success!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAllFeedbacks = async (req, res, next) => {
  try {
    const { foodId } = req.params;
    let feedbacks = await Feedback.find({ foodId });
    console.log(feedbacks);
    feedbacks = feedbacks.map((x) => {
      return {
        _id: x._id,
        userId: req.user._id,
        userName: x.userName,
        content: x.content,
        numOfStars: x.numOfStars,
        createAt: x.createAt,
        reply: x.reply,
      };
    });
    res.status(200).json({
      status: 200,
      msg: "Get all feedbacks successfully!",
      feedbacks,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const feedbackController = {
  addFeedback,
  reply,
  getAllFeedbacks,
};
