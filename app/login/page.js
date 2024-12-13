'use client'
import React, { useEffect, useState } from 'react';
import "./login.css";
import { useRouter } from 'next/navigation';
import ipAddress from "../ipconfig";
import { getSocket } from "../../utils/socketconn";
import Cookies from 'js-cookie';  // Import js-cookie library
import Alert from '../../utils/alert';
import Loading from '../../utils/loading';

const Login = () => {
    const [islogin, setIsLoggin] = useState(true); // Default to login
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('success');
    const [alertMsg, setAlertMsg] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');

    const socket = getSocket(); // Get the socket instance
    const router = useRouter(); // Ensure this is used client-side only


    const loginRegister = async (mode, mail, fname, pass) => {

        console.log(mode, mail, fname, pass);
        const isEndUser = Cookies.get('endUser') ? JSON.parse(Cookies.get('endUser')) : '';


        if (mode === 0) {
            if (!mail.length || !fname.length || !pass.length) {
                alert('Please fill in all fields!');
                return;
            }

            // Send POST request for signup
            try {
                setLoading(true);
                const res = await fetch('api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Correct header
                    },
                    body: JSON.stringify({ email: mail, name: fname, password: pass }), // Stringify the body
                });

                // Check if the response status is successful (200-299)
                if (res.ok) {
                    setLoading(false);
                    setEmail(''); setName(''); setPass('');
                    isEndUser && Cookies.remove('endUser');
                    setAlertMsg('Registration successful!!');
                    setAlertType('success');
                    setShowAlert(true);
                    setIsLoggin(true);
                } else {
                    setLoading(false);
                    const errorData = await res.json();
                    setAlertMsg(errorData.message || 'Something went wrong!');
                    setAlertType('danger');
                    setShowAlert(true);
                }
            } catch (error) {
                console.error('Error during registration:', error);
                alert('An error occurred. Please try again later.');
            }
        }
        else if (mode === 1) {
            if (!mail.length || !pass.length) {
                alert('Please fill in all login fields!');
                return; ``
            }

            // Send POST request for signup
            try {
                setLoading(true);
                const res = await fetch('api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Correct header
                    },
                    body: JSON.stringify({ email: mail, password: pass }), // Stringify the body
                });

                if (res.ok) {
                    setLoading(false);
                    const data = await res.json(); // Parse the JSON response
                    const { userdetails } = data;
                    const user = await userdetails[0];
                    console.log('userdetails', userdetails);

                    // Ensure socket is available before emitting
                    if (socket) {
                        console.log("userid", user.id, typeof (user.id));

                        console.log('socket is available', socket);
                        socket.emit('register', user.id); // Register the socket with the user ID
                    }
                    setEmail(''); setPass('');
                    setAlertMsg('Login successful!!');
                    setAlertType('success');
                    setShowAlert(true);
                    // alert('Registration successful! You can now log in.');
                    router.push(`/chat?id=${user.id}&mail=${user.email}&username=${user.username}`);
                } else {
                    setLoading(false);
                    const errorData = await res.json();
                    setAlertMsg(errorData.message || 'Something went wrong!');
                    setAlertType('danger');
                    setShowAlert(true);
                }
            } catch (error) {
                console.error('Error during registration:', error);
                setAlertMsg('An error occurred. Please try again later.');
                setAlertType('danger');
                setShowAlert(true);
            }
        }
    };

    return (
        <>
            <Alert message={alertMsg} alertType={alertType} showAlert={showAlert} setShowAlert={setShowAlert} />

            {loading && <Loading />}

            <div className={islogin ? "container" : "container active"}>
                <div className="form-box login">
                    <form action="#">
                        <h1>Login</h1>
                        <div className="input-box">
                            <input
                                type="email"
                                placeholder="Email Address"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <i className='bx bxs-user'></i>
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                onChange={(e) => setPass(e.target.value)}
                            />
                            <i className='bx bxs-lock-alt'></i>
                        </div>
                        <div className="forgot-link">
                            <a href="#">Forgot Password?</a>
                        </div>
                        <button
                            type="button"
                            className="btn"
                            onClick={() => loginRegister(1, email, '', pass)}
                        >
                            Login
                        </button>
                        <p>or login with social platforms</p>
                        <div className="social-icons">
                            <a href="#"><i className="bi bi-google"></i></a>
                            <a href="#"><i className="bi bi-facebook"></i></a>
                            <a href="#"><i className="bi bi-github"></i></a>
                            <a href="#"><i className="bi bi-linkedin"></i></a>
                        </div>
                    </form>
                </div>

                <div className="form-box register">
                    <form action="#">
                        <h1>Registration</h1>
                        <div className="input-box">
                            <input
                                type="email"
                                placeholder="Email Address"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <i className='bx bxs-user'></i>
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                placeholder="Full Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <i className='bx bxs-envelope'></i>
                        </div>

                        <div className="input-box">
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                            />
                            <i className='bx bxs-lock-alt'></i>
                        </div>

                        <button
                            type="button"
                            className="btn"
                            onClick={() => loginRegister(0, email, name, pass)}
                        >
                            Register
                        </button>
                        <p>or register with social platforms</p>
                        <div className="social-icons">
                            <a href="#"><i className="bi bi-google"></i></a>
                            <a href="#"><i className="bi bi-facebook"></i></a>
                            <a href="#"><i className="bi bi-github"></i></a>
                            <a href="#"><i className="bi bi-linkedin"></i></a>
                        </div>
                    </form>
                </div>

                <div className="toggle-box">
                    <div className="toggle-panel toggle-left">
                        <h1>Hello, Welcome!</h1>
                        <p>Don't have an account?</p>
                        <button
                            className="btn register-btn"
                            onClick={() => setIsLoggin(false)}
                        >
                            Register
                        </button>
                    </div>

                    <div className="toggle-panel toggle-right">
                        <h1>Welcome Back!</h1>
                        <p>Already have an account?</p>
                        <button
                            className="btn login-btn"
                            onClick={() => setIsLoggin(true)}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
