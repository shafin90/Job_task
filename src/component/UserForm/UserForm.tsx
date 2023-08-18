import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface UserFormData {
  name: string;
  phoneNumber: string;
  email: string;
}

const UserForm: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    phoneNumber: '',
    email: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.phoneNumber || !formData.email) {
      // Check if any required field is empty
      alert('Please fill in all the fields before proceeding.');
    } else {
      localStorage.setItem('userDetails', JSON.stringify(formData));
      navigate('/second_page'); // Navigate to the second page
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save and Continue
        </Button>
      </div>
    </div>
  );
};

export default UserForm;
