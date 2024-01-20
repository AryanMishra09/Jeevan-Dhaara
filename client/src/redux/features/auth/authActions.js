import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { toast } from 'react-toastify';

const userLogin = createAsyncThunk(
    'auth/login',
    async ({role, email, password}, {rejectWithValue})=>{
        try {
            const {data} = await API.post("/auth/login",{role, email, password})
            
            //store token

            if(data.success){
                localStorage.setItem('token', data.token);
                toast.success(data.message);
                window.location.replace('/');
            }
            
            return data;

        } catch (error) {
            console.log("Error in userLogin in authAction.js",error);
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message);
            }else{
                return rejectWithValue(error.message);
            }
        }
    }
)

//register
const userRegister = createAsyncThunk(
    'auth/register',
    async ({name,role, email, password, organisationName, hospitalName,website,address,phone}, {rejectWithValue})=>{
        try {
            const {data} = await API.post('/auth/register', {name,role, email, password, organisationName, hospitalName,website,address,phone});
            if(data.success){
                toast.success(data.message);
                window.location.replace('/login');
            }
        } catch (error) {
            console.log("Error in userRegister in authActions.js: ",error);
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message);
            }else{
                return rejectWithValue(error.message);
            }
        }
    }
)

//current user: 

const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async ({rejectWithValue})=>{
        try {
            const res = await API.get("/auth/current-user");
            if(res?.data){
                return res?.data     //shorthand of  (res && res.data)
            }
        } catch (error) {
            console.log("Error in getCurrentUser in authActions.js: ",error);
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message);
            }else{
                return rejectWithValue(error.message);
            }
        }
    }
)

export {userLogin, userRegister, getCurrentUser};