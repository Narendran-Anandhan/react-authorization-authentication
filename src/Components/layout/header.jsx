import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';

function Header() {


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
                        <li className="nav-item">
                            <Link to="/user" className="nav-link"> <span>User</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/organization" className="nav-link"> <span>Organization</span></Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Profile
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#">Logout</a>
                                <div className="dropdown-divider"></div>
                            </div>
                        </li>

                    </ul>
                </div>
            </nav>
            <ToastContainer />

        </>
    );
}
export default Header;