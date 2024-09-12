import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import eyeIcon from '../imgs/eye.png';
import eyeSlashIcon from '../imgs/hide.png';

function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    idNumber: '',
    address: '',
    city: '',
    postalCode: '',
    province: '',
    email: '',
    password: '',
    confirmPassword: '',
    idFile: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const provinces = [
    'Gauteng',
    'Western Cape',
    'KwaZulu-Natal',
    'Eastern Cape',
    'Free State',
    'Limpopo',
    'Mpumalanga',
    'North West',
    'Northern Cape',
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'idFile') {
      setFormData({
        ...formData,
        idFile: files[0] ? URL.createObjectURL(files[0]) : null,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.surname.trim()) newErrors.surname = 'Surname is required.';
    if (!/^\d{13}$/.test(formData.idNumber)) newErrors.idNumber = 'ID Number must be 13 digits.';
    if (!formData.address.trim()) newErrors.address = 'Address is required.';
    if (!formData.city.trim()) newErrors.city = 'City is required.';
    if (!/^\d{4}$/.test(formData.postalCode)) newErrors.postalCode = 'Postal Code must be 4 digits.';
    if (!formData.province) newErrors.province = 'Province is required.';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid.';

    const passwordErrors = validatePassword(formData.password);
    if (Object.keys(passwordErrors).length > 0) newErrors.password = passwordErrors;

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    return newErrors;
  };

  const validatePassword = (password) => {
    const errors = {};
    if (password.length < 8) {
      errors.length = 'Password must be at least 8 characters long.';
    }
    if (!/[A-Z]/.test(password)) {
      errors.uppercase = 'Password must contain at least one uppercase letter.';
    }
    if (!/[a-z]/.test(password)) {
      errors.lowercase = 'Password must contain at least one lowercase letter.';
    }
    if (!/[0-9]/.test(password)) {
      errors.number = 'Password must contain at least one number.';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.specialChar = 'Password must contain at least one special character.';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const registrationData = {
      voterID: '', 
      name: formData.name,
      surname: formData.surname,
      idNumber: formData.idNumber,
      address: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
      province: formData.province,
      email: formData.email,
      password: formData.password, // Password will be hashed in PHP
      idFile: formData.idFile,
    };

    try {
      const response = await fetch('/techvotesa/public/registration.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();

      if (data.message === 'Registration successful') {
        console.log(registrationData);
        navigate('/profile');
      } else {
        setErrors({ server: data.message });
      }
    } catch (error) {
      setErrors({ server: 'An error occurred. Please try again later.' });
    }
  };

  return (
    <div className="container">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="surname">Surname:</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
          {errors.surname && <p className="error">{errors.surname}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="idNumber">ID Number:</label>
          <input
            type="text"
            id="idNumber"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            required
          />
          {errors.idNumber && <p className="error">{errors.idNumber}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          {errors.address && <p className="error">{errors.address}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
          {errors.city && <p className="error">{errors.city}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="postalCode">Postal Code:</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
          {errors.postalCode && <p className="error">{errors.postalCode}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="province">Province:</label>
          <select
            id="province"
            name="province"
            value={formData.province}
            onChange={handleChange}
            required
          >
            <option value="">Select your province</option>
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
          {errors.province && <p className="error">{errors.province}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              <img src={showPassword ? eyeSlashIcon : eyeIcon} alt="Toggle Password Visibility" />
            </span>
          </div>
          {errors.password && (
            <div className="error">
              {Object.values(errors.password).map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <div className="password-input">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <img src={showConfirmPassword ? eyeSlashIcon : eyeIcon} alt="Toggle Confirm Password Visibility" />
            </span>
          </div>
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="idFile">Upload ID:</label>
          <input
            type="file"
            id="idFile"
            name="idFile"
            onChange={handleChange}
            required
          />
          {errors.idFile && <p className="error">{errors.idFile}</p>}
        </div>
        <button type="submit">Register</button>
        <p>Already have an account? <Link to="/login">Login here</Link></p>
        {errors.server && <p className="error">{errors.server}</p>}
      </form>
    </div>
  );
}

export default Registration;
