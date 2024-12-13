import React from 'react';
import "./poptop.css";

const FileSend = ({ children , text }) => {
    return (
        <>
            <div>
                <div className='pop-top'>
                    {children}
                    <span>{text}</span>
                </div>
            </div>
        </>
    )
}

export default FileSend;