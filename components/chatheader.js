import React, { useEffect, useRef, useState } from 'react';
import PopoverData from './popover';
import AddUserList from './adduserlist';
import UsersList from './userslist';

const ChatHeader = ({ id, userdetails, allusers, handlefun, handlefun2 }) => {

    const [isCloseList, setIsCloseList] = useState(false);
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const listref = useRef(null);

    const handleCloseList = () => {
            setIsCloseList(!isCloseList);
    };

    console.log('ChatHeader', userdetails);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (listref.current && !listref.current.contains(event.target)) {
                setIsCloseList(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // useEffect(() => {
    //     const updateDimensions = () => {
    //         setHeight(window.innerHeight);
    //         setWidth(window.innerWidth);
    //     };

    //     updateDimensions(); // Set initial dimensions

    //     window.addEventListener('resize', updateDimensions);

    //     return () => {
    //         window.removeEventListener('resize', updateDimensions); // Cleanup on unmount
    //     };
    // }, []);



    return (
        <>
            <div className="row">
                <div className="col-10">
                    <div className="chat-header clearfix">
                        {/* <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" onClick={() => handlefun(2)} /> */}

                        <img src={userdetails && userdetails.profile_img ? `/uploads/${userdetails.profile_img}` : '/user.png'} alt="avatar" onClick={() => handlefun(2)} />

                        <div className="chat-about">
                            <div className="chat-with">{userdetails && userdetails.name}</div>
                            <div className="chat-num-messages">already 1 902 messages</div>
                        </div>
                        {/* {height}{width} */}
                    </div>
                </div>
                <div className="col-2" style={{ alignSelf: "center", display: "flex", justifyContent: "space-evenly", position: "relative" }}>

                    <PopoverData id={id} userdetails={userdetails} allusers={allusers} handlealluserChange={handlefun2} handleCloseList={handleCloseList} />
                    
                    {isCloseList &&
                        <div style={{ position: "absolute", top: "5em", right: "2em", backgroundColor: "rgb(251, 251, 251)", boxShadow: "0 5px 30px 0 rgba(82, 63, 105, 0.2)", borderRadius: "10px", zIndex:"100" }} ref={listref}>

    
                            <div className='searchbox' style={{ minWidth: "370px" }}>
                                <div className="search">
                                    <input type="text" placeholder="search"/>
                                </div>
                                <AddUserList roomid={userdetails.id} allusers={allusers} />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default ChatHeader