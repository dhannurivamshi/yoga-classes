import React, { useState } from 'react';
import './AdmissionForm.css';

// Assuming a simple implementation for submitFormToAPI
const submitFormToAPI = async (formData) => {
  try {
    const response = await fetch('http://localhost:5000/enroll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
};

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    selectedBatch: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call your REST API here to submit the form data
      const response = await submitFormToAPI(formData);

      // Display a success message
      window.alert('Your details have been uploaded successfully!');

      // Reset the form state for new entries
      setFormData({
        name: '',
        age: '',
        selectedBatch: '',
      });
    } catch (error) {
      // Handle error, if any
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Age:
        <input type="number" name="age" value={formData.age} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Select Batch:
        <select name="selectedBatch" value={formData.selectedBatch} onChange={handleChange} required>
          <option value="">Select Batch</option>
          <option value="6-7AM">6-7AM</option>
          <option value="7-8AM">7-8AM</option>
          <option value="8-9AM">8-9AM</option>
          <option value="5-6PM">5-6PM</option>
        </select>
      </label>
      <br />
      <button type="submit">Enroll</button>
    </form>
  );
};

export default AdmissionForm;
