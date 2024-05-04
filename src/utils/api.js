import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { handelException } from "../services/handelException.js";
// const URL = "https://hl-shop.azurewebsites.net";
const URL = "http://localhost:3000";

const api = axios.create({
  baseURL: URL,
});
//Khi một yêu cầu được thực hiện
api.interceptors.request.use(
  (config) => {
    NProgress.start();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  async (response) => {
    NProgress.done();

    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    NProgress.done();
    handelException.handelExceptions(error);
    return Promise.reject(error);
  }
);
export default api;
