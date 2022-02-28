import { Course, Food, Recipe, User, UserDetail } from "../models";

const getListFoodAndRecipe = async (req, res, next) => {
  try {
    const page = 1;
    const numOfPerPage = 15;

    const start = (page - 1) * numOfPerPage;
    let totalNumOfItems;
    const recipes = await Recipe.find()
      .skip(start)
      .limit(Number(totalNumOfItems));

    const meats = await Food.find({ typeId: 1 })
      .skip(start)
      .limit(Number(totalNumOfItems));
    const poultries = await Food.find({ typeId: 3 })
      .skip(start)
      .limit(Number(totalNumOfItems))
      .limit(Number(totalNumOfItems));
    const seaFoods = await Food.find({ typeId: 2 })
      .skip(start)
      .limit(Number(totalNumOfItems));
    const vegetables = await Food.find({ typeId: 4 })
      .skip(start)
      .limit(Number(totalNumOfItems));

    res.status(200).json({
      status: 200,
      msg: "Get list food and recipe successfully!",
      recipes,
      meats,
      poultries,
      seaFoods,
      vegetables,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getListCourseAndInstructor = async (req, res, next) => {
  try {
    const page = 1;
    const numOfPerPage = 15;

    const start = (page - 1) * numOfPerPage;
    let totalNumOfItems;
    const courses = await Course.find()
      .skip(start)
      .limit(Number(totalNumOfItems));

    let userIds = await User.find({ roleId: 4 });
    userIds = userIds.map((item) => item._id);
    let instructors = await UserDetail.find({ userId: { $in: userIds } })
      .skip(start)
      .limit(Number(totalNumOfItems));

    instructors = instructors.map((item, idx) => ({
      ...item._doc,
      _id: userIds[idx]._id,
      email: userIds[idx].email,
    }));

    res.status(200).json({
      status: 200,
      msg: "Get list course and instructor successfully!",
      courses: courses.map((item) => ({
        ...item._doc,
        videoList: [item.videoList[0]],
      })),
      instructors,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const homePageClientController = {
  getListCourseAndInstructor,
  getListFoodAndRecipe,
};
