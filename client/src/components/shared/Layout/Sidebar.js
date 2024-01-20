import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../../styles/Layout.css';
import { useSelector } from 'react-redux';


function Sidebar(){

    //Get User State
    const {user} = useSelector((state) => state.auth);

    const location = useLocation();

    return(
        <div>
            <div className='sidebar'>
                <div className='menu'>
                    {user?.role === "organisation" && (
                        <>
                            <div className={`menu-item ${location.pathname === "/" && "active"}`}>
                                <i className="fa-solid fa-warehouse fa-xl"></i>
                                <Link to="/">Inventory</Link>
                            </div>

                            <div className={`menu-item ${location.pathname === "/donar" &&  "active"}`}>
                                <i className="fa-solid fa-hand-holding-medical fa-xl"></i>
                                <Link to="/donar">Donar</Link>
                            </div>

                            <div className={`menu-item ${location.pathname === "/hospital" &&  "active"}`}>
                                <i className="fa-solid fa-hospital fa-xl"></i>
                                <Link to="/hospital">Hospital</Link>
                            </div>
                        </>
                    )}

                    {user?.role === "admin" && (
                        <>
                            <div className={`menu-item ${location.pathname === "/donar-list" && "active"}`}>
                                <i className="fa-solid fa-warehouse fa-xl"></i>
                                <Link to="/donar-list">Donar List</Link>
                            </div>

                            <div className={`menu-item ${location.pathname === "/hospital-list" &&  "active"}`}>
                                <i className="fa-solid fa-hand-holding-medical fa-xl"></i>
                                <Link to="/hospital-list">Hospital List</Link>
                            </div>

                            <div className={`menu-item ${location.pathname === "/org-list" &&  "active"}`}>
                                <i className="fa-solid fa-hospital fa-xl"></i>
                                <Link to="/org-list">ORG List</Link>
                            </div>
                        </>
                    )}
                    
                    {(user?.role === "donar" || user?.role === "hospital") && (
                        <div className={`menu-item ${location.pathname === "/orgnaisation" && "active"}`}>
                            <i className="fa-sharp fa-solid fa-building-ngo fa-xl"></i>
                            <Link to="/orgnaisation">Orgnaisation</Link>
                        </div>
                    )}

                    { user?.role === "hospital" && (
                        <div className={`menu-item ${location.pathname === "/consumer" && "active"}`}>
                            <i className="fa-solid fa-republican fa-xl"></i>
                            <Link to="/consumer">Consumer</Link>
                        </div>
                    )}

                    { user?.role === "donar" && (
                        <div className={`menu-item ${location.pathname === "/donation" && "active"}`}>
                            <i className="fa-solid fa-money-check-dollar fa-xl"></i>
                            <Link to="/donation">Donation</Link>
                        </div>
                    )}

                    
                    

                    {/* {userMenu.map((menu) => {
                        const isActive = location.pathname === menu.path
                        return (
                        <div key={menu.id} className={`menu-item ${isActive && "active"}`}>
                            <i className={menu.icon}></i>
                            <Link to={menu.path}>{menu.name}</Link>
                        </div>)
                    })} */}


                </div>
            </div>
        </div>
    );
}
export default Sidebar;