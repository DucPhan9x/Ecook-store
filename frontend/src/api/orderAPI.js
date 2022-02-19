const { getAccessToken } = require("utils/authUtils");
const url = process.env.REACT_APP_API_URL;

const paypalRequest = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);
  let requestOptions = {
    headers: myHeaders,
    method: "POST",
    body: JSON.stringify(data),
  };
  return fetch(`${url}order/paypal-create`, requestOptions);
};

const paypalPayment = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);
  let requestOptions = {
    headers: myHeaders,
    method: "POST",
    body: JSON.stringify(data),
  };
  return fetch(`${url}order/paypal-execute`, requestOptions);
};

const orderAPI = {
  paypalPayment,
  paypalRequest,
};
export default orderAPI;
