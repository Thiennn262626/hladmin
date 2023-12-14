import api from "../utils/api";
async function login(data) {
  try {
    const response = await api.post(
      `/api/hlshop/admin/auth/signin-phone`,
      data
    );
    if (response) {
      localStorage.setItem("token", response.token);
      return true;
    }
  } catch (error) {
    //neu loi thi tra loi tu response
    console.log(error.response);
    return error.response;
  }
}
export const loginService = {
  login,
};
