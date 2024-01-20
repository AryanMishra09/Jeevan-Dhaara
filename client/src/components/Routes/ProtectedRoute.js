import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import API from "../../services/API";
import { getCurrentUser } from "../../redux/features/auth/authActions";
import {Navigate} from "react-router-dom";


function ProtectedRoute({children}){
    const dispatch = useDispatch();

    //get user current:

    async function getUser(){
        try {
            const {data} = await API.get('/auth/current-user');
            if(data?.success){
                dispatch(getCurrentUser(data));      //{ currentUser: data }
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Unauthorized, possibly due to an expired token
                // Redirect to the login page or handle it appropriately
                localStorage.clear();
                console.log("Token expired or invalid. Redirecting to login.");
            } else {
                // Other types of errors
                localStorage.clear();
                console.error("Error in getUser in ProtectedRoute.js: ", error);
            }
        }
        
    }

    useEffect(() => {
        getUser();
    },); // Empty dependency array
    

    if(localStorage.getItem('token')){
        return children;
    }else{
        return <Navigate to="/login" />
    }
}

export default ProtectedRoute;