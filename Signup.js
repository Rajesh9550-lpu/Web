import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';

function Signup() {
    const [formData, setFormData] = useState({
        Name: '',
        Email: '',
        Password: '',
        AdminType: 'admin' // Default value for admin type dropdown
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});


    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit1 = (e) => {
        e.preventDefault();
        console.log(formData);
        setErrors(Validation(formData));

        if (errors.Name === "" && errors.Email === "") { // Check if there are no errors
            console.log("There are no errors")
        } else {
            axios.post('http://localhost:8081/signup', formData)
                .then(res => {
                    navigate('/');
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Signup</h2>
                <form onSubmit={handleSubmit1}>
                    <div className="form-group">
                        <label htmlFor="Name"><strong>Name</strong></label>
                        <input type="text" id="Name" placeholder="Enter Name" name='Name' onChange={handleChange} />
                        {errors.Name && <span className='text-danger'>{errors.Name}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="Email"><strong>Email</strong></label>
                        <input type="email" id="Email" placeholder="Enter Email" name='Email' onChange={handleChange} autoComplete="email" />
                        {errors.Email && <span className='text-danger'>{errors.Email}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="Password"><strong>Password</strong></label>
                        <input type="password" id="Password" placeholder="Enter Password" name='Password' onChange={handleChange} autoComplete="current-password" />
                        {errors.Password && <span className='text-danger'>{errors.Password}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="AdminType"><strong>Admin Type</strong></label>
                        <select id="AdminType" name='AdminType' onChange={handleChange} value={formData.AdminType}>
                            <option value="admin">Admin</option>
                            <option value="superadmin">Super Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success">Sign up</button>
                    <p className="terms">You are agreeing to our terms and policies</p>
                    <Link to="/" className="btn btn-create-account">Login in</Link>
                </form>
            </div>
        </div>
    );
}

export default Signup;
