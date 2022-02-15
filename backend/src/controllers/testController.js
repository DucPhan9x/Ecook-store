import { Examination, UserDetail, Test } from "../models";
import createHttpError from "http-errors";

const submitTestOfExamination = async (req, res, next) => {
  try {
    const studentId = req.user._id;
    const { courseId, videoUrlSubmit } = req.body;

    const examination = await Examination.findOne({ courseId });
    if (examination) {
      throw createHttpError(404, "Examination is not exist!");
    }
    const newTest = await Test.create({
      examinationId: examination._id,
      studentId,
      videoUrlSubmit,
    });

    await Examination.findByIdAndUpdate(examination._id, {
      tests: examination.tests.push(newTest),
    });

    res.status(200).json({
      status: 200,
      msg: "Submit test successfully!",
      data: newTest,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateTestOfExamination = async (req, res, next) => {
  try {
    const { isPass, evaluate, studentId } = req.body;
    const courseId = req.params.courseId;
    const existedCourse = await Course.findById(courseId);
    const existedExamination = await Examination.findOne({ courseId });
    const test = await Test.findOne({
      studentId,
      examinationId: existedExamination._id,
    });
    if (!existedCourse) {
      throw createHttpError(404, "Course is not exist!");
    }
    if (!existedExamination) {
      throw createHttpError(404, "Examination is not exist!");
    }
    if (!test) {
      throw createHttpError(404, "Test is not exist!");
    }
    const newTest = await Test.findByIdAndUpdate(test._id, {
      isPass,
      evaluate,
      updateAt: new Date(),
    });

    let testsBySelectedExam = existedExamination.tests;
    const index = testsBySelectedExam.findIndex(
      (item) => item._id === newTest._id
    );
    testsBySelectedExam[index] = newTest;

    await Examination.findByIdAndUpdate(existedExamination._id, {
      tests: testsBySelectedExam,
    });

    res.status(200).json({
      status: 200,
      msg: "Update test successfully!",
      test: newTest,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getListTest = async (req, res, next) => {
  try {
    let { orderBy, orderType, courseId, isPass } = req.query;
    const existedExamination = await Examination.findOne({ courseId });
    if (!existedExamination) {
      throw createHttpError(404, "Examination is not exist!");
    }

    searchText = searchText ? searchText : "";
    orderBy = orderBy ? orderBy : "";
    orderType = orderType ? orderType : 1;
    const orderQuery = orderBy ? { [orderBy]: orderType } : {};

    let tests;
    tests = await Test.find({
      isRemoved: true,
      examinationId: existedExamination._id,
      isPass,
    }).sort(orderQuery);

    tests = Promise.all(
      tests.map((item) => ({
        ...item,
        student: UserDetail.findOne({ userId: item.studentId }),
      }))
    );
    res.status(200).json({
      status: 200,
      msg: "Get tests successfully!",
      tests,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getTestByExamination = async (req, res, next) => {
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

    const test = await Test.findOne({
      examinationId: existedExamination._id,
      studentId: req.user._id,
    });
    if (!test) {
      throw createHttpError(404, "Test is not exist!");
    }
    const student = await UserDetail.findOne({ userId: test.studentId });

    res.status(200).json({
      status: 200,
      msg: "Get test successfully!",
      data: { ...test, student },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const testController = {
  submitTestOfExamination,
  updateTestOfExamination,
  getListTest,
  getTestByExamination,
};
