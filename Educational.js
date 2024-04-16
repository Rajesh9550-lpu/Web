import React, { useState } from 'react';
import './EducationalInfoForm.css';
import axios from 'axios';
import NavigationBar from './NavigationBar';
import NavigationBarSA from './NavigationBarSA';
import { useNavigate } from 'react-router-dom';
import { useAdminContext } from './AdminContext'; // Import useAdminContext hook

const Educational = () => {
  const { adminType } = useAdminContext(); // Access the adminType from the context

  const [formData, setFormData] = useState({
    HEA: '',
    NOEI: '',
    GPA: '',
    Certificate: '',
    DOD: '',
    Specialization: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log("Inside the loop:",formData);
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/', formData);
      console.log(response.data); // Log the response data if needed
      // Optionally, you can redirect the user or show a success message here
    } catch (error) {
      console.error('Error occurred while submitting form:', error);
    }
  };

  const navigate = useNavigate(); // Get the navigate function

  const handleNextPageClick = () => {
    navigate('/professional'); // Navigate to the /educational route
  };

  return (
    <div>
      {adminType === 'superadmin' ?  <NavigationBarSA />:<NavigationBar /> } {/* Conditional rendering based on adminType */}
      <div className="user-details-form-container">
        <h2>Educational Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="highestEducation">Highest Education Attained:</label>
            <input type="text" id="highestEducation" name="HEA" value={formData.HEA} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="institutionName">Name of Educational Institution:</label>
            <input type="text" id="institutionName" name="NOEI" value={formData.NOEI} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="gpa">Grade Point Average (GPA):</label>
            <input type="number" id="gpa" name="GPA" value={formData.GPA} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="degreeType">Type of Degree or Certificate Earned:</label>
            <input type="text" id="degreeType" name="Certificate" value={formData.Certificate} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="completionDate">Date of Degree/Certificate Completion or Expected Completion:</label>
            <input type="date" id="completionDate" name="DOD" value={formData.DOD} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="fieldOfStudy">Field of Study or Specialization:</label>
            <input type="text" id="fieldOfStudy" name="Specialization" value={formData.Specialization} onChange={handleChange} />
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

export default Educational;
