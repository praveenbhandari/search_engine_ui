import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RxCross2 } from "react-icons/rx";

const LoginModal = ({ isOpen, onClose, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isNewUser, setIsNewUser] = useState(false);
    const [errors, setErrors] = useState({});
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateEmail = () => {
        if (!email) {
            setEmailError('Email is required');
            return false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Invalid email address');
            return false;
        }
        setEmailError('');
        return true;
    };

    const validatePassword = () => {
        if (!password) {
            setPasswordError('Password is required');
            return false;
        }
        setPasswordError('');
        return true;
    };

    const handleLogin = () => {
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (isEmailValid && isPasswordValid) {
            // Here, you can add your login logic
            // e.g., make an API call to authenticate the user
            // If the login is successful, call the onLogin prop function
            onLogin();
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-backdrop">
            <div className="modal-content" style={{ textAlign: 'center', padding: '20px' }}>
                {/* <RxCross2 size={20} color='red' onClick={onClose} style={{textAlign: 'right'}}/> */}
                <h2>{isNewUser ? 'Sign Up' : 'Log In'}
                {/* <span><RxCross2 size={20} color='red' onClick={onClose} style={{textAlign: 'right'}}/></span> */}
                </h2>
                <p style={{ textAlign: 'left' }}>
                    Email
                    <br />
                    <input
                        type="email"
                        placeholder="abc@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', marginTop: '5px', borderRadius: '5px' }}
                    />
                    {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
                </p>
                <p style={{ textAlign: 'left' }}>
                    Password
                    <br />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', marginTop: '5px', borderRadius: '5px' }}
                    />
                    {passwordError && <span style={{ color: 'red' }}>{passwordError}</span>}
                </p>
                <button onClick={handleLogin}
                    style={{
                        width: '150px',
                        padding: '10px',
                        border: 'none',
                        background: '#5c6bc0',
                        color: 'white',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        marginTop: '10px'
                    }}>
                    {isNewUser ? 'Sign Up' : 'Log In'}
                </button>
                {!isNewUser && <p style={{ marginTop: '10px' }}>Don't have an account? <span style={{ marginTop: '10px', cursor: 'pointer' }} onClick={() => setIsNewUser(true)}>Sign Up</span></p>}
                {isNewUser && <p style={{ marginTop: '10px' }}>Already have an account? <span style={{ marginTop: '10px', cursor: 'pointer' }} onClick={() => setIsNewUser(false)}>Log In</span></p>}
                <p style={{ marginTop: '10px', cursor: 'pointer' }} onClick={onClose}>Cancel</p>
            </div>
        </div >
    );
};

LoginModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
};

export default LoginModal;