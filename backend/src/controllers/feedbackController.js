import createHttpError from "http-errors";
import { Course, Feedback, Food, Recipe, Reply, UserDetail } from "../models";

const addFeedback = async (req, res, next) => {
  try {
    const user = req.user;
    const userDetail = await UserDetail.findOne({ userId: user._id });
    let { numOfStars, content, itemId, feedbackType } = req.body;
    let Model;
    if (feedbackType === 1) {
      Model = Food;
    } else {
      if (feedbackType === 2) {
        Model = Recipe;
      } else {
        Model = Course;
      }
    }
    //
    const item = await Model.findById(itemId);
    if (!item) throw createHttpError(404, "The id of item is invalid!");
    let itemNumOfStars = item.numOfStars || 0;
    let numOfFeedbacks = item.numOfFeedbacks || 0;
    itemNumOfStars = itemNumOfStars * numOfFeedbacks;
    numOfFeedbacks++;
    numOfStars = (numOfStars + itemNumOfStars) / numOfFeedbacks;
    await Model.findByIdAndUpdate(itemId, {
      numOfStars,
      numOfFeedbacks,
    });
    await Feedback.create({
      itemId,
      userId: userDetail.userId,
      content,
      feedbackType,
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
    const { feedbackId, content } = req.body;
    const newReply = Reply({
      userId: req.user._id,
      content,
      feedbackId,
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
    const { itemId } = req.params;
    let feedbacks = await Feedback.find({ itemId });
    feedbacks = feedbacks.map(async (x) => {
      // need check again
      const user = await UserDetail.findById(x.userId);
      return {
        _id: x._id,
        userFeedback: user,
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
