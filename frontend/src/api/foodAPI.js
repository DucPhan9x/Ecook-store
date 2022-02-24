const { getAccessToken } = require("utils/authUtils");
const url = process.env.REACT_APP_API_URL;

const createFood = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  let formData = new FormData();
  formData.append("files", data?.imageFile);
  formData.append("foodLists", JSON.stringify(data?.foodLists));

  let requestOptions = {
    headers: myHeaders,
    method: "POST",
    body: formData,
  };
  return fetch(`${url}food`, requestOptions);
};

const updateFoodById = (input) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  let formData = new FormData();
  formData.append("files", input?.imageFile);
  formData.append("foodUpdated", JSON.stringify(input?.foodUpdated));
  let requestOptions = {
    headers: myHeaders,
    method: "PUT",
    body: formData,
  };
  return fetch(`${url}food/update`, requestOptions);
};

const updateStatusRemoveTempFood = (foodId, isRemoveTemp) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);
  let requestOptions = {
    headers: myHeaders,
    method: "PUT",
  };
  return fetch(
    `${url}food/statusRemoveTemp/${foodId}/${isRemoveTemp}`,
    requestOptions
  );
};

const getListFoodPerPage = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  const { page, searchText, typeId, orderBy, orderType, numOfPerPage } = data;
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);
  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(
    `${url}food?page=${page}&searchText=${searchText}&typeId=${typeId}&orderBy=${orderBy}&orderType=${orderType}&numOfPerPage=${numOfPerPage}`,
    requestOptions
  );
};

// client
const getListFoodRelated = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(`${url}food/related?searchText=${data}`, requestOptions);
};

const getFoodById = (foodId) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);
  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(`${url}food/${foodId}`, requestOptions);
};

const foodAPI = {
  createFood,
  updateFoodById,
  updateStatusRemoveTempFood,
  getListFoodPerPage,
  getFoodById,
  getListFoodRelated,
};
export default foodAPI;
