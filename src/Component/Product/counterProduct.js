import { createSlice } from "@reduxjs/toolkit";
import { set } from "nprogress";

const counterProductSlice = createSlice({
  name: "Product",
  initialState: {
    loadListProduct: true,
    modalSkus: false,
    productID: "",
    //
    avatars: [],
    dataPost: {
      productName: "",
      productSlogan: "",
      productDescription: "",
      productNotes: "",
      productMadeIn: "",
      productUses: "",
      productIngredient: "",
      productObjectsOfUse: "",
      productPreserve: "",
      productInstructionsForUse: "",
      productHeight: "",
      productWidth: "",
      productLength: "",
      productWeight: "",
      productCategoryID: "",
      avatarMediaIDS: [],
      attributes: [],
      productSKUs: [],
    },
    items: [],
    //
    search: "",
    sortBy: 0,
  },
  reducers: {
    setLoadProduct(state, action) {
      state.loadListProduct = action.payload;
    },
    setModalSkus(state, action) {
      state.modalSkus = action.payload;
    },
    setProductID(state, action) {
      state.productID = action.payload;
    },
    //
    setAvatars(state, action) {
      state.avatars = action.payload;
      state.dataPost.avatarMediaIDS = action.payload.map((avatar) => ({
        media_url: avatar.media_url,
      }));
      console.log("data", state.dataPost);
    },
    setItems(state, action) {
      state.items = action.payload;
    },
    setAttributess(state, action) {
      state.dataPost.attributes = [];
      state.dataPost.attributes = action.payload;
      console.log("setAttributess", state.dataPost.attributes);
    },
    setProductSKUs(state, action) {
      state.dataPost.productSKUs = action.payload;
      console.log("setProductSKUs", state.dataPost.productSKUs);
    },
    setProductName(state, action) {
      state.dataPost.productName = action.payload;
    },
    setProductSlogan(state, action) {
      state.dataPost.productSlogan = action.payload;
    },
    setProductDescription(state, action) {
      state.dataPost.productDescription = action.payload;
    },
    setProductNotes(state, action) {
      state.dataPost.productNotes = action.payload;
    },
    setProductMadeIn(state, action) {
      state.dataPost.productMadeIn = action.payload;
    },
    setProductUses(state, action) {
      state.dataPost.productUses = action.payload;
    },
    setProductIngredient(state, action) {
      state.dataPost.productIngredient = action.payload;
    },
    setProductObjectsOfUse(state, action) {
      state.dataPost.productObjectsOfUse = action.payload;
    },
    setProductPreserve(state, action) {
      state.dataPost.productPreserve = action.payload;
    },
    setProductInstructionsForUse(state, action) {
      state.dataPost.productInstructionsForUse = action.payload;
    },
    setProductHeight(state, action) {
      state.dataPost.productHeight = action.payload;
    },
    setProductWidth(state, action) {
      state.dataPost.productWidth = action.payload;
    },
    setProductLength(state, action) {
      state.dataPost.productLength = action.payload;
    },
    setProductWeight(state, action) {
      state.dataPost.productWeight = action.payload;
    },
    setProductCategoryID(state, action) {
      state.dataPost.productCategoryID = action.payload;
    },
    //
    setSearch(state, action) {
      state.search = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
      console.log("sortBy", state.sortBy);
    },
  },
});

export const {
  setLoadProduct,
  setModalSkus,
  setProductID,
  setAvatars,
  setItems,
  setAttributess,
  setProductSKUs,
  setProductName,
  setProductSlogan,
  setProductDescription,
  setProductNotes,
  setProductMadeIn,
  setProductUses,
  setProductIngredient,
  setProductObjectsOfUse,
  setProductPreserve,
  setProductInstructionsForUse,
  setProductHeight,
  setProductWidth,
  setProductLength,
  setProductWeight,
  setProductCategoryID,
  setSearch,
  setSortBy,
} = counterProductSlice.actions;

export default counterProductSlice.reducer;
