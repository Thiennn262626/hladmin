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
        avatars: [],
        dataPost: {
            name: "",
            slogan: "",
            description: "",
            notes: "",
            productCategoryID: "",
            madeIn: "",
            uses: "",
            avatarMediaIDS: [],
            attributes: [],
            productSKUs: [],
        }
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        setModeLogin(state, action) {
            state.modelLogin = action.payload;

        },
        setInfo(state, action) {
            state.info = action.payload;
        }
        , setOpenDrawerApply(state, action) {
            state.openDrawerApply = action.payload;
        }
        , setIdOrder(state, action) {
            state.idOrder = action.payload;
        },
        setLoangding(state, action) {
            state.isLoading = action.payload;
        },
        setAvatars(state, action) {
            state.avatars = action.payload;
            state.dataPost.avatarMediaIDS = action.payload.map((avatar) => ({
                mediaID: avatar.mediaID,
            }));
            console.log("data", state.dataPost);
        },
        setName(state, action) {
            state.dataPost.name = action.payload;
        }
        , setSlogan(state, action) {
            state.dataPost.slogan = action.payload;
        }
        , setDescription(state, action) {
            state.dataPost.description = action.payload;
        }
        , setNotes(state, action) {
            state.dataPost.notes = action.payload;
        }
        , setProductCategoryID(state, action) {
            state.dataPost.productCategoryID = action.payload;
        }
        , setMadeIn(state, action) {
            state.dataPost.madeIn = action.payload;
        }
        , setUses(state, action) {
            state.dataPost.uses = action.payload;
        },


    },

});
export const {
    setAvatars,
    setUser,
    setModeLogin,
    setInfo,
    setOpenDrawerApply,
    setIdOrder,
    setLoangding,
    setName,
    setSlogan,
    setDescription,
    setNotes,
    setProductCategoryID,
    setMadeIn,
    setUses,
    
} = counterSlice.actions;
export default counterSlice.reducer;