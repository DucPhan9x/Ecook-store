const { getAccessToken } = require("utils/authUtils");
const url = process.env.REACT_APP_API_URL;

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

const paypalPaymentCourse = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);
  let requestOptions = {
    headers: myHeaders,
    method: "POST",
    body: JSON.stringify(data),
  };
  return fetch(`${url}order/paypal-execute/course`, requestOptions);
};

const paymentRedirectMoney = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);
  let requestOptions = {
    headers: myHeaders,
    method: "POST",
    body: JSON.stringify(data),
  };
  return fetch(`${url}order/payment-direct-money`, requestOptions);
};

const getAllOrders = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);
  const { page, searchText, orderBy, orderType, numOfPerPage, statusId } = data;

  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(
    `${url}order?statusId=${statusId}&page=${page}&searchText=${searchText}&orderBy=${orderBy}&orderType=${orderType}&numOfPerPage=${numOfPerPage}`,
    requestOptions
  );
};

const getOrdersByClientId = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);
  const { page, searchText, orderBy, orderType, numOfPerPage, statusId } = data;

  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(
    `${url}order/get-all-by-clientID?statusId=${statusId}&page=${page}&searchText=${searchText}&orderBy=${orderBy}&orderType=${orderType}&numOfPerPage=${numOfPerPage}`,
    requestOptions
  );
};

const updateStatusOrder = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);

  let requestOptions = {
    headers: myHeaders,
    method: "PUT",
    body: JSON.stringify(data),
  };
  return fetch(`${url}order`, requestOptions);
};

const orderAPI = {
  paypalPayment,
  paymentRedirectMoney,
  paypalPaymentCourse,
  getAllOrders,
  getOrdersByClientId,
  updateStatusOrder,
};
export default orderAPI;
