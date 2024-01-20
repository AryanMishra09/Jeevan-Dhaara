import { createSlice } from "@reduxjs/toolkit";
import {getCurrentUser, userLogin, userRegister} from "./authActions.js";

const token = localStorage.getItem('token') ? 
localStorage.getItem('token') : 
null;

const initialState = {
    loading: false,
    user: null,
    token,
    error:null
};

const authSlice = createSlice({
    name : "auth",
    initialState: initialState,
    reducers:{},
    extraReducers:(builder)=>{

        //login User

        builder.addCase(userLogin.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        
        builder.addCase(userLogin.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload.user;
            state.token = payload.token;
        
            // Store token in localStorage
            localStorage.setItem('token', payload.token);
        });
        
        builder.addCase(userLogin.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        });

        //register user: 
        builder.addCase(userRegister.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(userRegister.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.success = true;
            state.user = payload.user;
        });
        builder.addCase(userRegister.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        });

        //current user: 
        builder.addCase(getCurrentUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload.user;
            // console.log("USEr: ",payload.user)
        });
        builder.addCase(getCurrentUser.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        });
    }
});

export default authSlice;
