import React, { useState } from 'react';
import './PersonalDetailsForm.css';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from './NavigationBar';
import { useAdminContext } from './AdminContext'; // Import useAdminContext hook
import NavigationBarSA from './NavigationBarSA';

const Documents = () => {
  const { adminType } = useAdminContext(); // Access the adminType from the context

  const [formData, setFormData] = useState({
    IdenticationD: '',
    BOC: '',
    AVD: '',
    EducationalD: '',
    ProfessionalD: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log("Inside the loop:",formData);
    e.preventDefault();
    // try {
    //   const response = await axios.post('http://localhost:8081/documents', formData);
    //   console.log(response.data); // Log the response data if needed
    //   // Optionally, you can redirect the user or show a success message here
    // } catch (error) {
    //   console.error('Error occurred while submitting form:', error);
    // }
  };

  return (
    <div>
      {adminType === 'superadmin' ?  <NavigationBarSA />:<NavigationBar /> } {/* Conditional rendering based on adminType */}

    <div className="user-details-form-container">
      <h2>Documents</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="IdenticationD">Identification Documents:</label>
          <input type="file" id="IdenticationD" name="IdenticationD"  onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="BOC">Birth Certificate or Proof of Age Document:</label>
          <input type="file" id="BOC" name="BOC" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="AVD">Address Verification Documents:</label>
          <input type="file" id="AVD" name="AVD"  onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="EducationalD">Educational Credentials:</label>
          <input type="file" id="EducationalD" name="EducationalD"  onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="ProfessionalD">Professional Information:</label>
          <input type="file" id="ProfessionalD" name="ProfessionalD"  onChange={handleChange} />
        </div>
        <div className="buttons-container">
          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>
    </div>
    </div>

  );
};

export default Documents;
