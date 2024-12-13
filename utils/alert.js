import React, { useState, useEffect } from "react";
import "./alert.css";

const Alert = ({ message,alertType, showAlert, setShowAlert }) => {
    // Automatically hide the alert after 2 seconds
    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false); // Hide the alert after 2 seconds
            }, 3000);

            // Cleanup the timeout if the component is unmounted or showAlert changes
            return () => clearTimeout(timer);
        }
    }, [showAlert, setShowAlert]); // Dependency on showAlert

    return (
        <>
            {showAlert && (
                <div className="alert-container">
                    <div className={`alert ${alertType === 'success' ? 'alert-success' : alertType === "warning" ? 'alert-"warning' : "alert-danger"} alert-dismissible fade show`}>
                        {message}
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setShowAlert(false)} // Close the alert manually
                        ></button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Alert;
