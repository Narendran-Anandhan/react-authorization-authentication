import React, { useState, useEffect } from 'react';
import {  Form, Button, Modal } from 'react-bootstrap';
import api from "./../../../Environment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {

    const [userList, setUserList] = useState([]);
    const [addUser, SetAddUser] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(3);
    const [user, setUser] = useState({});
    const [pagination, setPagination] = useState(true)
    const [totalPages, setTotalPages] = useState(0);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        api.getMethod("/api/user?page=" + currentPage + "&limit=" + limit)
            .then(response => {
                if (response.data.status == 200) {
                    setTotalPages(response.data.count);
                    setUserList(response.data.data);
                }
            })
            .catch(error => {
                toast(error.data.message);
            });
    }, [currentPage])

    const handleAddUser = (event) => {
        event.preventDefault();
        SetAddUser(true);
    };

    const handleCloseUser = () => {
        setUserId("");
        setUser({});
        SetAddUser(false);
    };

    const handleDecrement = (e) => {
        e.preventDefault();
        currentPage > 1 ? setCurrentPage(currentPage - 1) : setCurrentPage(1)
    };

    const handleIncrement = (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.currentTarget;
        setUser({ ...user, [name]: value })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(userId){
            api.UpdateMethod("/api/user", userId,user)
            .then(response => {
                if (response.data.status == 200) {
                    toast(response.data.message);
                    const updatedList = userList.map((current) => {
                        return current._id === userId ? user : current;
                      });
                    setUserList([...updatedList]);
                    SetAddUser(false);
                    setUserId("");
                    setUser({});
                }
            })
            .catch(error => {
                toast(error.data.message);
            });
        }else{
            api.postMethod("/api/user", user)
            .then(response => {
                if (response.data.status == 201 ) {
                    toast(response.data.message);
                    setUserList((prev) => [
                        ...prev, response.data.data]);
                    SetAddUser(false);
                }else{
                    toast(response.data.message);

                }
            })
            .catch(error => {
console.log(error);
                toast(error.response.data.message);
            });
        }
    };

    const removeList = (userId,index) =>{
        api.DeleteMethod("/api/user", userId)
        .then(response => {
            if (response.data.status == 200) {
                toast(response.data.message);
                const userListData = [...userList];
                userListData.splice(index, 1)
                setUserList(userListData)
            }
        })
        .catch(error => {
            toast(error.data.message);
        });
    }

    const handleEditList = (id,data) =>{
        SetAddUser(true);
        setUser(data);
        setUserId(id);
    }

    return (
        <>
            <ToastContainer />
            <div className="App p-4">
                <Button variant="success" onClick={handleAddUser}>
                    Add New User      </Button>
                <Modal show={addUser} onHide={handleCloseUser}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" onSubmit={handleSubmit}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="username" id="username" value={user.username} onChange={(e) => handleChange(e)} placeholder="Enter Name" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" id="email" value={user.email} onChange={(e) => handleChange(e)} placeholder=" Enter Email" />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseUser}>Cancel</Button>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>Save</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="col-md-12">
                        <div>
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userList.map((data, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{data.username}</td>
                                            <td>{data.email}</td>
                                            <td> 
                                                <button type="button" className='btn btn-primary mr-3' onClick={(event) => handleEditList(data._id, data)}>Edit</button>
                                                <button type="button" className='btn btn-danger' onClick={() => removeList(data._id,data.index)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {pagination ?
                <nav aria-label="Page navigation example" className="mt-3 mr-5">
                    <ul className="pagination justify-content-end">
                        <li className="page-item">
                            <a className="page-link" onClick={(e) => handleDecrement(e)} disabled={currentPage === 1}>Previous</a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" onClick={(e) => handleIncrement(e)} disabled={currentPage === totalPages}>Next</a>
                        </li>
                    </ul>
                </nav>
                : ''
            }
        </>
    );
}
export default Dashboard;
