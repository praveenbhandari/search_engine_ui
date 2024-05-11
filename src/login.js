import axios from 'axios';
import React, { useState } from 'react';

const LoginModal = ({ show, handleLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState("New York");
    const [countryCode, setCountryCode] = useState('+91'); 
    const locations = ["New York", "London", "Mumbai", "Tokyo", "Sydney"];
   
    const backend_url= "https://bayvion.cloud"
    const handleSubmit= async(event) => {
        event.preventDefault();
        // console.log(name,email,phone)
        const fullPhone = `${countryCode}${phone}`; // Combine country code and phone number
    
        const response = await axios.post(backend_url+'/login', {name: name,email:email,phone:fullPhone,location:location});
        console.log("response",response.data.message)
        // if (response.data.message == 0){
        //     console.log("serooo")
        //     handleLogin({ name, email, phone, location });
        // }else{
            console.log("btich", name, email, fullPhone, location, response.data.message)

            handleLogin({ name, email, fullPhone, location, user_id: response.data.message });
       
        // }
        console.log("Session Storage Set:", sessionStorage.getItem('user'));


        // Perform login validation here or call an API
        // Close modal on successful login
    };

    if (!show) {
        return null;
    }

  
    return (
        <div className="login_modal" >
            <div className="login_modal-content" onClick={e => e.stopPropagation()}>
                {/* <div className="login_modal-header"> */}
                   <center><h2 className="login_modal-title">Login/Signup</h2></center> 
                {/* </div> */}
                <div className="login_modal-body">
                    <form onSubmit={handleSubmit} className="login_form">
                        <div className="form_group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required />
                        </div>
                        <div className="form_group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                        {/* <div className="form_group">
                            <label htmlFor="phone">Phone:</label>
                            <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} required />
                        </div> */}

                            <div style={{ display: 'flex' }}>
                                <select value={countryCode} onChange={e => setCountryCode(e.target.value)} style={{ width: '30%', marginRight: '10px' }}>
                                    <option value="+1">+1 USA</option>
                                    <option value="+44">+44 UK</option>
                                    <option value="+91">+91 India</option>
                                    <option value="+61">+61 Australia</option>
                                    <option value="+81">+81 Japan</option>
                                </select>
                                <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} maxLength="10" required placeholder="Enter phone number" style={{ width: '70%' }} />
                            </div>
                            <div className="form_group">
                                <label htmlFor="location">Location:</label>
                                <select id="location" value={location} onChange={e => setLocation(e.target.value)} required>
                                    {locations.map((loc, index) => (
                                        <option key={index} value={loc}>{loc}</option>
                                    ))}
                                </select>
                            </div>
                        <button type="submit" className="login_button">Login</button>
                    </form>
                </div>
                {/* <div className="login_modal-footer">
                    <button  className="close_button">Close</button>
                </div> */}
            </div>
        </div>
    );
};

export default LoginModal;
