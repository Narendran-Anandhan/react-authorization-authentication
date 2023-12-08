import React, { useState, useEffect } from 'react';
import {  Form, Button, Modal } from 'react-bootstrap';
import api from "./../../Environment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Organization() {

    const [orgList, setOrgList] = useState([]);
    const [addOrg, SetAddOrg] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(3);
    const [org, setOrg] = useState({});
    const [pagination, setPagination] = useState(true)
    const [totalPages, setTotalPages] = useState(0);
    const [orgId, setOrgId] = useState("");
    const [checkUser, SetCheckUser] = useState('');

    useEffect(()=>{
        SetCheckUser('');
        let user =  JSON.parse(localStorage.getItem('user'));
        if(user && user.role =="admin"){
            SetCheckUser(user);
        }else{
            window.location = '/';
        }

    },[]);

    useEffect(() => {
        api.getMethod("/api/organization?page=" + currentPage + "&limit=" + limit)
            .then(response => {
                if (response.data.status == 200) {
                    setTotalPages(response.data.count);
                    setOrgList(response.data.data);
                }
            })
            .catch(error => {
                toast(error.data.message);
            });
    }, [currentPage])

    const handleAddOrg = (event) => {
        event.preventDefault();
        SetAddOrg(true);
    };

    const handleCloseOrg = () => {
        setOrgId("");
        setOrg({});
        SetAddOrg(false);
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
        setOrg({ ...org, [name]: value })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(orgId){
            api.UpdateMethod("/api/organization", orgId,org)
            .then(response => {
                if (response.data.status == 200) {
                    toast(response.data.message);
                    const updatedList = orgList.map((current) => {
                        return current._id === orgId ? org : current;
                      });
                    setOrgList([...updatedList]);
                    SetAddOrg(false);
                    setOrgId("");
                    setOrg({});
                }
            })
            .catch(error => {
                toast(error.data.message);
            });
        }else{
            api.postMethod("/api/organization", org)
            .then(response => {
                if (response.data.status == 201 ) {
                    toast(response.data.message);
                    setOrgList((prev) => [
                        ...prev, response.data.data]);
                    SetAddOrg(false);
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

    const removeList = (orgId,index) =>{
        api.DeleteMethod("/api/organization", orgId)
        .then(response => {
            if (response.data.status == 200) {
                toast(response.data.message);
                const userListData = [...orgList];
                userListData.splice(index, 1)
                setOrgList(userListData)
            }
        })
        .catch(error => {
            toast(error.data.message);
        });
    }

    const handleEditList = (id,data) =>{
        SetAddOrg(true);
        setOrg(data);
        setOrgId(id);
    }

    return (
        <>
            <ToastContainer />
            <div className="App p-4">
                <Button variant="success" onClick={handleAddOrg}>
                    Add New Organization      </Button>
                <Modal show={addOrg} onHide={handleCloseOrg}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Organization</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" onSubmit={handleSubmit}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" id="name" value={org.name} onChange={(e) => handleChange(e)} placeholder="Enter Name" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" id="email" value={org.email} onChange={(e) => handleChange(e)} placeholder=" Enter Email" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="address" id="address" value={org.address} onChange={(e) => handleChange(e)} placeholder=" Enter Address" />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseOrg}>Cancel</Button>
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
                                        <th>Address</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orgList.map((data, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{data.name}</td>
                                            <td>{data.email}</td>
                                            <td>{data.address}</td>
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
export default Organization;
