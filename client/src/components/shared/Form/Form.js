import React, {useState} from "react";
import InputType from "./InputType";
import {Link} from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";

function Form({formType, submitBtn, formTitle}){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("donar");
    const [name, setName] = useState("");
    const [organisationName, setOrganisationName] = useState("");
    const [hospitalName, setHospitalName] = useState("");
    const [website, setWebsite] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    return(
        <>
            <form 
                onSubmit={(e)=>{
                    if(formType==='login') 
                        return handleLogin(e, email, password, role);
                    else if(formType==="register") 
                        return handleRegister(
                            e,
                            name,
                            role,
                            email,
                            password,
                            organisationName,
                            hospitalName,
                            website,
                            address,
                            phone
                        );
                }}
            >
                <h1 className ="text-centre" >{formTitle}</h1>
                <hr />


{/* ******************************************************
                                   Radio button */}

                <div className="d-flex mb-3">
                    <div className="form-check ms-2">
                        <input 
                            type="radio" 
                            className="form-check-input" 
                            name="role" 
                            id="donarRadio"
                            value="donar"
                            onChange ={(e)=>setRole(e.target.value)}
                            defaultChecked
                        />
                        <label htmlFor="donarRadio" className="form-check-label">
                            Donar
                        </label>
                    </div>
                    <div className="form-check  ms-2">
                        <input 
                            type="radio" 
                            className="form-check-input" 
                            name="role" 
                            id="hospitalRadio"
                            value="hospital"
                            onChange ={(e)=>setRole(e.target.value)}
                        />
                        <label htmlFor="hospitalRadio" className="form-check-label">
                            Hospital
                        </label>
                    </div>
                    <div className="form-check ms-2">
                        <input 
                            type="radio" 
                            className="form-check-input" 
                            name="role" 
                            id="adminRadio"
                            value="admin"
                            onChange ={(e)=>setRole(e.target.value)}
                        />
                        <label htmlFor="adminRadio" className="form-check-label">
                            Admin
                        </label>
                    </div>
                    <div className="form-check  ms-2">
                        <input 
                            type="radio" 
                            className="form-check-input" 
                            name="role" 
                            id="organisationRadio"
                            value="organisation"
                            onChange ={(e)=>setRole(e.target.value)}
                        />
                        <label htmlFor="organisationRadio" className="form-check-label">
                            Organisation
                        </label>
                    </div>
                </div>


{/* ****************************************************** */}
                {/* //INPUT FIELDS */}

                
                {/* //If Register form Or Login Form, then below code will be rendered accordingly*/}

                               {/* //Also Conditional Rendering Based on Role */}


                {(formType==="register" && (role==="admin" || role==="donar") ) &&
                <InputType 
                    labelText = "Name"
                    labelFor = "ForName"
                    inputType = "text"
                    name = "name" 
                    value={name}
                    onChange = {(p)=>setName(p.target.value)}                    
                />}

                {(formType==="register" && role==="organisation") &&
                <InputType 
                    labelText = "Organisation Name"
                    labelFor = "forOrganisationName"
                    inputType = "text"
                    name = "organisationName" 
                    value={organisationName}
                    onChange = {(p)=>setOrganisationName(p.target.value)}                    
                />}

                {(formType==="register" && role==="hospital") &&
                <InputType 
                    labelText = "Hospital Name"
                    labelFor = "forHospitalName"
                    inputType = "text"
                    name = "hospitalName" 
                    value={hospitalName}
                    onChange = {(p)=>setHospitalName(p.target.value)}                    
                />}

                <InputType 
                    labelText = "Email"
                    labelFor = "Email"
                    inputType = "email"
                    name = "email"
                    value={email}
                    onChange = {(e)=>setEmail(e.target.value)}
                />

                <InputType 
                    labelText = "Password"
                    labelFor = "Password"
                    inputType = "password"
                    name = "password" 
                    value={password}
                    onChange = {(p)=>setPassword(p.target.value)}                    
                />


                {formType==="register" &&
                <InputType 
                    labelText = "Website"
                    labelFor = "forWebsite"
                    inputType = "text"
                    name = "website" 
                    value={website}
                    onChange = {(p)=>setWebsite(p.target.value)}                    
                />}

                {formType==="register" &&
                <InputType 
                    labelText = "Address"
                    labelFor = "forAddress"
                    inputType = "text"
                    name = "address" 
                    value={address}
                    onChange = {(p)=>setAddress(p.target.value)}                    
                />}

                {formType==="register" &&
                <InputType 
                    labelText = "Phone"
                    labelFor = "forPhone"
                    inputType = "text"
                    name = "phone" 
                    value={phone}
                    onChange = {(p)=>setPhone(p.target.value)}                    
                />}
                <div className="d-flex flex-row justify-content-between">

                    {formType==="login"? (
                        <p>
                            Not Registered Yet?
                            <Link to="/register"> Register Here !</Link>
                        </p>
                    ) 
                    : (
                        <p>
                            Already a User? Please 
                            < Link to="/login"> Login Here !</Link>
                        </p>
                    )}

                    <button type="submit" className="btn btn-primary">{submitBtn}</button>  
                </div> 
            </form>
        </>
    );
}

export default Form;