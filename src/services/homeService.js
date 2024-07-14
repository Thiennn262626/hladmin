import index from "../Component/Product/common";
import apiAuth from "../utils/apiAuth";
import { handelException } from "./handelException";

async function getNetWork() {
  try {
    const response = await apiAuth.get(
      `/api/hlshop/admin/order/get-count-list`
    );
    if (response) {
      return {
        data: [
          { index: 1, count: response.countNew, desc: "Chờ Xác Nhận" },
          { index: 2, count: response.countApproved, desc: "Chờ Lấy Hàng" },
          { index: 3, count: response.countOnDelivering, desc: "Đã Xử Lý" },
          { index: 4, count: response.countCustomerCancelled, desc: "Đơn Hủy" },
        ],
      };
    }
  } catch (error) {
    handelException.handelNotificationSwal(
      "Lỗi lấy danh sách cần làm",
      "error"
    );
  }
}
async function getChartAnalySale(month, year) {
  try {
    const response = await apiAuth.get(
      `/api/hlshop/admin/home/get-data-chart-analy-sale?month=${month}&year=${year}`
    );
    console.log(response);
    if (response) {
      return {
        data: response,
      };
    }
  } catch (error) {
    handelException.handelNotificationSwal(
      "Lỗi lấy dữ liệu biểu đồ phân tích bán hàng",
      "error"
    );
  }
}

async function getTotalAnalySale(month, year) {
  try {
    const response = await apiAuth.get(
      `/api/hlshop/admin/home/get-total-analy-sale?month=${month}&year=${year}`
    );
    if (response) {
      return response;
    }
  } catch (error) {
    handelException.handelNotificationSwal(
      "Lỗi lấy dữ liệu phân tích bán hàng",
      "error"
    );
  }
}

async function getProductListSale() {
  try {
    const response = await apiAuth.get(
      `/api/hlshop/product/get-list-best-seller?offset=0&limit=24`
    );
    if (response) {
      return response;
    }
  } catch (error) {
    handelException.handelNotificationSwal(
      "Lỗi lấy danh sách sản phẩm bán chạy",
      "error"
    );
  }
}

async function getProductListBestSale() {
  try {
    const response = await apiAuth.get(
      `/api/hlshop/admin/product/get_predict_best_sale`
    );
    if (response) {
      return response;
    }
  } catch (error) {
    handelException.handelNotificationSwal(
      "Lỗi lấy danh sách sản phẩm bán chạy",
      "error"
    );
  }
}

export const homeServices = {
  getNetWork,
  getChartAnalySale,
  getTotalAnalySale,
  getProductListSale,
  getProductListBestSale,
};
