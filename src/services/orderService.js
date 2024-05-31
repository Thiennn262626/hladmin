import apiAuth from "../utils/apiAuth";
import { handelException } from "./handelException";
async function getListOrderByStatus(orderStatus, offset, limit) {
  try {
    if (orderStatus < 0 || orderStatus > 7) {
      throw "Invalid order status";
    }
    if (offset < 0 || limit < 0) {
      throw "Invalid offset";
    }
    if (limit - offset > 100 || limit - offset < 0) {
      throw "Invalid limit";
    }
    console.log("getListOrderByStatus", orderStatus, offset, limit);
    const response = await apiAuth.get(
      `/api/hlshop/admin/order/get-list?orderStatus=${orderStatus}&offset=${offset}&limit=${limit}`
    );
    if (response) {
      return response;
    }
    return response;
  } catch (error) {
    console.error("Error fetching location data:", error);
    handelException.handelNotificationSwal("Error", "error get list order");
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
    handelException.handelNotificationSwal("Error", "error detail order");
  }
}
async function setStateOrder(id, orderStatus) {
  try {
    const response = await apiAuth.post(
      `/api/hlshop/admin/order/admin-update-order-status?orderID=${id}&orderStatus=${orderStatus}`
    );
    if (response) {
      handelException.handelNotificationSwal("Success", "success");
      return true;
    }
  } catch (error) {
    handelException.handelNotificationSwal("Error", "error set state order");
    console.error("Error fetching location data:", error);
  }
}

async function getOrderCountList() {
  try {
    const response = await apiAuth.get(
      `/api/hlshop/admin/order/get-count-list`
    );
    if (response) {
      return response;
    }
    return response;
  } catch (error) {
    console.error("Error fetching location data:", error);
    handelException.handelNotificationSwal("Error", "error get count list");
  }
}
export const orderServices = {
  getListOrderByStatus,
  detailOrder,
  setStateOrder,
  getOrderCountList,
};
