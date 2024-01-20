import React from "react";
import Form from "../../components/shared/Form/Form";
import {useSelector} from "react-redux"
import Spinner from "./../../components/shared/Spinner";
import { toast } from 'react-toastify';

function Login(){

    const {loading, error} = useSelector(state => state.auth)

    return(
       
        <div>
            {error && <span>{toast.error(error)}</span> }
            { loading? (<Spinner />) : (
                <div className="row g-0">
                    <div className="col-md-8 form-banner">
                        <img src="./assets/images/banner1.jpg" alt="loginImage" />
                    </div>
                    <div className="col-md-4 form-container">
                        <Form 
                            formType="login"                                
                            formTitle="Login Page"
                            submitBtn = "Login"
                        />
                    </div>

                </div>
            )}
        </div>
        
    );
}

export default Login;