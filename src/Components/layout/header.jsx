import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';

function Header() {

     const [checkUser, SetCheckUser] = useState('');

   
    useEffect(()=>{
        SetCheckUser('');
        let user =  JSON.parse(localStorage.getItem('user'));
        if(user){
            SetCheckUser(user);
        }else{
            window.location = '/';
        }

    },[]);


    const handleRemove=(e)=>{
        localStorage.removeItem('user');
        window.location = '/';


    }

    


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand"> <span>App</span></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link"> <span>Dashboard</span></Link>
                        </li>
                        {checkUser ? (checkUser.role == "user" || checkUser.role == "admin"  ? ( 

                        <li className="nav-item">
                            <Link to="/user" className="nav-link"> <span>User</span></Link>
                        </li> ) : '') : '' }
                        { checkUser ? (checkUser.role == "admin" ? ( 
                        <li className="nav-item">
                            <Link to="/organization" className="nav-link"> <span>Organization</span></Link>
                        </li> ) : '') :''}
                        <li className="nav-item">
                            <Link onClick={(e) => handleRemove(e)} className="nav-link"> <span>LogOut</span></Link>
                        </li>

                    </ul>
                </div>
            </nav>
            <ToastContainer />

        </>
    );
}
export default Header;