
// import Button from 'react-bootstrap/Button';
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
// import Popover from 'react-bootstrap/Popover';
// import CreateGroupModal from "../components/creategroupmodal";
// import { useRef, useState } from 'react';

// function PopoverData({id}) {

//     const [isclosemodal, setIsCloseModal] = useState(false);
//     const [showPopover, setShowPopover] = useState(false);
//     const popoverRef = useRef(null); // Reference to OverlayTrigger

//     const handleFun = () => {
//         setIsCloseModal(!isclosemodal);
//     }

//     const handlePopoverClose = (mode) => {
//         setShowPopover(!showPopover);
//     }

//     return (
//         <>
//             <OverlayTrigger
//                 trigger="click"
//                 key="left"
//                 placement="left"
//                 rootClose={true}
//                 show={showPopover}
//                 overlay={
//                     <Popover id={`popover-positioned-left`}>
//                         {/* <Popover.Header as="h3">{`Popover left`}</Popover.Header> */}
//                         <Popover.Body style={{ cursor: "pointer" }} onClick={() => {
//                             setIsCloseModal(true)
//                             handlePopoverClose()
//                         }
//                         }>
//                             <strong><i className="bi bi-person-fill-add" style={{ fontSize: "20px" }}></i>&nbsp;Create Group</strong>
//                         </Popover.Body>
//                     </Popover>
//                 }
//             // ref={popoverRef} // Attach the popover reference here
//             >
//                 <Button variant="light" onClick={()=>handlePopoverClose(1)}><i className="bi bi-three-dots" style={{ fontSize: "20px" }}></i></Button>
//             </OverlayTrigger>

//             {isclosemodal && <CreateGroupModal id={id} handlefun={handleFun} />}

//         </>
//     );
// }

// export default PopoverData;




import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import CreateGroupModal from "../components/creategroupmodal";
import { useEffect, useRef, useState } from 'react';
import AddUserList from './adduserlist';

function PopoverData({ id, userdetails, handlealluserChange, handleCloseList }) {
    const [isCloseModal, setIsCloseModal] = useState(false);
    const [showPopover, setShowPopover] = useState(false);

    const handleFun = (mode) => {
        if (mode === 1) {
            setIsCloseModal(!isCloseModal);
        } else if (mode === 2) {
            handlealluserChange();
        }

    };

    const handlePopoverClose = () => {
        setShowPopover(false); // Close the popover when clicking the body
    };

    useEffect(() => {
        // const handleClickOutside = (event) => {
        //     if (listref.current && !listref.current.contains(event.target)) {
        //         setIsCloseList(false);
        //     }
        // };

        document.addEventListener('mousedown', handlePopoverClose);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handlePopoverClose);
        };
    }, []);

    return (
        <>
            <OverlayTrigger
                trigger="click"
                key="left"
                placement="left"
                rootClose={true} // Close the popover if clicking outside
                show={showPopover}
                overlay={
                    <Popover id={`popover-positioned-left`}>
                        {/* <Popover.Header as="h3">{`Popover left`}</Popover.Header> */}
                        <Popover.Body
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                if (userdetails.type === 'list') {
                                    setIsCloseModal(true);
                                    handlePopoverClose(); // Close popover after clicking
                                } else {
                                    handleCloseList(); // Close popover
                                }
                                
                            }}
                        >
                            <strong>
                                { userdetails && userdetails.type === 'group' ?
                                    <>
                                        <i className="bi bi-people-fill" style={{ fontSize: "20px" }}></i>
                                        &nbsp; Add User
                                    </> 
                                    :
                                    <>
                                        <i className="bi bi-people-fill" style={{ fontSize: "20px" }}></i>
                                        &nbsp; Create Group
                                    </>
                                    
                                    
                                }
                            </strong>

                        </Popover.Body>
                    </Popover>
                }
            >
                <Button variant="light" onClick={() => setShowPopover(!showPopover)}>
                    <i className="bi bi-three-dots" style={{ fontSize: "20px"}}></i>
                </Button>
            </OverlayTrigger>

            {isCloseModal && <CreateGroupModal id={id} handlefun={handleFun} />}
            {/* <AddUserList allusers={allusers}/> */}
        </>
    );
}

export default PopoverData;
