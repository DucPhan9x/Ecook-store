const { getAccessTokenSystem, getAccessToken } = require("utils/authUtils");
const url = process.env.REACT_APP_API_URL;

const getProfileAdmin = () => {
  const tokenAdmin = getAccessTokenSystem();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${tokenAdmin}`);
  myHeaders.append("Content-Type", `application/json`);
  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(`${url}profile`, requestOptions);
};

const getProfile = () => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);
  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(`${url}profile`, requestOptions);
};

const profileAPI = {
  getProfileAdmin,
  getProfile,
};
export default profileAPI;
