import createHttpError from "http-errors";
import { Course, Examination } from "../models";

const getExaminationByCourseId = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    let examination = await Examination.findOne({ courseId, isRemoved: false });
    let course = await Course.findOne({ _id: courseId, isRemoved: false });
    if (!course) {
      throw createHttpError(400, "Course not found");
    }
    if (!examination) {
      throw createHttpError(400, "Examination not found");
    }

    res.status(200).json({
      status: 200,
      msg: "Get examination successfully!",
      examination: { ...examination._doc, courseName: course._doc.courseName },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const examinationController = {
  getExaminationByCourseId,
};
