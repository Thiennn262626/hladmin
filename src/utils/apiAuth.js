import axios from "axios";
//NProgress: Thư viện cho việc hiển thị thanh tiến trình (progress bar).
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { handelException } from "../services/handelException";
const URL = "https://hlshop.azurewebsites.net";
// const URL = "http://localhost:3001";
//Tạo một khách hàng Axios:
const apiClient = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//Khi một yêu cầu được thực hiện
apiClient.interceptors.request.use(
  async (config) => {
    NProgress.start();
    const accessToken = await checkTokens();
    if (accessToken) config.headers.Authorization = "Bearer " + accessToken;
    else {
      config.cancelToken = new axios.CancelToken((cancel) => cancel());
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
apiClient.interceptors.response.use(
  async (response) => {
    NProgress.done();
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    handelException.handelExceptions(error);
    NProgress.done();
    return Promise.reject(error);
  }
);

const checkTokens = async () => {
  const accessToken = localStorage.getItem("token");

  if (!accessToken) {
    console.log("Không có token");
    return;
  }

  const payload = decodeToken(accessToken);
  if (isTokenExpired(payload)) {
    clearLocalStorage();
    return;
  }
  return accessToken;
};

const clearLocalStorage = () => {
  localStorage.clear();
};

const decodeToken = (token) => {
  const [, payloadBase64] = token?.split(".");
  return JSON.parse(atob(payloadBase64));
};

const isTokenExpired = (payload) => {
  const expirationTime = payload.exp;
  const currentTime = Math.floor(Date.now() / 1000);
  return expirationTime < currentTime;
};

export default apiClient;
