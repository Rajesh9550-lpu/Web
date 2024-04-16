import React, { useState } from 'react';
import './PersonalDetailsForm.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import axios from 'axios';
import NavigationBar from './NavigationBar';
import NavigationBarSA from './NavigationBarSA';
const Personal = () => {

  const [formData, setFormData] = useState({
    Name: '',
    Age: '',
    DOB: '',
    Sex: '',
    Address: '',
    Email: '',
    Phone: '',
    AdharNumber: '',
    PanNumber: ''
  });

  const navigate = useNavigate(); // Get the navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/personal', formData);
      console.log(response.data); // Log the response data if needed
      // Optionally, you can redirect the user or show a success message here
    } catch (error) {
      console.error('Error occurred while submitting form:', error);
    }
  };

  const handleNextPageClick = () => {
    navigate('/educational'); // Navigate to the /educational route
  };

  return (
    <div>

    <div className="user-details-form-container">
      <h2>Personal Details Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="Name" value={formData.Name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" name="Age" value={formData.Age} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input type="date" id="dateOfBirth" name="DOB" value={formData.DOB} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="sex">Sex:</label>
          <select id="sex" name="Sex" value={formData.Sex} onChange={handleChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea id="address" name="Address" value={formData.Address} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="Email" value={formData.Email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" name="Phone" value={formData.Phone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="adharNumber">Adhar Number:</label>
          <input type="number" id="adharNumber" name="AdharNumber" value={formData.AdharNumber} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="panNumber">PAN Number:</label>
          <input type="text" id="panNumber" name="PanNumber" value={formData.PanNumber} onChange={handleChange} />
        </div>
        <div className="buttons-container">
          <button type="submit" className="submit-button">Submit</button>
          <button type="button" className="next-page-button" onClick={handleNextPageClick}>Next Page</button>
        </div>
      </form>
    </div>
    </div>

  );
};

export default Personal;
