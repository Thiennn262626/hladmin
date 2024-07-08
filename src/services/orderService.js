import apiAuth from "../utils/apiAuth";
import { handelException } from "./handelException";
async function getListOrderByStatus(orderStatus, offset, limit) {
  try {
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
    handelException.handelNotificationSwal(
      "Lỗi lấy danh sách đơn hàng",
      "error"
    );
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
    handelException.handelNotificationSwal(
      "Lỗi lấy chi tiết đơn hàng",
      "error"
    );
  }
}
async function setStateOrder(id, orderStatus) {
  try {
    const response = await apiAuth.post(
      `/api/hlshop/admin/order/admin-update-order-status?orderID=${id}&orderStatus=${orderStatus}`
    );
    if (response) {
      handelException.handelNotificationSwal(
        "Cập nhật trạng thái đơn hàng thành công",
        "success"
      );
      return true;
    }
  } catch (error) {
    handelException.handelNotificationSwal(
      "Lỗi cập nhật trạng thái đơn hàng",
      "error"
    );
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
    return;
  } catch (error) {
    console.error("Error fetching location data:", error);
    handelException.handelNotificationSwal(
      "Lỗi lấy danh sách đơn hàng count list",
      "error"
    );
  }
}
export const orderServices = {
  getListOrderByStatus,
  detailOrder,
  setStateOrder,
  getOrderCountList,
};
