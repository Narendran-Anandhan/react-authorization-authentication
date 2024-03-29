import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from "../Components/layout/header";
import User from "../Components/pages/user";
import Organization from "../Components/pages/organization";
import Dashboard from "../Components/pages/dashboard";
import ProtectedUserRoute from "../Helper/protectedUserRoute";
import ProtectedOrgRoute from "../Helper/protectedOrgRoute"

function App() {
    return (
        <div>
            <Nav />
            <Routes>
                <Route exact path="/" element={<ProtectedUserRoute />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/userlist" element={<User />} />
                </Route>


            </Routes>
        </div>
    );
}

export default App;