import React from 'react';
import "./loading.css";

const Loading = () => {
    return (
        <>
            <div className='loading-container'>
                <div className="pl">
                    <div className="pl__dot pl__dot--a"></div>
                    <div className="pl__dot pl__dot--b"></div>
                    <div className="pl__dot pl__dot--c"></div>
                    <div className="pl__dot pl__dot--d"></div>
                </div>
            </div>
        </>
    )
}

export default Loading