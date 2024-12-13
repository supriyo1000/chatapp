// import React from 'react';
// import "../login/login.css";

// const Signup = () => {
//     return (
//         <>
//             <div className="container">
//                 <div className="form-box register">
//                     <form action="#">
//                         <h1>Registration</h1>
//                         <div className="input-box">
//                             <input type="text" placeholder="Username" required />
//                             <i className='bx bxs-user'></i>
//                         </div>
//                         <div className="input-box">
//                             <input type="email" placeholder="Email" required />
//                             <i className='bx bxs-envelope' ></i>
//                         </div>
//                         <div className="input-box">
//                             <input type="password" placeholder="Password" required />
//                             <i className='bx bxs-lock-alt' ></i>
//                         </div>
//                         <button type="submit" className="btn">Register</button>
//                         <p>or register with social platforms</p>
//                         <div className="social-icons">
//                             <a href="#"><i className='bx bxl-google' ></i></a>
//                             <a href="#"><i className='bx bxl-facebook' ></i></a>
//                             <a href="#"><i className='bx bxl-github' ></i></a>
//                             <a href="#"><i className='bx bxl-linkedin' ></i></a>
//                         </div>
//                     </form>
//                 </div>

//                 <div className="toggle-box">
//                     <div className="toggle-panel toggle-right">
//                         <h1>Welcome Back!</h1>
//                         <p>Already have an account?</p>
//                         <button className="btn login-btn">Login</button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Signup





// app/signup/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();

        console.log('signup',email, password , username);
        

        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, username }),
        });

        const data = await res.json();

        if (res.status === 200) {
            router.push('/login');
        } else {
            setError(data.message);
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Signup</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Signup;
