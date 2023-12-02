import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "../Components/Auth/register";
import Login from "../Components/Auth/login";

function App() {
    return(
        <div>
            <Routes>
                <Route  path="/" element={<Login/>}/>
                <Route  path="/register" element={<Register/>}/>
             
            </Routes>
        </div>
    );
    }

export default App;