const { getAccessToken } = require("utils/authUtils");
const url = process.env.REACT_APP_API_URL;

const addFeedback = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);

  let requestOptions = {
    headers: myHeaders,
    method: "POST",
    body: JSON.stringify(data),
  };
  return fetch(`${url}feedback`, requestOptions);
};

const reply = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);

  let requestOptions = {
    headers: myHeaders,
    method: "POST",
    body: JSON.stringify(data),
  };
  return fetch(`${url}feedback/reply`, requestOptions);
};

const getAllFeedbacksByItemId = (itemId) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(`${url}feedback/${itemId}`, requestOptions);
};

const feedbackReplyAPI = {
  getAllFeedbacksByItemId,
  addFeedback, // client
  reply, //admin , employee
};
export default feedbackReplyAPI;
