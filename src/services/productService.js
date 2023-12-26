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
async function addProduct(data) {
    try {
        const response = await apiAuth.post(
            `api/hlshop/admin/product/create-product`, data
        );
        if (response) {
            handelException.handelNotificationSwal("Success", "success")
            console.log("response", response);
            return response;
        }
    } catch (error) {
        handelException.handelNotificationSwal("Error", "error")
        console.error("Error fetching location data:", error);
    }
}
async function listProduct(filter) {
    console.log("filter", filter);
    try {
        const apiUrl = "api/hlshop/admin/product/get-all-product"
        const queryParams = [];
        if (filter) {
            if (filter?.limit) {
                queryParams.push(`limit=${filter.limit}`)
            }
            if (filter?.offset) {
                queryParams.push(`offset=${filter.offset}`)
            }
            if (filter?.search) {
                queryParams.push(`search=${filter.search}`)
            }
            if (filter?.sortBy || filter?.sortBy === 0) {
                queryParams.push(`sortBy=${filter.sortBy}`)
            }
            if (filter?.minAmount) {
                queryParams.push(`minAmount=${filter.minAmount}`)
            }
            if (filter?.maxAmount) {
                queryParams.push(`maxAmount=${filter.maxAmount}`)
            }
        }
        const url = `${apiUrl}?${queryParams.join('&')}`
        console.log("url", url);
        const response = await apiAuth.get(
            url
        );
        if (response) {
            console.log("response", response);
            return response;
        }
    } catch (error) {
        console.error("Error fetching location data:", error);
    }
}
async function getProductSku(id) {
    try {
        const response = await apiAuth.get(
            `api/hlshop/admin/product/get-product-sku-by-product-id?productID=${id}`
        );
        if (response) {
            console.log("response", response);
            return response;
        }
    } catch (error) {
        console.error("Error fetching location data:", error);
    }
}

async function enableProduct(productID, enable) {
    let data = {
        productID: productID,
        enable: enable
    }
    try {
        const response = await apiAuth.post(
            `api/hlshop/admin/product/enable-product`, data
        );
        if (response) {
            handelException.handelNotificationSwal(`${response?.message}`, "success")
            return true;
        }
    } catch (error) {
        handelException.handelNotificationSwal("Error", "error")
        console.error("Error fetching location data:", error);
    }
}

async function enableSku(productSKUID, enable) {
    let data = {
        productSKUID: productSKUID,
        enable: enable
    }
    try {
        const response = await apiAuth.post(
            `api/hlshop/admin/product/enable-sku`, data
        );
        if (response) {
            handelException.handelNotificationSwal(`${response?.message}`, "success")
            return true;
        }
    } catch (error) {
        handelException.handelNotificationSwal("Error", "error")
        console.error("Error fetching location data:", error);
    }
}
//api/hlshop/admin/product/restock-sku
async function restockSku(productSKUID, totalStock) {
    let data = {
        productSKUID: productSKUID,
        totalStock: totalStock
    }
    try {
        const response = await apiAuth.post(
            `api/hlshop/admin/product/restock-sku`, data
        );
        if (response) {
            handelException.handelNotificationSwal(`${response?.message}`, "success")
            return true;
        }
    } catch (error) {
        handelException.handelNotificationSwal("Error", "error")
        console.error("Error fetching location data:", error);
    }
}

export const productServices = {
    addImg, getCategory, addProduct, listProduct, getProductSku, enableProduct, enableSku, restockSku
}