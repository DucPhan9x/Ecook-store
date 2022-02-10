const { getAccessToken } = require("utils/authUtils");
const url = process.env.REACT_APP_API_URL;

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

const updateProfile = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);
  let requestOptions = {
    headers: myHeaders,
    method: "PUT",
    body: JSON.stringify(data),
  };
  return fetch(`${url}profile`, requestOptions);
};

const uploadAvatar = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  let formData = new FormData();
  formData.append("files", data);

  let requestOptions = {
    headers: myHeaders,
    method: "PUT",
    body: formData,
  };
  return fetch(`${url}avatar`, requestOptions);
};

const changePassword = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);
  let requestOptions = {
    headers: myHeaders,
    method: "POST",
    body: JSON.stringify(data),
  };
  return fetch(`${url}auth/change-password`, requestOptions);
};

const profileAPI = {
  getProfile,
  updateProfile,
  changePassword,
  uploadAvatar,
};
export default profileAPI;
