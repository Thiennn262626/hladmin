import api from "../utils/api";
import apiAuth from "../utils/apiAuth";
import {handelException} from "./handelException";
async function login(data) {
  try {
    const response = await api.post(
      `/api/hlshop/admin/auth/signin-phone`,
      data
    );
    if (response) {
      localStorage.setItem("token", response.token);
      handelException.handelNotificationSwal("Đăng nhập thành công", "success")
      return true;
    }
  } catch (error) {
    handelException.handelExceptions(error);
    console.log(error.response);
  }
}
async function getProfile() {
  try {
    const response = await apiAuth.get(
      `/api/hlshop/admin/users/get-profile`, 
    );
    if (response) {
     
      return response;
    }
  } catch (error) {
    console.log(error.response);
  }
}
export const loginService = {
  login, getProfile
};
