const { getAccessToken } = require("utils/authUtils");
const url = process.env.REACT_APP_API_URL;

const getWishlist = (itemType) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);

  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(`${url}wishlist/${itemType}`, requestOptions);
};

const updateWishlist = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);

  let requestOptions = {
    headers: myHeaders,
    method: "PUT",
    body: JSON.stringify(data), // {itemId, itemType}
  };
  return fetch(`${url}wishlist`, requestOptions);
};

const wishlistAPI = {
  getWishlist,
  updateWishlist,
};
export default wishlistAPI;
