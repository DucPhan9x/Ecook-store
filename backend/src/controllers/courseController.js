import { Examination, UserDetail } from "../models";
import { Course } from "../models/CourseModel";
import createHttpError from "http-errors";

const createNewCourse = async (req, res, next) => {
  try {
    const {
      courseName,
      discountOff,
      discountMaximum,
      instructorId,
      description,
      unitPrice,
      videoList,
      examination,
    } = req.body;

    const newExamination = await Examination.create(examination);
    if (newExamination) {
      throw createHttpError(404, "Examination is not exist!");
    }
    const instructor = await UserDetail.findOne({ userId: instructorId });

    const newCourse = await Course.create({
      courseName,
      discountOff,
      discountMaximum,
      instructorId,
      description,
      unitPrice,
      videoList,
      examination: newExamination,
    });

    res.status(200).json({
      status: 200,
      msg: "Create new course successfully!",
      data: { ...newCourse, examination: newExamination, instructor },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateCourseById = async (req, res, next) => {
  try {
    const {
      courseName,
      discountOff,
      discountMaximum,
      instructorId,
      description,
      unitPrice,
      videoList,
      examination,
    } = req.body;
    const courseId = req.params.courseId;
    const existedCourse = await Course.findById(courseId);
    const existedExamination = await Examination.findOne({ courseId });
    if (!existedCourse) {
      throw createHttpError(404, "Course is not exist!");
    }
    if (!existedExamination) {
      throw createHttpError(404, "Examination is not exist!");
    }
    const newCourse = await Course.findByIdAndUpdate(courseId, {
      courseName,
      discountOff,
      discountMaximum,
      instructorId,
      description,
      unitPrice,
      videoList,
    });
    const newExamination = await Examination.findOneAndUpdate(
      { courseId },
      {
        examination,
      }
    );
    const instructor = await UserDetail.findOne({ userId: instructorId });
    res.status(200).json({
      status: 200,
      msg: "Update course successfully!",
      course: { ...newCourse, newExamination, instructor },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteCourseById = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const existedCourse = await Course.findById(courseId);
    const existedExamination = await Examination.findOne({ courseId });
    if (!existedCourse) {
      throw createHttpError(404, "Course is not exist!");
    }
    if (!existedExamination) {
      throw createHttpError(404, "Examination is not exist!");
    }

    await Promise.all([
      Course.findByIdAndUpdate(courseId, {
        isRemoved: true,
      }),
      Examination.findOneAndUpdate(
        { courseId },
        {
          isRemoved: true,
        }
      ),
    ]);
    res.status(200).json({
      status: 200,
      msg: "Delete course successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getListCoursePerPage = async (req, res, next) => {
  try {
    let { page, searchText, orderBy, orderType, numOfPerPage } = req.query;
    page = page ? page : 1;
    searchText = searchText ? searchText : "";
    orderBy = orderBy ? orderBy : "";
    orderType = orderType ? orderType : 1;
    const orderQuery = orderBy ? { [orderBy]: orderType } : {};

    const start = (page - 1) * numOfPerPage;
    let totalNumOfCourses;
    let courses;
    if (searchText) {
      courses = await Course.find({
        $text: { $search: searchText },
        isRemoved: true,
      })
        .skip(start)
        .limit(numOfPerPage)
        .sort(orderQuery);
      totalNumOfCourses = await Course.find({
        $text: { $search: searchText },
        isRemoved: true,
      }).count();
    } else {
      courses = await Course.find({ isRemoved: true })
        .skip(start)
        .limit(numOfPerPage)
        .sort(orderQuery);
      totalNumOfCourses = await Course.find({ isRemoved: true }).count();
    }
    const totalPage = parseInt(totalNumOfCourses / numOfPerPage) + 1;

    courses = Promise.all(
      courses.map((item) => ({
        ...item,
        instructor: UserDetail.findOne({ userId: item.instructorId }),
      }))
    );
    res.status(200).json({
      status: 200,
      msg: "Get courses successfully!",
      courses,
      totalPage,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    let course = await Course.findById(courseId);

    let feedbacks = await Feedback.find({ itemId: courseId });
    feedbacks = feedbacks.map((item) => {
      return {
        _id: item._id,
        userId: item.userId,
        content: item.content,
        numOfStars: item.numOfStars,
        createAt: item.createAt,
        reply: item.reply,
        feedbackType: 3,
      };
    });
    const instructor = await UserDetail.findOne({
      userId: course.instructorId,
    });

    course = {
      ...course._doc,
      feedbacks,
      instructor,
    };
    res.status(200).json({
      status: 200,
      msg: "Get course successfully!",
      course,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const courseController = {
  createNewCourse,
  updateCourseById,
  deleteCourseById,
  getListCoursePerPage,
  getCourseById,
};
