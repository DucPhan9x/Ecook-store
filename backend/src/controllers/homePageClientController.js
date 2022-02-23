import { Course, Food, Recipe, UserDetail } from "../models";

const getListFoodAndRecipe = async (req, res, next) => {
  try {
    const page = 1;
    const numOfPerPage = 10;

    const start = (page - 1) * numOfPerPage;
    let totalNumOfItems;
    const recipes = await Recipe.find()
      .skip(start)
      .limit(Number(totalNumOfItems));

    const meats = await Food.find({ typeId: 1 })
      .skip(start)
      .limit(Number(totalNumOfItems));
    const poultries = await Food.find({ typeId: 2 })
      .skip(start)
      .limit(Number(totalNumOfItems))
      .limit(Number(totalNumOfItems));
    const seaFoods = await Food.find({ typeId: 3 })
      .skip(start)
      .limit(Number(totalNumOfItems));
    const vegetables = await Food.find({ typeId: 4 })
      .skip(start)
      .limit(Number(totalNumOfItems));

    res.status(200).json({
      status: 200,
      msg: "Get list food and recipe successfully!",
      items: {
        recipes,
        meats,
        poultries,
        seaFoods,
        vegetables,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getListCourseAndInstructor = async (req, res, next) => {
  try {
    const page = 1;
    const numOfPerPage = 10;

    const start = (page - 1) * numOfPerPage;
    let totalNumOfItems;
    const courses = await Course.find()
      .skip(start)
      .limit(Number(totalNumOfItems));

    const instructors = await UserDetail.find({ roleId: 4 })
      .skip(start)
      .limit(Number(totalNumOfItems));

    res.status(200).json({
      status: 200,
      msg: "Get list course and instructor successfully!",
      items: {
        courses,
        instructors,
      },
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
