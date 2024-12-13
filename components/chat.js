// 'use client';

// import { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// export default function Chat() {
//     const [socket, setSocket] = useState(null);
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);

//     useEffect(() => {
//         // Connect to Socket.IO server on port 4000
//         const socketIo = io('/api/socket');

//         // On successful connection, log and set connection status
//         socketIo.on('connect', () => {
//             console.log('Connected to Socket.IO server');
//         });

//         // Listen for messages from the server
//         socketIo.on('message', (data) => {
//             console.log('Message from server:', data);
//             setMessages((prevMessages) => [...prevMessages, data]); // Add message to state
//         });

//         // Store the socket instance
//         setSocket(socketIo);

//         // Cleanup on component unmount
//         return () => {
//             socketIo.disconnect(); // Disconnect socket when component is unmounted
//             console.log('Socket disconnected');
//         };
//     }, []); // Empty dependency array ensures this effect runs once on mount

//     // Send message to server
//     const sendMessage = () => {
//         if (socket && message.trim()) {
//             socket.emit('message', message); // Emit message to the server
//             setMessage(''); // Clear the input after sending
//         }
//     };

//     return (
//         <div>
//             <h2>Chat</h2>
//             <div>
//                 {messages.map((msg, index) => (
//                     <p key={index}>{msg}</p> // Display received messages
//                 ))}
//             </div>
//             <input
//                 type="text"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)} // Update message state
//                 placeholder="Type a message"
//             />
//             <button onClick={sendMessage}>Send</button>
//         </div>
//     );
// }
