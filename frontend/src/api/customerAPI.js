const { getAccessToken } = require("utils/authUtils");
const url = process.env.REACT_APP_API_URL;

const getListCustomers = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  const { page, searchText, orderBy, orderType, numOfPerPage } = data;

  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(
    `${url}customer?page=${page}&searchText=${searchText}&orderBy=${orderBy}&orderType=${orderType}&numOfPerPage=${numOfPerPage}`,
    requestOptions
  );
};

const getCustomerById = (customerId) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(`${url}customer/${customerId}`, requestOptions);
};

const banOrUnBanCustomer = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);

  let requestOptions = {
    headers: myHeaders,
    method: "PUT",
    body: JSON.stringify(data), // data: {courseIds, isBanned}
  };
  return fetch(`${url}customer`, requestOptions);
};

const customerAPI = {
  getListCustomers,
  getCustomerById,
  banOrUnBanCustomer,
};
export default customerAPI;
