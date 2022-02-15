import { Certification, Course } from "../models";
import createHttpError from "http-errors";

const createNewCertification = async (req, res, next) => {
  try {
    const {
      courseId,
      studentId,
      startDate, // get by order course
      endDate, // get last updated at test modal
      positionCreate,
      graded,
    } = req.body;

    const existedCourse = await Course.findById(courseId);
    if (!existedCourse) {
      throw createHttpError(404, "Course is not exist!");
    }

    const newCertification = await Certification.create({
      courseId,
      studentId,
      startDate,
      endDate,
      positionCreate,
      graded,
    });

    res.status(200).json({
      status: 200,
      msg: "Create new certification successfully!",
      data: { certification: newCertification, course: existedCourse },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateCertification = async (req, res, next) => {
  try {
    const certificationId = req.params.certificationId;
    const { courseId, startDate, endDate, positionCreate, graded } = req.body;
    const existedCourse = await Course.findById(courseId);
    const existedCertification = await Certification.findById({
      certificationId,
    });
    if (!existedCourse) {
      throw createHttpError(404, "Course is not exist!");
    }
    if (!existedCertification) {
      throw createHttpError(404, "Certification is not exist!");
    }

    const newCertification = await Certification.findByIdAndUpdate(
      certificationId,
      {
        startDate,
        endDate,
        positionCreate,
        graded,
      }
    );

    res.status(200).json({
      status: 200,
      msg: "Update certification successfully!",
      certification: newCertification,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteCertificationById = async (req, res, next) => {
  try {
    const certificationId = req.params.certificationId;
    const existedCertification = await Certification.findById(certificationId);

    if (!existedCertification) {
      throw createHttpError(404, "Certification is not exist!");
    }
    await Certification.findByIdAndUpdate(certificationId, {
      isRemoved: true,
    });
    res.status(200).json({
      status: 200,
      msg: "Delete certification successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getListCertificationPerPage = async (req, res, next) => {
  try {
    let { page, searchText, orderBy, orderType, numOfPerPage } = req.query;
    page = page ? page : 1;
    searchText = searchText ? searchText : "";
    orderBy = orderBy ? orderBy : "";
    orderType = orderType ? orderType : 1;
    const orderQuery = orderBy ? { [orderBy]: orderType } : {};

    const start = (page - 1) * numOfPerPage;
    let totalNumOfCertifications;
    let certifications;
    if (searchText) {
      certifications = await Certification.find({
        $text: { $search: searchText },
        isRemoved: true,
      })
        .skip(start)
        .limit(numOfPerPage)
        .sort(orderQuery);
      totalNumOfCertifications = await Certification.find({
        $text: { $search: searchText },
        isRemoved: true,
      }).count();
    } else {
      certifications = await Certification.find({ isRemoved: true })
        .skip(start)
        .limit(numOfPerPage)
        .sort(orderQuery);
      totalNumOfCertifications = await Certification.find({
        isRemoved: true,
      }).count();
    }
    const totalPage = parseInt(totalNumOfCertifications / numOfPerPage) + 1;

    certifications = Promise.all(
      certifications.map((item) => ({
        ...item,
        student: UserDetail.findOne({ userId: item.studentId }),
      }))
    );
    res.status(200).json({
      status: 200,
      msg: "Get certifications successfully!",
      certifications,
      totalPage,
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

    res.status(200).json({
      status: 200,
      msg: "Get certification successfully!",
      certification: { ...certification, student },
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
};
