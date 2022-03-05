const { getAccessToken } = require("utils/authUtils");
const url = process.env.REACT_APP_API_URL;

const createTest = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);

  let requestOptions = {
    headers: myHeaders,
    method: "POST",
    body: JSON.stringify(data),
  };
  return fetch(`${url}test`, requestOptions);
};

const updateTestById = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);
  console.log(data);
  let requestOptions = {
    headers: myHeaders,
    method: "PUT",
    body: JSON.stringify(data),
  };
  return fetch(`${url}test`, requestOptions);
};

const getTestById = (courseId) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(`${url}test/${courseId}`, requestOptions);
};

const getListTestPerPage = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  const { page, orderBy, orderType, isPass, numOfPerPage, courseId } = data;
  console.log(courseId);

  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(
    `${url}test?courseId=${courseId}&page=${page}&isPass=${isPass}&orderBy=${orderBy}&orderType=${orderType}&numOfPerPage=${numOfPerPage}`,
    requestOptions
  );
};

const testAPI = {
  createTest,
  getListTestPerPage,
  updateTestById,
  getTestById,
};
export default testAPI;
