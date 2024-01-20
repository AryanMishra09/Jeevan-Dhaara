import React from "react";
import Form from "../../components/shared/Form/Form";
import { toast } from 'react-toastify';
import {useSelector} from "react-redux"
import Spinner from "../../components/shared/Spinner";

function Register(){

    const {loading, error} = useSelector(state => state.auth);

    return(
        <div>
            {error && <span>{toast.error(error)}</span> }
            { loading? (<Spinner />) : (
                <div className="row g-0">
                    <div className="col-md-8 form-banner">
                        <img src="./assets/images/banner2.jpg" alt="loginImage" />
                    </div>
                    <div className="col-md-4 form-container">
                        <Form 
                            formType="register"
                            formTitle="Register Page"
                            submitBtn = "Register"
                        />

                    </div>
                </div>
            )};
        </div>
    );
}


export default Register;