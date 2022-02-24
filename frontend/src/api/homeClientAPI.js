const { getAccessToken } = require("utils/authUtils");
const url = process.env.REACT_APP_API_URL;

const getListFoodAndRecipe = () => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);
  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(`${url}homeClient/foods-recipes`, requestOptions);
};

const getListCourseAndInstructor = () => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);
  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(`${url}homeClient/courses-instructors`, requestOptions);
};

const homeClientAPI = {
  getListFoodAndRecipe,
  getListCourseAndInstructor,
};
export default homeClientAPI;
