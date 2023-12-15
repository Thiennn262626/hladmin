import apiAuth from "../utils/apiAuth";
import {handelException} from "./handelException";
async function getListOrderByStatus(orderStatus) {
  try {
    const response = await apiAuth.get(
      `/api/hlshop/admin/order/get-list?orderStatus=${orderStatus}`
    );
    if (response) {
      return response;
    }
    return response;
  } catch (error) {
    console.error("Error fetching location data:", error);
  }
}
async function detailOrder(id) {
  try {
    const response = await apiAuth.get(
      `/api/hlshop/admin/order/get-detail?orderID=${id}`
    );
    if (response) {
      console.log("detailOrder", response);
      return response;
    }
    return response;
  } catch (error) {
    console.error("Error fetching location data:", error);
  }
}
async function setStateOrder(id, orderStatus) {
  try {
    const response = await apiAuth.post(
      `/api/hlshop/admin/order/admin-update-order-status?orderID=${id}&orderStatus=${orderStatus}`
    );
    if (response) {
      handelException.handelNotificationSwal("Success", "success")
      return true;
    }
  } catch (error) {
    handelException.handelNotificationSwal("Error", "error")
    console.error("Error fetching location data:", error);
  }
}
export const orderServices = {
  getListOrderByStatus, detailOrder, setStateOrder
};
