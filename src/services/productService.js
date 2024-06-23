import apiAuth from "../utils/apiAuth";
import api from "../utils/api";
import { handelException } from "./handelException";

async function addImg(file) {
  try {
    const response = await apiAuth.post(
      `api/hlshop/admin/product/upload-image`,
      file,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response) {
      return response;
    }
  } catch (error) {
    handelException.handelNotificationSwal("Lỗi upload ảnh sản phẩm", "error");
    console.error("Error uploading image:", error);
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
    handelException.handelNotificationSwal(
      "Lỗi lấy danh sách ngành hàng",
      "error"
    );
  }
}
async function addProduct(data) {
  try {
    const response = await apiAuth.post(
      `api/hlshop/admin/product/create-product`,
      data
    );
    if (response) {
      handelException.handelNotificationSwal(
        "Thêm sản phẩm thành công",
        "success"
      );
      return response;
    }
  } catch (error) {
    handelException.handelNotificationSwal("Lỗi thêm sản phẩm", "error");
  }
}
async function listProduct(offset = 0, limit = 10, sortBy = 0, search) {
  try {
    const url = `api/hlshop/admin/product/get-all-product?offset=${offset}&limit=${limit}&sortBy=${sortBy}&search=${search}`;
    const response = await apiAuth.get(url);
    if (response) {
      console.log("response", response);
      return response;
    }
  } catch (error) {
    handelException.handelNotificationSwal(
      "Lỗi lấy danh sách sản phẩm",
      "error"
    );
  }
}
async function getProductSku(id) {
  try {
    const response = await apiAuth.get(
      `api/hlshop/admin/product/get-product-sku-by-product-id?productID=${id}`
    );
    if (response) {
      return response;
    }
  } catch (error) {
    handelException.handelNotificationSwal(
      "Lỗi lấy danh sách sku sản phẩm",
      "error"
    );
  }
}

async function enableProduct(productID, enable) {
  let data = {
    productID: productID,
    enable: enable,
  };
  try {
    const response = await apiAuth.post(
      `api/hlshop/admin/product/enable-product`,
      data
    );
    if (response) {
      handelException.handelNotificationSwal(
        "Cập nhật trạng thái sản phẩm thành công",
        "success"
      );
      return true;
    }
  } catch (error) {
    handelException.handelNotificationSwal(
      "Lỗi cập nhật trạng thái sản phẩm",
      "error"
    );
    console.error("Error fetching location data:", error);
  }
}

async function enableSku(productSKUID, enable) {
  let data = {
    productSKUID: productSKUID,
    enable: enable,
  };
  try {
    const response = await apiAuth.post(
      `api/hlshop/admin/product/enable-sku`,
      data
    );
    if (response) {
      handelException.handelNotificationSwal(
        "Cập nhật trạng thái sản phẩm thành công",
        "success"
      );
      return true;
    }
  } catch (error) {
    handelException.handelNotificationSwal(
      "Lỗi cập nhật trạng thái sản phẩm",
      "error"
    );
    console.error("Error fetching location data:", error);
  }
}

async function restockSku(productSKUID, totalStock) {
  let data = {
    productSKUID: productSKUID,
    totalStock: totalStock,
  };
  try {
    const response = await apiAuth.post(
      `api/hlshop/admin/product/restock-sku`,
      data
    );
    if (response) {
      handelException.handelNotificationSwal(
        "Cập nhật trạng thái sản phẩm thành công",
        "success"
      );
      return true;
    }
  } catch (error) {
    handelException.handelNotificationSwal(
      "Lỗi cập nhật trạng thái sản phẩm",
      "error"
    );
    console.error("Error fetching location data:", error);
  }
}

async function getProductById(id) {
  try {
    const response = await apiAuth.get(
      `api/hlshop/admin/product/get-product-by-id?ProductID=${id}`
    );
    if (response) {
      return response;
    }
  } catch (error) {
    handelException.handelNotificationSwal(
      "Lỗi lấy thông tin sản phẩm",
      "error"
    );
  }
}

async function updateSkuPrice(productSKUID, price) {
  let data = {
    productSKUID: productSKUID,
    price: price,
  };
  try {
    const response = await apiAuth.post(
      `api/hlshop/admin/product/update-sku-price`,
      data
    );
    if (response) {
      handelException.handelNotificationSwal(`${response?.message}`, "success");
      return true;
    }
  } catch (error) {
    handelException.handelNotificationSwal("Cập nhật giá thất bại", "error");
  }
}

async function updateSkuPriceBefore(productSKUID, price) {
  let data = {
    productSKUID: productSKUID,
    price: price,
  };
  try {
    const response = await apiAuth.post(
      `api/hlshop/admin/product/update-sku-price-before`,
      data
    );
    if (response) {
      handelException.handelNotificationSwal(`${response?.message}`, "success");
      return true;
    }
  } catch (error) {
    handelException.handelNotificationSwal("Cập nhật giá thất bại", "error");
  }
}

async function updateProductInfo(data) {
  try {
    const response = await apiAuth.post(
      `api/hlshop/admin/product/update-product-info`,
      data
    );
    if (response) {
      handelException.handelNotificationSwal(`${response?.message}`, "success");
      return true;
    }
  } catch (error) {
    handelException.handelNotificationSwal(
      "Cập nhật thông tin sản phẩm thất bại",
      "error"
    );
  }
}

async function updateProductDelivery(data) {
  try {
    const response = await apiAuth.post(
      `api/hlshop/admin/product/update-product-delivery`,
      data
    );
    if (response) {
      handelException.handelNotificationSwal(`${response?.message}`, "success");
      return true;
    }
  } catch (error) {
    handelException.handelNotificationSwal(
      "Cập nhật thông tin vận chuyển sản phẩm thất bại",
      "error"
    );
  }
}

export const productServices = {
  addImg,
  getCategory,
  addProduct,
  listProduct,
  getProductById,
  getProductSku,
  enableProduct,
  enableSku,
  restockSku,
  updateSkuPrice,
  updateSkuPriceBefore,
  updateProductInfo,
  updateProductDelivery,
};
