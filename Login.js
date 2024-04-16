import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './Loginvalidation';
import axios from 'axios';
import { useAdminContext } from './AdminContext'; // Import the context hook
import './Login.css'

function Login() {
  const { setAdminType } = useAdminContext(); // Access the setAdminType function from the context
  const [formData, setFormData] = useState({
    Email: '',
    Password: '',
    AdminType: 'admin'
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleAdminTypeChange = (e) => {
    const { id, value: AdminValue } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: AdminValue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(formData));
    
    if (errors.Name === "" && errors.Email === "") {
      console.log("There are no errors")
      // Handle form submission without errors
    } else {
      axios.post('http://localhost:8081/login', formData)
        .then(res => {
          if (res.data === "Success") {
            setAdminType(formData.AdminType); // Set the admin type in the context
            if (formData.AdminType === 'admin') {
              navigate('/home');
            } else {
              navigate('/sahome');
            }
          } else {
            alert("No record exists");
          }
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email"><strong>Email</strong></label>
            <input
              type="email"
              id="Email"
              placeholder="Enter Email"
              value={formData.Email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password"><strong>Password</strong></label>
            <input
              type="password"
              id="Password"
              placeholder="Enter Password"
              value={formData.Password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="adminType"><strong>Admin Type</strong></label>
            <select
              id="AdminType"
              value={formData.AdminType}
              onChange={handleAdminTypeChange}
            >
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success">Log in</button>
          <p className="terms">By logging in, you agree to our terms and policies</p>
          <Link to="/signup" className="btn btn-create-account">Create Account</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
