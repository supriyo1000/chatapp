import React from 'react';
import "./showfile.css"; // Your custom styles

const ShowFile = ({ files, onRemove }) => {
    

    return (
        <>
            {/* <div style={{ display: "flex" }}> */}
                {files.map((file, index) => (
                    <div className="btcd-f-input" key={index}>
                        <div className="btcd-files">

                            <div>
                                <img
                                    src={file.fileUrl} // Use the object URL generated for preview
                                    alt={file.fileName}
                                    title={file.fileName}
                                />
                                <div>
                                    <span title={file.fileName}>{file.fileName}</span>
                                    <br />
                                    <small>{file.fileSize}</small>
                                </div>
                                <button
                                    type="button"
                                    data-index={index}
                                    title="Remove This File"
                                    onClick={() => onRemove(file.fileName)} // Remove file by name
                                >
                                    <span>×</span>
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            {/* </div> */}
        </>
    );
};

export default ShowFile;
