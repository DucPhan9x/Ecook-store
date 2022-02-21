const { getAccessToken } = require("utils/authUtils");
const url = process.env.REACT_APP_API_URL;

const getExaminationByCourseId = (courseId) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(`${url}examination/${courseId}`, requestOptions);
};

const examinationAPI = {
  getExaminationByCourseId,
};
export default examinationAPI;
