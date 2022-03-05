import {
  Certification,
  Course,
  Examination,
  Test,
  UserDetail,
} from "../models";
import createHttpError from "http-errors";

const createNewCertification = async (req, res, next) => {
  try {
    const { courseId, studentId, positionCreate, graded } = req.body;

    const existedCourse = await Course.findOne({
      _id: courseId,
      isRemoved: false,
    });
    if (!existedCourse) {
      throw createHttpError(404, "Course is not exist!");
    }
    const examination = await Examination.findOne({
      courseId: courseId,
      isRemoved: false,
    });
    if (!examination) {
      throw createHttpError(404, "Examination is not exist!");
    }
    const test = await Test.findOne({
      studentId,
      examinationId: examination._id,
    });
    if (!test) {
      throw createHttpError(404, "Test is not exist!");
    }
    const existedCertification = await Certification.findOne({
      courseId,
      studentId,
    });
    if (existedCertification) {
      throw createHttpError(404, "Bạn đã tạo chứng nhận cho người này!!");
    }
    const student = await UserDetail.findOne({ userId: studentId });

    // const startDate = courseOfStudent.studentBuyAt; //

    const newCertification = await Certification.create({
      courseId,
      studentId,
      // startDate,
      // endDate,
      positionCreate,
      graded,
    });

    res.status(200).json({
      status: 200,
      msg: "Create new certification successfully!",
      certification: { ...newCertification, course: existedCourse, student },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateCertification = async (req, res, next) => {
  try {
    const { certificationId, startDate, endDate, positionCreate, graded } =
      req.body;
    const existedCertification = await Certification.findOne({
      _id: certificationId,
      isRemoved: false,
    });
    const existedCourse = await Course.findOne({
      _id: certificationId,
    });
    if (!existedCourse) {
      throw createHttpError(404, "Course is not exist!");
    }
    if (!existedCertification) {
      throw createHttpError(404, "Certification is not exist!");
    }

    const student = await UserDetail.findOne({
      userId: existedCertification.studentId,
    });
    const course = await Course.findById(existedCertification.courseId);

    await Certification.findByIdAndUpdate(certificationId, {
      startDate,
      endDate,
      positionCreate,
      graded,
    });
    const newCertification = Certification.findById(certificationId);

    res.status(200).json({
      status: 200,
      msg: "Update certification successfully!",
      certification: { ...newCertification._doc, course, student },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteCertificationById = async (req, res, next) => {
  try {
    const { certificationIds } = req.body;
    for (let i = 0; i < certificationIds.length; i++) {
      const certificationId = certificationIds[i];
      const certification = await Certification.findById(certificationId);
      if (!certification) {
        throw createHttpError(400, "Certification is not exist!");
      }
      await Promise.all([
        Certification.findByIdAndUpdate(certificationId, {
          isRemoved: true,
        }),
      ]);
    }

    res.status(200).json({
      status: 200,
      msg: "Delete certification(s) successfully!",
      certificationIds,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getListCertificationPerPage = async (req, res, next) => {
  try {
    let { page, orderBy, orderType, numOfPerPage } = req.query;
    numOfPerPage = Number(numOfPerPage);
    page = page ? page : 1;
    orderBy = orderBy ? orderBy : "createAt";
    orderType = orderType === "asc" ? 1 : -1;
    const orderQuery = { [orderBy]: orderType };

    const start = (page - 1) * numOfPerPage;
    let totalNumOfCertifications;
    let certifications;
    certifications = await Certification.find({ isRemoved: false })
      .skip(start)
      .limit(numOfPerPage)
      .sort(orderQuery);
    totalNumOfCertifications = await Certification.find({
      isRemoved: false,
    }).count();
    const totalPage = parseInt(totalNumOfCertifications / numOfPerPage) + 1;

    let studentsData = certifications.map((item) =>
      UserDetail.findOne({ userId: item.studentId })
    );
    studentsData = await Promise.all(studentsData);

    let coursesData = certifications.map((item) =>
      Course.findById(item.courseId)
    );
    coursesData = await Promise.all(coursesData);

    certifications = certifications.map((item, index) => ({
      ...item._doc,
      student: studentsData[index],
      course: coursesData[index],
    }));
    res.status(200).json({
      status: 200,
      msg: "Get certifications successfully!",
      certifications,
      totalPage,
      totalRows: totalNumOfCertifications,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getCertificationById = async (req, res, next) => {
  try {
    const certificationId = req.params.certificationId;
    let certification = await Certification.findById(certificationId);
    const student = await UserDetail.findOne({
      userId: certification.studentId,
    });
    if (!certification) {
      throw createHttpError(400, "Certification is not exist!");
    }
    const course = await Course.findById(certification.courseId);

    res.status(200).json({
      status: 200,
      msg: "Get course successfully!",
      certification: { ...certification._doc, student, course },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getCertificationByClientIdAndCourseId = async (req, res, next) => {
  try {
    const { courseId } = req.query;
    console.log("xx: ", req.query);
    const customerId = req.user._id;
    let certification = await Certification.findOne({
      studentId: customerId,
      courseId,
    });
    const student = await UserDetail.findOne({
      userId: customerId,
    });
    if (!certification) {
      throw createHttpError(400, "Bạn chưa được cấp chứng nhận!");
    }
    const course = await Course.findById(courseId);
    res.status(200).json({
      status: 200,
      msg: "Get course successfully!",
      certification: { ...certification._doc, student, course },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const certificateController = {
  createNewCertification,
  updateCertification,
  getCertificationById,
  getListCertificationPerPage,
  deleteCertificationById,
  getCertificationByClientIdAndCourseId,
};
