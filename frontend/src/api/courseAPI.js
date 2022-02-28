const { getAccessToken } = require("utils/authUtils");
const url = process.env.REACT_APP_API_URL;

const createCourse = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);

  let requestOptions = {
    headers: myHeaders,
    method: "POST",
    body: JSON.stringify(data),
  };
  return fetch(`${url}course`, requestOptions);
};

const updateCourseById = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);

  let requestOptions = {
    headers: myHeaders,
    method: "PUT",
    body: JSON.stringify(data),
  };
  return fetch(`${url}course`, requestOptions);
};

const deleteCourseById = (courseIds) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);

  let requestOptions = {
    headers: myHeaders,
    method: "PUT",
    body: JSON.stringify({ courseIds }),
  };

  return fetch(`${url}course/delete`, requestOptions);
};

const getCourseById = (courseId) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(`${url}course/${courseId}`, requestOptions);
};

const getListCoursePerPage = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  const { page, searchText, orderBy, orderType, numOfPerPage } = data;

  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(
    `${url}course?page=${page}&searchText=${searchText}&orderBy=${orderBy}&orderType=${orderType}&numOfPerPage=${numOfPerPage}`,
    requestOptions
  );
};

// instructor
const getListCourseByInstructor = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  const {
    page,
    searchText,
    orderBy,
    orderType,
    numOfPerPage,
    instructorIdReq,
  } = data;

  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(
    `${url}course/by/instructor?instructorIdReq=${instructorIdReq}&page=${page}&searchText=${searchText}&orderBy=${orderBy}&orderType=${orderType}&numOfPerPage=${numOfPerPage}`,
    requestOptions
  );
};

// client
const getListCourseRelated = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(`${url}course/by/related?searchText=${data}`, requestOptions);
};

const getListCourseByClient = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(
    `${url}course/by/client?searchText=${data.searchText}&isFinish=${data.isFinish}`,
    requestOptions
  );
};

const checkExistMyCourse = (courseId) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);

  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(`${url}order/check-exist-courses/${courseId}`, requestOptions);
};

const courseAPI = {
  createCourse,
  updateCourseById,
  deleteCourseById,
  getCourseById,
  getListCoursePerPage,
  getListCourseRelated,
  getListCourseByInstructor,
  getListCourseByClient,
  checkExistMyCourse,
};
export default courseAPI;
