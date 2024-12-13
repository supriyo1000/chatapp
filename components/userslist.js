import "./userslist.css";

function UsersList({ id, allusers, handleFun, setRecipientId, setRecipientType }) {
    
    console.log('allusers', allusers);
    

    const handleUsers = async (id , rid) => {
        try {
            const res = await fetch('api/chatList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Correct header
                },
                body: JSON.stringify({ userid : id, recipientId : rid }), // Stringify the body
            });

            // Check if the response status is successful (200-299)
            if (res.ok) {
                // setRoomName('');
                setRecipientId(rid);
                setRecipientType('list');
                handleFun(2 , rid);
                // alert('Group Created Successfully!!');
                // handlefun(2);
                console.log('ok');
                
            } else {
                const errorData = await res.json();
                alert(errorData.message || 'Something went wrong!');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred. Please try again later.');
        }
    }

    return (
        <ul className="userlist">
            {allusers.map((user, i) => (
                <li className="clearfix" key={i} onClick={()=> handleUsers(id, user.id)}>
                    <div className="chat-header clearfix" style={{ padding: '0' }}>
                        <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400" alt="avatar" className='profile-pic' onClick={() => handleCloseModal(1)} />
                        <div className="about">
                            <div className="name">{user.username}</div>
                            <div className="status">
                                <i className="bi bi-circle-fill online"></i> online
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default UsersList;