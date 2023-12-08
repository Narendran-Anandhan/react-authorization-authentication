import React, { useState } from 'react';
import {Link} from "react-router-dom";
import api from "../../Environment";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {

     const [user, setUser] = useState({});
   
    const handleSubmit = (event) => {
        event.preventDefault();
        api.postMethod("/api/register", user)
        .then(response => {
            if(response.status == 201){
                console.log(response);

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
                            }
            }
            
        })
        .catch(error => {
            console.log(error);
            if(error.response.data.message){
                alert(error.response.data.message);

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
                <h5 className="card-title">New User Register</h5>
            <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Name</label>
                        <input type="text" name="username" className="form-control" id="username" onChange={(e)=>handleChange(e)}  placeholder="username"  required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" name="email" className="form-control" id="email" onChange={(e)=>handleChange(e)}  placeholder="Enter email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" className="form-control" id="password" onChange={(e)=>handleChange(e)}  placeholder="Password"  required/>
                    </div>
                    <div className="form-group">
                    <label htmlFor="role">Role</label>
                        <select name="role" onChange={(e)=>handleChange(e)} className="custom-select">
                            <option value="">Select Role</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                   <h6>Existing User ? <Link to="/"> <span>Click here</span></Link></h6>
                    <button type="submit" className="btn btn-primary mt-2">Submit</button>
            </form>
            </div>
        </div>
           
        </>
    );
}
export default Register;