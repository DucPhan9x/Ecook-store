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
    body: JSON.stringify(courseIds),
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

const courseAPI = {
  createCourse,
  updateCourseById,
  deleteCourseById,
  getCourseById,
  getListCoursePerPage,
};
export default courseAPI;
