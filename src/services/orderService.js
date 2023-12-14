import apiAuth from "../utils/apiAuth";
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
export const orderServices = {
  getListOrderByStatus,
};
