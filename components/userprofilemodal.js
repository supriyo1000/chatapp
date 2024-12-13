'use client'

import React, { useEffect, useReducer, useState } from 'react';
import "./profilemodal.css";

const UserProfileModal = ({ id, handlefun }) => {

    console.log(id);
    

    const [userData, setUserData] = useState([]);

    console.log('userData', userData);
    

    useEffect(() => {
        const getprofile = async () => {
            const response = await fetch(`/api/auth/users?mode=${3}&userid=${id}&email=''`);
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUserData(data[0]);
        }
        getprofile();
    }, [id])

    return (
        <>
            <div className="modal-active">
                <div id="modal-container" className="six">
                    <div className="modal-background">
                        <div className="modal fade show" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: "block" }}>
                            <div className="modal-dialog modal-sm">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handlefun(2)}></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className='overlay'>
                                            <div className="container">
                                                <div className="main-body">
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <div className="d-flex flex-column align-items-center text-center">
                                                                        {/* <img
                                                                            src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                                                            alt="Admin"
                                                                            className="rounded-circle p-1 bg-primary"
                                                                            width={110}
                                                                        /> */}
                                                                        <img
                                                                            src={userData?.[0]?.profile_img ? `/uploads/${userData[0].profile_img}` : '/user.png'}
                                                                            alt="avatar"
                                                                            style={{ width: "110px" }}
                                                                        />

                                                                        <div className="mt-3">
                                                                            <h4>{userData?.[0]?.username || 'update your name'}</h4>
                                                                            <p className="text-secondary mb-1">{userData?.[0]?.email}</p>
                                                                            <p className="text-secondary mb-1">Tata Consultancy Services</p>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default UserProfileModal;