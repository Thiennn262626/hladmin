import { createSlice } from "@reduxjs/toolkit";
import { set } from "nprogress";

const counterOrderSlice = createSlice({
  name: "Order",
  initialState: {
    idOrder: "",
    openDrawerApply: false,
    orderCountList: [0, 0, 0, 0, 0, 0, 0, 0],
    isReloadOrder: [],
    orderData: [[], [], [], [], [], [], [], []],
  },
  reducers: {
    setIdOrder(state, action) {
      state.idOrder = action.payload;
    },
    setOpenDrawerApply(state, action) {
      state.openDrawerApply = action.payload;
    },
    setOrderCountList(state, action) {
      const { status, value } = action.payload;
      //   console.log("setOrderCountList", action.payload);
      state.orderCountList[status] = value;
    },
    setReloadOrder(state, action) {
      const { status, value } = action.payload;
      //   console.log("setReloadOrder", action.payload);
      state.isReloadOrder[status] = value;
    },
    setOrderData(state, action) {
      const { status, data } = action.payload;
      state.orderData[status] = data;
    },
  },
});

export const {
  setReloadOrder,
  setOrderData,
  setOrderCountList,
  setOpenDrawerApply,
  setIdOrder,
} = counterOrderSlice.actions;

export default counterOrderSlice.reducer;
