import { Examination, UserDetail, Test } from "../models";
import createHttpError from "http-errors";

const submitTestOfExamination = async (req, res, next) => {
  try {
    const studentId = req.user._id;
    const student = await UserDetail.findOne({ userId: studentId });

    const { courseId, videoUrlSubmit } = req.body;

    const examination = await Examination.findOne({
      courseId,
      isRemoved: false,
    });
    if (examination) {
      throw createHttpError(404, "Examination is not exist!");
    }
    const newTest = await Test.create({
      examinationId: examination._id,
      studentId,
      videoUrlSubmit,
    });

    examination.tests.push(newTest);
    await Examination.findByIdAndUpdate(examination._id, {
      tests: examination.tests,
    });

    const newExam = await Examination.findById(examination._id);

    res.status(200).json({
      status: 200,
      msg: "Submit test successfully!",
      test: { ...newTest, student, newExam },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateTestOfExamination = async (req, res, next) => {
  try {
    const { isPass, evaluate, studentId, courseId } = req.body;
    const existedCourse = await Course.findOne({
      _id: courseId,
      isRemoved: false,
    });
    const existedExamination = await Examination.findOne({
      courseId,
      isRemoved: false,
    });
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
    await Test.findByIdAndUpdate(test._id, {
      isPass,
      evaluate,
      updateAt: new Date(),
    });
    const newTest = await Test.findById(test._id);
    const student = await UserDetail.findOne({ userId: newTest.studentId });

    let testsBySelectedExam = existedExamination.tests;
    const index = testsBySelectedExam.findIndex(
      (item) => item._id === test._id
    );
    testsBySelectedExam[index] = newTest;

    await Examination.findByIdAndUpdate(existedExamination._id, {
      tests: testsBySelectedExam,
    });

    res.status(200).json({
      status: 200,
      msg: "Update test successfully!",
      test: { ...newTest._doc, student },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getListTest = async (req, res, next) => {
  try {
    let { page, orderBy, orderType, numOfPerPage, courseId, isPass } =
      req.query;
    const existedExamination = await Examination.findOne({
      courseId,
      isRemoved: false,
    });
    if (!existedExamination) {
      throw createHttpError(404, "Examination is not exist!");
    }

    numOfPerPage = Number(numOfPerPage);
    page = page ? page : 1;
    orderBy = orderBy ? orderBy : "createAt";
    orderType = orderType === "asc" ? 1 : 0;
    const orderQuery = { [orderBy]: orderType };

    const start = (page - 1) * numOfPerPage;
    let totalNumOfTests;
    let tests;
    tests = await Test.find({
      isRemoved: false,
      isPass,
      examinationId: existedExamination._id,
    })
      .skip(start)
      .limit(numOfPerPage)
      .sort(orderQuery);
    totalNumOfTests = await Test.find({
      isRemoved: false,
      examinationId: existedExamination._id,
    }).count();
    const totalPage = parseInt(totalNumOfTests / numOfPerPage) + 1;

    let studentsData = tests.map((item) =>
      UserDetail.findOne({ userId: item.studentId })
    );
    studentsData = await Promise.all(studentsData);

    tests = tests.map((item, index) => ({
      ...item._doc,
      student: studentsData[index],
    }));
    res.status(200).json({
      status: 200,
      msg: "Get tests successfully!",
      tests,
      totalPage,
      totalRows: totalNumOfTests,
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
      test: { ...test, student },
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
