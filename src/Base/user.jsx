import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from "../Components/layout/header";
import User from "../Components/pages/user/index";
import Organization from "../Components/pages/organization/index";
import Dashboard from "../Components/pages/dashboard/index";

function App() {
    return(
        <div>
            <Nav />
            <Routes>
                <Route  path="/" element={<Dashboard/>}/>
                <Route  path="/user" element={<User/>}/>
                <Route  path="/0rganization" element={<Organization/>}/>
            </Routes>
        </div>
    );
    }

export default App;