import React, { useState } from 'react';
import './PersonalDetailsForm.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from './NavigationBar';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { useAdminContext } from './AdminContext'; // Import useAdminContext hook
import NavigationBarSA from './NavigationBarSA';
const Professional = () => {
  const { adminType } = useAdminContext(); // Access the adminType from the context

  const [formData, setFormData] = useState({
     CompanyName: '', StartDate: '', EndDate: '', Position: '', Responsibilities: '', Domain: '' ,
     CES: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log("Inside the loop:",formData);
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/professional', formData);
      console.log(response.data); // Log the response data if needed
      // Optionally, you can redirect the user or show a success message here
    } catch (error) {
      console.error('Error occurred while submitting form:', error);
    }
  };

  const navigate = useNavigate(); // Get the navigate function
  const handleNextPageClick = () => {
    navigate('/documents'); // Navigate to the /educational route
  };

  console.log()
  return (
    <div>
      {adminType === 'superadmin' ?  <NavigationBarSA />:<NavigationBar /> } {/* Conditional rendering based on adminType */}
    <div className="user-details-form-container">
      <h2>Professional Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="employer-section">
          <h3>Employer</h3>
          <div className="form-group">
            <label htmlFor="companyName">Company Name:</label>
            <input type="text" id="CompanyName" name="CompanyName" value={formData.CompanyName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input type="date" id="StartDate" name="StartDate" value={formData.StartDate} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input type="date" id="EndDate" name="EndDate" value={formData.EndDate} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="position">Position:</label>
            <input type="text" id="Position" name="Position" value={formData.Position} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="responsibilities">Responsibilities:</label>
            <textarea id="Responsibilities" name="Responsibilities" value={formData.Responsibilities} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="domain">Domain:</label>
            <input type="text" id="Domain" name="Domain" value={formData.Domain} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="currentEmploymentStatus">Current Employment Status:</label>
          <input type="text" id="CES" name="currentEmploymentStatus" value={formData.currentEmploymentStatus} onChange={handleChange} />
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

export default Professional;
