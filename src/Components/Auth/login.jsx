import React, { useState } from 'react';
import api from "../../Environment";
import {Link} from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

     const [user, setUser] = useState({});
   
    const handleSubmit = (event) => {
        event.preventDefault();
        api.postMethod("/api/login", user)
        .then(response => {
            console.log(response);

            if(response.data.status == 201){

                if (response.data.data) {
                    localStorage.setItem(
                        "user",
                        JSON.stringify(response.data.data)
                    );
                    toast(response.data.message);
                    let user =  JSON.parse(localStorage.getItem('user'));
                    if(user.role == 'admin'){
                        window.location = '/admin';    
                    }else{
                        window.location = '/user';
                    }
                    // window.location = '/admin/user';
                }
            }
        })
        .catch(error => {
            console.log(error.response);
            if(error.response.data.error){
                alert(error.response.data.error);

            }
           
        });

    };

    const handleChange = (e) => {
        e.preventDefault();
        const {name,value} = e.currentTarget;
        setUser({...user, [name]:value})

    };

    return (
        <>
                    <ToastContainer />

       <div className="card mx-auto mt-5" style={{width: 18+ "rem"}}>
            <div className="card-body">
                <h5 className="card-title">Login</h5>
            <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label for="email">Email address</label>
                        <input type="email" name="email" className="form-control" id="email" onChange={(e)=>handleChange(e)}  placeholder="Enter email" required />
                    </div>
                    <div className="form-group">
                        <label for="password">Password</label>
                        <input type="password" name="password" className="form-control" id="password" onChange={(e)=>handleChange(e)}  placeholder="Password"  required/>
                    </div>
                    <h6>New User ? <Link to="/register"> <span>Click here</span></Link></h6>

                    <button type="submit" className="btn btn-primary mt-2">Submit</button>
            </form>
            </div>
        </div>
           
        </>
    );
}
export default Login;