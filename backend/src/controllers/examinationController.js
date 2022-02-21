import { Course, Examination } from "../models";

const getExaminationByCourseId = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    let examination = await Examination.findOne({ courseId });
    let course = await Course.findById(courseId);

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
