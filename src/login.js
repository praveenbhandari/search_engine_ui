// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { RxCross2 } from "react-icons/rx";

// const LoginModal = ({ isOpen, onClose, onLogin }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [isNewUser, setIsNewUser] = useState(false);
//     const [errors, setErrors] = useState({});
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');

//     const validateEmail = () => {
//         if (!email) {
//             setEmailError('Email is required');
//             return false;
//         } else if (!/\S+@\S+\.\S+/.test(email)) {
//             setEmailError('Invalid email address');
//             return false;
//         }
//         setEmailError('');
//         return true;
//     };

//     const validatePassword = () => {
//         if (!password) {
//             setPasswordError('Password is required');
//             return false;
//         }
//         setPasswordError('');
//         return true;
//     };

//     const handleLogin = () => {
//         const isEmailValid = validateEmail();
//         const isPasswordValid = validatePassword();

//         if (isEmailValid && isPasswordValid) {
//             // Here, you can add your login logic
//             // e.g., make an API call to authenticate the user
//             // If the login is successful, call the onLogin prop function
//             onLogin();
//         }
//     };

//     if (!isOpen) {
//         return null;
//     }

//     return (
//         <div className="modal-backdrop">
//             <div className="modal-content" style={{ textAlign: 'center', padding: '20px' }}>
//                 {/* <RxCross2 size={20} color='red' onClick={onClose} style={{textAlign: 'right'}}/> */}
//                 <h2>{isNewUser ? 'Sign Up' : 'Log In'}
//                 {/* <span><RxCross2 size={20} color='red' onClick={onClose} style={{textAlign: 'right'}}/></span> */}
//                 </h2>
//                 <p style={{ textAlign: 'left' }}>
//                     Email
//                     <br />
//                     <input
//                         type="email"
//                         placeholder="abc@gmail.com"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         style={{ width: '100%', marginTop: '5px', borderRadius: '5px' }}
//                     />
//                     {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
//                 </p>
//                 <p style={{ textAlign: 'left' }}>
//                     Password
//                     <br />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         style={{ width: '100%', marginTop: '5px', borderRadius: '5px' }}
//                     />
//                     {passwordError && <span style={{ color: 'red' }}>{passwordError}</span>}
//                 </p>
//                 <button onClick={handleLogin}
//                     style={{
//                         width: '150px',
//                         padding: '10px',
//                         border: 'none',
//                         background: '#5c6bc0',
//                         color: 'white',
//                         borderRadius: '20px',
//                         cursor: 'pointer',
//                         fontSize: '16px',
//                         marginTop: '10px'
//                     }}>
//                     {isNewUser ? 'Sign Up' : 'Log In'}
//                 </button>
//                 {!isNewUser && <p style={{ marginTop: '10px' }}>Don't have an account? <span style={{ marginTop: '10px', cursor: 'pointer' }} onClick={() => setIsNewUser(true)}>Sign Up</span></p>}
//                 {isNewUser && <p style={{ marginTop: '10px' }}>Already have an account? <span style={{ marginTop: '10px', cursor: 'pointer' }} onClick={() => setIsNewUser(false)}>Log In</span></p>}
//                 <p style={{ marginTop: '10px', cursor: 'pointer' }} onClick={onClose}>Cancel</p>
//             </div>
//         </div >
//     );
// };

// LoginModal.propTypes = {
//     isOpen: PropTypes.bool.isRequired,
//     onClose: PropTypes.func.isRequired,
//     onLogin: PropTypes.func.isRequired,
// };

// export default LoginModal;


import axios from 'axios';
import React, { useState } from 'react';

const LoginModal = ({ show, handleClose, handleLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit= async(event) => {
        event.preventDefault();
        // console.log(name,email,phone)
        const response = await axios.post('http://localhost:8000/login', {name: name,email:email,phone:phone,location:location});
        console.log("response",response.data.message)
        // if (response.data.message == 0){
        //     console.log("serooo")
        //     handleLogin({ name, email, phone, location });
        // }else{
        //     console.log("btich")
            handleLogin({ name, email, phone, location, user_id: response.data.message });
       
        // }
        console.log("Session Storage Set:", sessionStorage.getItem('user'));


        // Perform login validation here or call an API
        // Close modal on successful login
    };

    if (!show) {
        return null;
    }

    return (
        <div className="login_modal" onClick={handleClose}>
            <div className="login_modal-content" onClick={e => e.stopPropagation()}>
                <div className="login_modal-header">
                    <h4 className="login_modal-title">Login</h4>
                </div>
                <div className="login_modal-body">
                    <form onSubmit={handleSubmit}>
                        <label>
                            Name:
                            <input type="name" value={name} onChange={e => setName(e.target.value)} required />
                        </label>
                        <label>
                            Email:
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </label>
                        <label>
                            Phone:
                            <input type="phone" value={phone} onChange={e => setPhone(e.target.value)} required />
                        </label>
                        <label>
                            Location:
                            <input type="location" value={location} onChange={e => setLocation(e.target.value)} required />
                        </label>
                        
                        <button type="submit">Login</button>
                    </form>
                </div>
                {/* <div className="login_modal-footer">
                    <button onClick={handleClose}>Close</button>
                </div> */}
            </div>
        </div>
    );
};

export default LoginModal;
