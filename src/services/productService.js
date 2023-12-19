import apiAuth from "../utils/apiAuth";
import api from "../utils/api";
import { handelException } from "./handelException";

async function addImg(file) {
    try {
        const response = await apiAuth.post(
            `api/hlshop/admin/product/upload-image`, file
        );
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("Error fetching location data:", error);
    }
}
//lấy ngành hàng
async function getCategory() {
    try {
        const response = await api.get(
            `api/hlshop/admin/product-category/get-list?offset=0&limit=100`
        );
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("Error fetching location data:", error);
    }
}
 
export const productServices = {
    addImg, getCategory
}