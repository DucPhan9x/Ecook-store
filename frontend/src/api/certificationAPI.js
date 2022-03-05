const { getAccessToken } = require("utils/authUtils");
const url = process.env.REACT_APP_API_URL;

const createCertification = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);

  let requestOptions = {
    headers: myHeaders,
    method: "POST",
    body: JSON.stringify(data),
  };
  return fetch(`${url}certification`, requestOptions);
};

const updateCertificationById = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);

  let requestOptions = {
    headers: myHeaders,
    method: "PUT",
    body: JSON.stringify(data),
  };
  return fetch(`${url}certification`, requestOptions);
};

const deleteCertificationById = (certificationIds) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);

  let requestOptions = {
    headers: myHeaders,
    method: "DELETE",
    body: JSON.stringify({ certificationIds }),
  };

  return fetch(`${url}certification`, requestOptions);
};

const getCertificationById = (certificationId) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(`${url}certification/${certificationId}`, requestOptions);
};

const getListCertificationPerPage = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  const { page, orderBy, orderType, numOfPerPage } = data;

  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(
    `${url}certification?page=${page}&orderBy=${orderBy}&orderType=${orderType}&numOfPerPage=${numOfPerPage}`,
    requestOptions
  );
};

const getCertificationByClientIdAndCourseId = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(
    `${url}certification/by/client?courseId=${data}`,
    requestOptions
  );
};

const certificationAPI = {
  createCertification,
  updateCertificationById,
  getCertificationById,
  getListCertificationPerPage,
  deleteCertificationById,
  getCertificationByClientIdAndCourseId,
};
export default certificationAPI;
