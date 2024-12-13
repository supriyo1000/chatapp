import React, { useEffect, useRef, useState } from 'react';
import ShowFile from './ShowFile';
import FileSend from './filesend'; // Ensure the correct import for the FileSend component
import Picker from '@emoji-mart/react';

const SendMessage = ({ id, recipientId, recipientType, setMessages, setIsFile }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [message, setMessage] = useState('');
    const [files, setFiles] = useState([]); // Store files here
    const emojiRef = useRef();
    const fileInputRef = useRef(null);

    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    console.log('files:', files);

    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Get the selected file
        if (file) {
            setFiles((prevFiles) => [
                ...prevFiles,
                {
                    fileName: file.name,
                    fileUrl: URL.createObjectURL(file), // This creates a URL for the file for display
                    fileSize: `${(file.size / 1024).toFixed(2)} KB`, // Display size in KB
                    fileData: file, // Store the file data itself for later use
                },
            ]);
            setIsFile(true);
        }
    };

    const handleRemoveFile = (fileName) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file.fileName !== fileName));
    };

    const handleEmojiSelect = (emoji) => {
        setMessage((prevMessage) => prevMessage + emoji.native); // Append emoji to message
    };

    const sendPrivateMessage = () => {
        if (message.trim() && id && recipientId) {
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
                message: message,
            });

            setMessage('');
        }
    };

    const sendFiles = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fromUserId', fromUserId);
        formData.append('message', message);
        formData.append('recipientId', recipientId);
        formData.append('recipientType', recipientType);

        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        try {
            const response = await axios.post('/uploadMultiple', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                // Emit file URLs to the target user
                socket.emit('sendMessage', {
                    fromUserId,
                    toUserId,
                    message,
                    fileUrls: response.data.fileUrls,
                    fileType: 'files'
                });
                setFiles([]);
                setMessage('');
            }
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };

    useEffect(() => {
        if (files.length === 0) {
            setIsFile(false);
        }
    }, [files])

    // Close the UsersList when clicking outside the search box
    useEffect(() => {

        const showEmoji = (event) => {
            if (emojiRef.current && !emojiRef.current.contains(event.target)) {
                setShowEmojiPicker(false);
            }
        };

        document.addEventListener('mousedown', showEmoji);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', showEmoji);
        };
    }, []);

    return (
        <div className="row">
            <div className="col-12">
                {/* Display files if they exist */}
                <div style={{ display: "flex" }}>
                    {files.length > 0 && (
                        <ShowFile files={files} onRemove={handleRemoveFile} />
                    )}
                </div>
            </div>
            <div className="col-12">
                <div className="chat-box-tray search" style={{ position: 'relative' }}>
                    <div className="chat-emoji" style={{ position: 'absolute', bottom: '5em' }} ref={emojiRef}>
                        {showEmojiPicker && <Picker onEmojiSelect={handleEmojiSelect} />}
                    </div>

                    <FileSend text="Choose an emoji">
                        <i className="bi bi-emoji-smile-fill" onClick={() => setShowEmojiPicker(!showEmojiPicker)}></i>
                    </FileSend>

                    <input
                        type="text"
                        style={{ width: '80%', borderRadius: '30px', border: 'none' }}
                        value={message}
                        placeholder="Type your message here..."
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <FileSend text="Attach a file">
                        <i className="bi bi-card-image" onClick={handleIconClick}></i>
                    </FileSend>

                    <i
                        className="bi bi-send-fill myBtn"
                        onClick={recipientType === 'list' ? sendPrivateMessage : sendGroupMessage}
                    ></i>
                </div>

                {/* Hidden file input element */}
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }} // Hide the file input
                    onChange={handleFileChange}
                />
            </div>
        </div>
    );
};

export default SendMessage;
