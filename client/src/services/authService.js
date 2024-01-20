import {userLogin, userRegister} from "../redux/features/auth/authActions";
import store from "../redux/store";

function handleLogin(e, email, password, role){

    e.preventDefault();
    try{
        if(!role || !email || !password){
            return alert("Please provide all fields");
        }
       store.dispatch(userLogin({email, password,role}))
    }catch(error){
        console.log("Error in authService -handleLogin: " ,error);
    }
};

function handleRegister(e,name,role,email,password,organisationName,hospitalName,website,address,phone){
    
    e.preventDefault();
    try{
        store.dispatch(userRegister({name,role,email,password,organisationName,hospitalName,website,address,phone}));

    }catch(error){
        console.log("Error in authService - handleRegister: ",error);
    }
}

export {handleRegister, handleLogin};