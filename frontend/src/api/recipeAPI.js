const { getAccessToken } = require("utils/authUtils");
const url = process.env.REACT_APP_API_URL;

const createRecipe = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  let formData = new FormData();
  formData.append("files", data?.imageFile);
  formData.append("name", data?.name);
  formData.append("materials", JSON.stringify(data?.materials));
  formData.append("slotQuantity", Number(data?.slotQuantity));
  formData.append("description", data?.description);
  formData.append("contents", JSON.stringify(data?.contents));

  let requestOptions = {
    headers: myHeaders,
    method: "POST",
    body: formData,
  };
  return fetch(`${url}recipe`, requestOptions);
};

const updateRecipeById = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  let formData = new FormData();
  formData.append("files", data?.imageFile);
  formData.append("recipeUpdated", JSON.stringify(data?.recipeUpdated));

  let requestOptions = {
    headers: myHeaders,
    method: "PUT",
    body: formData,
  };
  return fetch(`${url}recipe`, requestOptions);
};

const deleteRecipeById = (recipeIds) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);

  let requestOptions = {
    headers: myHeaders,
    method: "DELETE",
    body: JSON.stringify({ recipeIds }),
  };

  return fetch(`${url}recipe`, requestOptions);
};

const getRecipeById = (recipeId) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(`${url}recipe/${recipeId}`, requestOptions);
};

const getListRecipePerPage = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  const { page, searchText, orderBy, orderType, numOfPerPage } = data;

  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(
    `${url}recipe?page=${page}&searchText=${searchText}&orderBy=${orderBy}&orderType=${orderType}&numOfPerPage=${numOfPerPage}`,
    requestOptions
  );
};

// client
const getListRecipeRelated = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(
    `${url}recipe/by/related-foodName?searchText=${data}`,
    requestOptions
  );
};

// instructor
const getListRecipeByInstructor = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  const { page, searchText, orderBy, orderType, numOfPerPage } = data;

  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(
    `${url}recipe/by/instructor?page=${page}&searchText=${searchText}&orderBy=${orderBy}&orderType=${orderType}&numOfPerPage=${numOfPerPage}`,
    requestOptions
  );
};

const recipeAPI = {
  createRecipe,
  updateRecipeById,
  deleteRecipeById,
  getRecipeById,
  getListRecipePerPage,
  getListRecipeRelated,
  getListRecipeByInstructor,
};
export default recipeAPI;
