import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';

const  ProtectedUserRoute = () => {
    const [role, setRole] = useState(false);

    useEffect(()=>{
        setRole(false);
        let user =  JSON.parse(localStorage.getItem('user'));
       
       
       if(user){

        setRole(user.role=="user"?true:false)
       }
    },[]);


    return role ? <Outlet /> : <Navigate to="/" />;
}

  export default ProtectedUserRoute