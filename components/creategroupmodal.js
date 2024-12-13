'use client'

import { useEffect, useState } from "react"
import "./profilemodal.css";

const CreateGroupModal = ({id, handlefun }) => {

    const [roomName, setRoomName] = useState('');


    const handleCreateGroup = async (room) => {
        try {
            const res = await fetch('api/group', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Correct header
                },
                body: JSON.stringify({ roomname: room, users: [parseInt(id)] }), // Stringify the body
            });

            // Check if the response status is successful (200-299)
            if (res.ok) {
                setRoomName('');
                handlefun(1);
                alert('Group Created Successfully!!');
                handlefun(2);
            } else {
                const errorData = await res.json();
                alert(errorData.message || 'Something went wrong!');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred. Please try again later.');
        }
    }

    console.log('id', id);
    

    return (
        <>
            <div className="modal-active">
                <div id="modal-container" className="five">
                    <div className="modal-background">
                        <div className="modal fade show" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: "block" }}>
                            <div className="modal-dialog modal-md">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Create Group</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>handlefun(1)}></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className='overlay'>
                                            <div className="container">
                                                <div className="main-body">
                                                    <div className="row">

                                                        <div className="col-lg-12">
                                                            {/* <div className="card">
                                                                <div className="card-body"> */}
                                                            <div className="row mb-4">
                                                                <div className="col-sm-4" style={{ alignSelf: "center" }}>
                                                                    <h6 className="mb-0">Group Name</h6>
                                                                </div>
                                                                <div className="col-sm-8 text-secondary">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                    value={roomName}
                                                                    onChange={(e) => setRoomName(e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>
                                                            {/* </div>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal" onClick={()=>handlefun(1)}>Close</button>
                                        <button type="button" className="btn btn-primary btn-sm" onClick={()=>handleCreateGroup(roomName)}>Create</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateGroupModal;