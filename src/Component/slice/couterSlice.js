import { createSlice } from "@reduxjs/toolkit";
const counterSlice = createSlice({
    name: "counter",
    initialState: {
        count: 0,
        user: {},
        modelLogin: false,
        info: {}
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

    }
});
export const { setUser,setModeLogin,setInfo } = counterSlice.actions;
export default counterSlice.reducer;