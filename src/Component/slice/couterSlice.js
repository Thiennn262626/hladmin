import { createSlice } from "@reduxjs/toolkit";
const counterSlice = createSlice({
    name: "counter",
    initialState: {
        count: 0,
        user: {},
        modelLogin: false,
        info: {},
        openDrawerApply: false,
        idOrder: "",
        isLoading: true,
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        setModeLogin(state, action) {
            state.modelLogin = action.payload;
            console.log(state.modelLogin);
        },
        setInfo(state, action) {
            state.info = action.payload;
        }
        ,setOpenDrawerApply(state, action) {
            state.openDrawerApply = action.payload;
        }
        ,setIdOrder(state, action) {
            state.idOrder = action.payload;
        },
        setLoangding(state, action) {
            state.isLoading = action.payload;
        }   

    }
});
export const { setUser,setModeLogin,setInfo,setOpenDrawerApply, setIdOrder, setLoangding } = counterSlice.actions;
export default counterSlice.reducer;