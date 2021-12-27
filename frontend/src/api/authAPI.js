const url = process.env.REACT_APP_API_URL;

const login = ({ email, password }) => {
  let formdata = new FormData();
  formdata.append("email", email);
  formdata.append("password", password);

  let requestOptions = {
    method: "POST",
    body: formdata,
  };

  return fetch(`${url}auth/login/`, requestOptions);
};
const authAPI = { login };
export default authAPI;
