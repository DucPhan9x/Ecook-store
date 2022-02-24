const { getAccessToken } = require("utils/authUtils");
const url = process.env.REACT_APP_API_URL;

const createNewCartItem = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);

  let requestOptions = {
    headers: myHeaders,
    method: "POST",
    body: JSON.stringify(data),
  };
  return fetch(`${url}cart-item`, requestOptions);
};

const getListCartItem = (itemType) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(`${url}cart-item/${itemType}`, requestOptions);
};

const updateCartItem = (cartItems) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);

  let requestOptions = {
    headers: myHeaders,
    method: "PUT",
    body: JSON.stringify({ cartItems }),
  };

  return fetch(`${url}cart-item`, requestOptions);
};

const deleteAllCartItem = (itemType) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);

  let requestOptions = {
    headers: myHeaders,
    method: "DELETE",
  };
  return fetch(`${url}cart-item/delete-all/${itemType}`, requestOptions);
};

const deleteCartItem = (cartItems) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);

  let requestOptions = {
    headers: myHeaders,
    method: "DELETE",
    body: JSON.stringify({ cartItems }),
  };
  return fetch(`${url}cart-item`, requestOptions);
};

const cartAPI = {
  createNewCartItem,
  updateCartItem,
  getListCartItem,
  deleteCartItem,
  deleteAllCartItem,
};
export default cartAPI;
