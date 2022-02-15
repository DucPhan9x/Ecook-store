import { Examination } from "../models";

const getExaminationByCourseId = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    let examination = await Examination.findOne({ courseId });

    res.status(200).json({
      status: 200,
      msg: "Get examination successfully!",
      examination,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const examinationController = {
  getExaminationByCourseId,
};
