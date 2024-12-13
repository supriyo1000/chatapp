'use client'

import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';  // Import js-cookie library
import ProfileModal from "../../components/profilemodal";
import UserProfileModal from "../../components/userprofilemodal";
import PopoverData from "../../components/popover";
import UsersList from "../../components/userslist";
import ChatHeader from "../../components/chatheader";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react';
import ipAddress from "../ipconfig";
import { getSocket } from '../../utils/socketconn';
import FileSend from "../../components/filesend";
import SendMessage from "../../components/sendmessage";

export default function Home() {

    const searchParams = useSearchParams()
    const messagesEndRef = useRef(null); // This ref will help scroll to the bottom
    const emojiRef = useRef(); // This
    const socket = getSocket(); // Get the socket instance

    // Retrieve individual query parameters
    const id = searchParams.get('id');
    const mail = searchParams.get('mail');
    const username = searchParams.get('username');

    const [mydetails, setMydetails] = useState([]);
    const [profileImg, setProfileImg] = useState('');
    const [chatList, setChatList] = useState([]);
    const [userdetails, setUserdetails] = useState({});
    const [allUsers, setAllUsers] = useState([]); // State to store users
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [isProfileModal, setIsProfileModal] = useState(false);
    const [isUserProfileModal, setIsUserProfileModal] = useState(false);

    const [userId, setUserId] = useState('');
    const [isUpdateAllUser, setIsUpdateAllUser] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [recipientId, setRecipientId] = useState('');
    const [recipientType, setRecipientType] = useState('list');
    const [userListview, setUserListview] = useState(false);
    const [isFile, setIsFile] = useState(false);

    const handleEmojiSelect = (emoji) => {
        setMessage((prevMessage) => prevMessage + emoji.native); // Append selected emoji to message
    };

    // console.log("height", window.innerHeight, window.innerWidth);


    const handleUserDetails = (data, allUsersArr) => {
        const details = data && {
            id: data.id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            country: data.country,
            state: data.state,
            profile_img: data.profile_img,
            timeStamp: data.timeStamp,
            users: data.users,
            type: data.type,
            allusers: allUsersArr || []
        }
        setUserdetails(details);
    }


    async function getPrevMessages(mode, fuserid, touserid, currentmsgid) {

        if (mode === 1) {
            try {
                // Make the API request with dynamic parameters
                const response = await fetch(
                    `/api/messages/private?fromuserid=${parseInt(fuserid)}&touserid=${touserid}&currentmsgid=${currentmsgid}`
                );

                // Check if the response is OK
                if (!response.ok) {
                    throw new Error('Failed to fetch messages');
                }
                // Parse the JSON response
                const data = await response.json();
                const updatedData = await data.sort((a, b) => a.message_id - b.message_id);
                setMessages(updatedData);

                // console.log('data received', data);


            } catch (error) {
                // Handle errors (e.g., network issues, invalid data)
                // console.error('Error fetching messages:', error);
            }
        }
        else {
            try {
                // Make the API request with dynamic parameters
                const response = await fetch(
                    `http://${ipAddress}:3000/api/messages/group?fromuserid=${parseInt(fuserid)}&touserid=${touserid}&currentmsgid=${currentmsgid}`
                );
                // Check if the response is OK
                if (!response.ok) {
                    throw new Error('Failed to fetch messages');
                }
                // Parse the JSON response
                const data = await response.json();
                const updatedData = await data.sort((a, b) => a.message_id - b.message_id);
                setMessages(updatedData);

            } catch (error) {
                // Handle errors (e.g., network issues, invalid data)
                // console.error('Error fetching messages:', error);
            }
        }
    }

    // console.log('messages:', messages);
    // console.log('details', userdetails);
    // console.log('allusers:', allUsers);
    // console.log('chatlist:', chatList);





    const handleChatList = async (mode, rid) => {

        // console.log('i am calling');

        const isEndUser = Cookies.get('endUser') ? JSON.parse(Cookies.get('endUser')) : '';

        const response = await fetch(`/api/chatList/getchatlist?fromuserid=${id}`).then(res => res.json());
        setChatList(response);
        setUserListview(false);
        const details = isEndUser && response.filter(user => user.id === parseInt(isEndUser.id));
        const allusersArray = allUsers && allUsers.map(user => ({
            id: user.id,
            username: user.username
        }));
        if (mode === 1) {
            details && handleUserDetails(details[0], allusersArray);
        } else {
            if (details.length > 0 && rid) {
                // Exclude the user with 'rid'
                const filteredDetails = details.filter(user => user.id !== rid);
                // console.log('Filtered Details', filteredDetails);

                if (filteredDetails.length > 0) {
                    handleUserDetails(filteredDetails[0], allusersArray);
                }
                else {
                    alert("no data found")
                }
            }
        }

    }

    useEffect(() => {
        // Reload the page only once when the component is mounted
        if (!sessionStorage.getItem('reloadDone')) {
            sessionStorage.setItem('reloadDone', 'true');
            window.location.reload();
        }
    }, []);


    useEffect(() => {
        // Check for existing 'endUser' cookie
        const isEndUser = Cookies.get('endUser') ? JSON.parse(Cookies.get('endUser')) : '';
        // When the component mounts or when the socket reconnects, register the user again
        if (socket) {
            socket.emit('register', id);  // Emit the 'register' event to associate the socket ID with the user
            if (isEndUser.type === 'group') {
                socket.emit('joinRoom', parseInt(isEndUser.id))
            }
        }

        // Clean up the socket connection when the component unmounts
        return () => {
            socket.off('register');
        };
    }, [socket, id]);

    useEffect(() => {
        const fetchMyData = async () => {
            const response = await fetch(`/api/auth/users?mode=${3}&userid=${id}&email=''`);
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setMydetails(data[0]);
        }
        if (id) {
            try {
                fetchMyData();
            } catch (error) {
                // console.log(error);
            }
        }
    }, [id])

    useEffect(() => {
        // Ensure mydetails exists and has at least one item before accessing profile_img
        if (mydetails.length > 0 && mydetails[0].profile_img) {
            setProfileImg(`/uploads/${mydetails[0].profile_img}`);
        }
    }, [mydetails]);

    useEffect(() => {

        if (allUsers.length > 0) {
            handleChatList(1, null);
        }
    }, [isUpdateAllUser, allUsers]);

    const handleCloseModal = (mode) => {
        if (mode === 1) {
            setIsProfileModal(!isProfileModal);
        }
        else if (mode === 2) {
            setIsUserProfileModal(!isUserProfileModal);
        }
    }

    const handleChangeAllUsers = () => {
        setIsUpdateAllUser(!isUpdateAllUser);
    }

    useEffect(() => {
        // Check for existing 'endUser' cookie
        const isEndUser = Cookies.get('endUser') ? JSON.parse(Cookies.get('endUser')) : '';

        // If no 'endUser' cookie is found, set it to the first user in the list
        if (!isEndUser && chatList && chatList.length > 0) {
            setRecipientId(chatList[0].id);
            setRecipientType(chatList[0].type);
            Cookies.set('endUser', JSON.stringify({ id: chatList[0].id, type: chatList[0].type }));
        }
        else if (isEndUser && !recipientId) {
            setRecipientId(parseInt(isEndUser.id));
            setRecipientType(isEndUser.type);
        }
        else if (recipientId && (isEndUser !== recipientId)) {
            // If 'endUser' cookie exists and recipientId changes, update the cookie
            Cookies.set('endUser', JSON.stringify({ id: recipientId, type: recipientType }));
        }
        // Fetch messages if it's the first load or if the recipientId changes
        if (messages.length === 0 && recipientId) {
            // If no messages are loaded, fetch them from the start
            if (recipientType === 'list') {
                getPrevMessages(1, id, recipientId, null);
            }
            else {
                getPrevMessages(2, id, recipientId, null);
            }
        } else if (recipientId) {

            if (recipientType === 'list') {
                getPrevMessages(1, id, recipientId, null);
            }
            else {
                getPrevMessages(2, id, recipientId, null);
            }
        }

    }, [recipientId, chatList]);


    useEffect(() => {
        // Listen for both private and group messages
        socket.on('privateMessage', (data) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { from_user_id: data.fromUserId, to_user_id: data.toUserId, message: data.message, timestamp: new Date().toISOString() },
            ]);
            // console.log('Incoming private message:', data.message);
        });

        socket.on('groupMessage', (data) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { fromUserId: data.fromUserId, message: data.message, isIncoming: true, room_id: data.roomId, timestamp: new Date().toISOString() },
            ]);
            // console.log('Received group message:', data.message);
        });

        // Clean up listeners when component unmounts
        return () => {
            socket.off('privateMessage');
            socket.off('groupMessage');
        };
    }, []);  // Empty dependency array means it runs only once when the component mounts and unmounts

    useEffect(() => {
        // Scroll to the bottom when messages are updated
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const sendPrivateMessage = () => {

        if (message.trim() && id && recipientId) {
            // console.log("id && recipientId", id, recipientId);

            socket.emit('privateMessage', {
                fromUserId: parseInt(id),
                toUserId: recipientId,
                message: message,
            });

            setMessages((prevMessages) => [
                ...prevMessages,
                { from_user_id: parseInt(id), to_user_id: recipientId, message: message, timestamp: new Date().toISOString() },
            ]);
            setMessage('');
        }
    };

    const sendGroupMessage = () => {
        if (message.trim()) {
            socket.emit('groupMessage', {
                fromUserId: parseInt(id),
                roomId: recipientId,
                message: message
            });

            // setMessages((prevMessages) => [
            //     ...prevMessages,
            //     { from_user_id: parseInt(id), room_id: recipientId, message: message },
            // ]);
            setMessage('');
        }
    };

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const response = await fetch(`/api/auth/users?mode=${1}&userid=''&email=''`);
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                const updatedData = data && Array.isArray(data) && data.filter(user => user.email !== mail);
                setAllUsers(updatedData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const searchBoxRef = useRef(null);

    // Close the UsersList when clicking outside the search box
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
                setUserListview(false);
            }
        };

        const showEmoji = (event) => {
            if (emojiRef.current && !emojiRef.current.contains(event.target)) {
                setShowEmojiPicker(false);
            }
        };

        const handleKeyPress = (event) => {
            if (event.key === "Enter") {
                event.preventDefault();  // Prevents default form submission (if any)
                if (recipientType === 'list') {
                    sendPrivateMessage();  // Call private message function
                } else {
                    sendGroupMessage();    // Call group message function
                }
            }
        };

        // Add event listener for keydown (or keyup, keypress)
        document.addEventListener("keyup", handleKeyPress);

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('mousedown', showEmoji);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('mousedown', showEmoji);
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    // console.log('recipient', recipientId);
    // console.log('usertype', recipientType);



    if (loading) return <div>Loading...</div>;

    return (
        <>
            <div className="containers clearfix">

                <div className="people-list" id="people-list">

                    <div className="row">
                        <div className="col-12">
                            <div className="chat-header clearfix">
                                <img
                                    src={profileImg ? profileImg : '/user.png'}
                                    alt="avatar"
                                    className="profile-pic"
                                    onClick={() => handleCloseModal(1)}
                                />

                                <div className="about">
                                    <div className="name">{username}</div>
                                    <div className="status">
                                        <i className="bi bi-circle-fill online"></i> online
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {userListview ? <div className='searchbox' ref={searchBoxRef}>
                        <div className="search">
                            <input type="text" placeholder="search" onClick={() => setUserListview(true)} />
                        </div>
                        <UsersList id={id} allusers={allUsers} handleFun={handleChatList} setRecipientId={setRecipientId} setRecipientType={setRecipientType} />
                    </div> : <div className="search" ref={searchBoxRef}>
                        <input type="text" placeholder="search" onClick={() => setUserListview(true)} />
                    </div>}

                    <ul className="list">
                        {chatList && chatList
                            .sort((a, b) => {
                                // Parse the `timeStamp` fields into Date objects for comparison
                                const timeA = new Date(a.timeStamp);
                                const timeB = new Date(b.timeStamp);

                                return timeB - timeA;  // Sort in descending order (latest first)
                            })
                            .map((user, i) => (
                                <li className="clearfix" key={i} onClick={() => {
                                    setRecipientId(`${user.id}`);
                                    setRecipientType(user.type);
                                    user.type === 'group' ? socket.emit('joinRoom', `${user.id}`) : null;
                                    const allusersArray = allUsers && allUsers.map(user => ({
                                        id: user.id,
                                        username: user.username
                                    }));
                                    handleUserDetails(user, allusersArray);
                                }}>
                                    <img src={user.profile_img ? `/uploads/${user.profile_img}` : '/user.png'} alt="avatar" className='profile-pic' onClick={() => handleCloseModal(2)} />
                                    <div className="about">
                                        <div className="name">{user.name}</div>
                                        <div className="status">
                                            <i className="bi bi-circle-fill online"></i> online
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>

                <div className="chat">
                    {Cookies.get('endUser') ?
                        <>
                            <ChatHeader id={id} userdetails={userdetails} allusers={allUsers} handlefun={handleCloseModal} handlefun2={handleChangeAllUsers} />


                            <div className="chat-history" style={{ height: `calc(100vh - ${isFile ?'250px' : '200px'})`}}>
                                {recipientId ?
                                    <ul>
                                        {messages && Array.isArray(messages) && messages.map((msg, i) => {

                                            if (recipientType === 'list' && (parseInt(msg.to_user_id) === parseInt(recipientId) || parseInt(msg.from_user_id) === parseInt(recipientId)) || recipientType === 'group' && (parseInt(msg.room_id) === parseInt(recipientId))) {
                                                if (parseInt(msg.from_user_id) === parseInt(id)) {
                                                    return (
                                                        <li key={i}>
                                                            <div className="message-data">
                                                                <span className="message-data-name"><i className="fa fa-circle online"></i> {username}</span>
                                                                <span className="message-data-time">{new Date(msg.timestamp).toLocaleString()}</span>
                                                            </div>
                                                            <div className="message my-message">
                                                                {msg.message}
                                                            </div>
                                                        </li>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <li className="clearfix" key={i}>
                                                            <div className="message-data align-right">
                                                                <span className="message-data-time" >{new Date(msg.timestamp).toLocaleString()}</span> &nbsp; &nbsp;
                                                                <span className="message-data-name" >
                                                                    {recipientType === "list"
                                                                        ? userdetails && userdetails.name
                                                                        : allUsers && allUsers.filter((user) => user.id === msg.from_user_id)[0]?.username // Ensure it accesses the first match and safely checks for existence
                                                                    }
                                                                </span> <i className="fa fa-circle me"></i>

                                                            </div>
                                                            <div className="message other-message float-right">
                                                                {msg.message}
                                                            </div>
                                                        </li>
                                                    )
                                                }
                                            }
                                        })}

                                    </ul> : <div>choose </div>
                                }

                                <div ref={messagesEndRef} />
                            </div>


                            {/* <div className="row">
                                <div className="col-12">
                                    <div className="chat-box-tray search" style={{ position: "relative" }}>
                                        <div className='chat-emoji' style={{ position: "absolute", bottom: "5em" }} ref={emojiRef}>
                                            {showEmojiPicker && (
                                                <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                                            )}
                                        </div>
                                        <FileSend text='Choose an emoji'>
                                            <i className="bi bi-emoji-smile-fill" onClick={() => setShowEmojiPicker(!showEmojiPicker)}></i>
                                        </FileSend>
                                        <input type="text" style={{ width: "80%", borderRadius: "30px", border: 'none' }} value={message} placeholder="Type your message here..." onChange={(e) => setMessage(e.target.value)} />

                                        <FileSend text='Attach a file'>
                                            <i className="bi bi-card-image"></i>
                                        </FileSend>
                                        <i className="bi bi-send-fill myBtn" onClick={recipientType === 'list' ? sendPrivateMessage : sendGroupMessage}></i>
                                    </div>
                                </div>
                            </div> */}

                            <SendMessage id={id} recipientId={recipientId} recipientType={recipientType} setMessages={setMessages} setIsFile={setIsFile} />
                        </>
                        : <div></div>}
                </div>

                {isProfileModal && <ProfileModal id={id} handlefun={handleCloseModal} />}
                {isUserProfileModal && <UserProfileModal id={recipientId} handlefun={handleCloseModal} />}
            </div>

        </>
    );
}
