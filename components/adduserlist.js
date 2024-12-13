import React, { useState } from 'react';
import "./userslist.css";
import "../app/app.css";

const AddUserList = ({ roomid, allusers}) => {
    console.log('allusers', allusers);

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false); // Add loading state
    const [error, setError] = useState(""); // For error handling
    const [success, setSuccess] = useState(""); // For success message

    console.log('users', users);
    

    // Handle adding/removing user from the list
    const handleAddUsers = (id) => {
        setUsers((prevUsers) => {
            if (prevUsers.includes(id)) {
                // Remove the user if already in the list
                return prevUsers.filter(userId => userId !== id);
            } else {
                // Add the user if not in the list
                return [...prevUsers, id];
            }
        });
    }

    // Handle the update request
    const handleUpdateGroup = async (users, roomid) => {
        console.log('calling');
        
        if (users.length > 0) {
            setLoading(true); // Start loading
            setError(""); // Clear previous errors
            setSuccess(""); // Clear previous success messages

            try {
                const res = await fetch('api/group/adduser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ users: users, roomid: roomid }),
                });

                if (res.ok) {
                    setSuccess("Users added successfully!"); // Success message
                    setUsers([]); // Clear users list after success
                    // handleFun(); // Callback after success
                } else {
                    const errorData = await res.json();
                    setError(errorData.message || 'Something went wrong!');
                }
            } catch (error) {
                console.error('Error during registration:', error);
                setError('An error occurred. Please try again later.');
            } finally {
                setLoading(false); // End loading
            }
        } else {
            setError('Please select at least one user.');
        }
    }

    return (
        <>
            <div className='people-list' style={{ width: "100%", height: "100%", float: "none" }}>
                <ul className="adduserlist">
                    {allusers.map((user, i) => (
                        <li className="clearfix" key={i}>
                            <div className='row'>
                                <div className='col-9'>
                                    <div className="chat-header clearfix" style={{ padding: '0' }}>
                                        <img src={user.profile_img ? `/uploads/${user.profile_img}` : '/user.png'} alt="avatar" className='profile-pic' />
                                        <div className="about">
                                            <div className="name">{user.username}</div>
                                            <div className="status">
                                                <i className="bi bi-circle-fill online"></i> online
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-3' style={{ alignSelf: "center" }}>
                                    <input
                                        type='checkbox'
                                        style={{ fontSize: "20px" }}
                                        checked={users.includes(user.id)} // Check if user is already selected
                                        onChange={() => handleAddUsers(user.id)} // Toggle user selection
                                    />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                {error && <div className="alert alert-danger">{error}</div>} {/* Show error message */}
                {success && <div className="alert alert-success">{success}</div>} {/* Show success message */}

                <div style={{ display: "flex", justifyContent: "end" }}>
                    <button
                        className='btn btn-primary btn-sm'
                        onClick={() => handleUpdateGroup(users, roomid)}
                        // disabled={loading || users.length === 0} // Disable button when loading or no users selected
                    >
                        {loading ? "Adding..." : "Add User"} {/* Show loading state */}
                    </button>
                </div>
            </div>
        </>
    )
}

export default AddUserList;
