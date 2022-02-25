import { Examination, Feedback, UserDetail } from "../models";
import { Course } from "../models/CourseModel";
import createHttpError from "http-errors";

const createNewCourse = async (req, res, next) => {
  try {
    const {
      courseName,
      discountOff,
      discountMaximum,
      description,
      unitPrice,
      videoList,
      examination,
    } = req.body;
    const instructorId = req.user._id;
    const instructor = await UserDetail.findOne({ userId: instructorId });
    const newCourse = await Course.create({
      courseName,
      discountOff,
      discountMaximum,
      instructorId,
      description,
      unitPrice,
      videoList,
    });

    const newExamination = await Examination.create({
      ...examination,
      courseId: newCourse._id,
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
      description,
      unitPrice,
      videoList,
      examination,
      courseId,
    } = req.body;
    const instructorId = req.user._id;

    const existedCourse = await Course.findOne({
      _id: courseId,
      isRemoved: false,
    });
    const existedExamination = await Examination.findOne({
      courseId,
      isRemoved: false,
    });
    if (!existedCourse) {
      throw createHttpError(404, "Course is not exist!");
    }
    if (!existedExamination) {
      throw createHttpError(404, "Examination is not exist!");
    }
    if (existedCourse.instructorId != instructorId) {
      throw createHttpError(
        404,
        "You're not instructor that created this course!"
      );
    }
    await Course.findByIdAndUpdate(courseId, {
      courseName,
      discountOff,
      discountMaximum,
      instructorId,
      description,
      unitPrice,
      videoList,
    });
    await Examination.findOneAndUpdate(
      { courseId },
      {
        examination,
      }
    );
    const instructor = await UserDetail.findOne({ userId: instructorId });
    const newCourse = await Course.findById(courseId);
    const newExamination = await Examination.findById(existedExamination._id);

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
    const { courseIds } = req.body;
    const instructorId = req.user._id;
    for (let i = 0; i < courseIds.length; i++) {
      const courseId = courseIds[i];
      const course = await Course.findOne({ _id: courseId, isRemoved: false });

      if (!course) {
        throw createHttpError(400, "Course is not exist!");
      }
      if (course.instructorId != instructorId) {
        throw createHttpError(
          404,
          "You're not instructor that created this course!"
        );
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
    }

    res.status(200).json({
      status: 200,
      msg: "Delete course(s) successfully!",
      courseIds,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getListCoursePerPage = async (req, res, next) => {
  try {
    let { page, searchText, orderBy, orderType, numOfPerPage } = req.query;
    numOfPerPage = Number(numOfPerPage);
    page = page ? page : 1;
    searchText = searchText ? searchText : "";
    orderBy = orderBy ? orderBy : "unitPrice";
    orderType = orderType === "asc" ? 1 : -1;
    const orderQuery = { [orderBy]: orderType };

    const start = (page - 1) * numOfPerPage;
    let totalNumOfCourses;
    let courses;
    if (searchText) {
      courses = await Course.find({
        $text: { $search: searchText },
        isRemoved: false,
      })
        .skip(start)
        .limit(numOfPerPage)
        .sort(orderQuery);
      totalNumOfCourses = await Course.find({
        $text: { $search: searchText },
        isRemoved: false,
      }).count();
    } else {
      courses = await Course.find({ isRemoved: false })
        .skip(start)
        .limit(numOfPerPage)
        .sort(orderQuery);
      totalNumOfCourses = await Course.find({ isRemoved: false }).count();
    }
    const totalPage = parseInt(totalNumOfCourses / numOfPerPage) + 1;

    let instructorsData = courses.map((item) =>
      UserDetail.findOne({ userId: item.instructorId })
    );
    instructorsData = await Promise.all(instructorsData);
    courses = courses.map((item, index) => ({
      ...item._doc,
      instructor: instructorsData[index],
    }));
    const totalRows = await Course.find({ isRemoved: false }).count();

    res.status(200).json({
      status: 200,
      msg: "Get courses successfully!",
      courses,
      totalPage,
      totalRows,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// get 15 items
const getListCoursesRelated = async (req, res, next) => {
  try {
    let { searchText } = req.query;
    numOfPerPage = Number(15);
    page = 1;
    searchText = searchText;

    const start = (page - 1) * numOfPerPage;
    let courses;
    courses = await Course.find({
      $text: { $search: searchText },
      isRemoved: false,
    })
      .skip(start)
      .limit(numOfPerPage);

    res.status(200).json({
      status: 200,
      msg: "Get courses successfully!",
      courses,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getListCourseByInstructorId = async (req, res, next) => {
  try {
    let { page, searchText, orderBy, orderType, numOfPerPage } = req.query;
    const instructorId = req.user._id;

    numOfPerPage = Number(numOfPerPage);
    page = page ? page : 1;
    searchText = searchText ? searchText : "";
    orderBy = orderBy ? orderBy : "unitPrice";
    orderType = orderType === "asc" ? 1 : -1;
    const orderQuery = { [orderBy]: orderType };

    const start = (page - 1) * numOfPerPage;
    let totalNumOfCourses;
    let courses;
    if (searchText) {
      courses = await Course.find({
        $text: { $search: searchText },
        isRemoved: false,
        instructorId,
      })
        .skip(start)
        .limit(numOfPerPage)
        .sort(orderQuery);
      totalNumOfCourses = await Course.find({
        $text: { $search: searchText },
        isRemoved: false,
        instructorId,
      }).count();
    } else {
      courses = await Course.find({ isRemoved: false, instructorId })
        .skip(start)
        .limit(numOfPerPage)
        .sort(orderQuery);
      totalNumOfCourses = await Course.find({
        isRemoved: false,
        instructorId,
      }).count();
    }
    const totalPage = parseInt(totalNumOfCourses / numOfPerPage) + 1;

    let instructorsData = courses.map((item) =>
      UserDetail.findOne({ userId: item.instructorId })
    );
    instructorsData = await Promise.all(instructorsData);
    courses = courses.map((item, index) => ({
      ...item._doc,
      instructor: instructorsData[index],
    }));
    const totalRows = await Course.find({
      isRemoved: false,
      instructorId,
    }).count();

    res.status(200).json({
      status: 200,
      msg: "Get courses successfully!",
      courses,
      totalPage,
      totalRows,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    let course = await Course.findOne({ _id: courseId, isRemoved: false });
    let examination = await Examination.findOne({ courseId, isRemoved: false });
    if (!course) {
      throw createHttpError(400, "Course is not exist!");
    }
    if (!examination) {
      throw createHttpError(400, "Examination is not exist!");
    }
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
      examination,
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

// client
const getCoursesByClientId = async (req, res, next) => {
  try {
    const customer = await UserDetail.findOne({ userId: req.user._id });

    res.status(200).json({
      status: 200,
      msg: "Get courses successfully!",
      courses: customer.courseList,
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
  getListCoursesRelated,
  getListCourseByInstructorId,
  getCoursesByClientId,
};
