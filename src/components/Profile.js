import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Sidebar.css';

function Profile() {
  const { user, logout, updateProfile } = useAuth();
  const [profileData, setProfileData] = useState({
    Voter_ID: '', // This will hold the Voter_ID
    name: '',
    surname: '',
    email: '',
    idNumber: '',
    address: '',
    city: '',
    postalCode: '',
    province: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      console.log('User data:', user); // Debug user data
      setProfileData({
        Voter_ID: user.Voter_ID, // Assuming `user.id` corresponds to the Voter_ID
        name: user.name,
        surname: user.surname,
        email: user.email,
        idNumber: user.idNumber,
        address: user.address,
        city: user.city,
        postalCode: user.postalCode,
        province: user.province,
      });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const updatedUser = await updateProfile(profileData);
      setProfileData(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    
    <div className="container inside">
    <Sidebar />
    <div className="main-content">
      <h2>Profile</h2>
      {isEditing ? (
        <form>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              placeholder="Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Surname:</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={profileData.surname}
              onChange={handleChange}
              placeholder="Surname"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="idNumber">ID Number:</label>
            <input
              type="text"
              id="idNumber"
              name="idNumber"
              value={profileData.idNumber}
              onChange={handleChange}
              placeholder="ID Number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={profileData.address}
              onChange={handleChange}
              placeholder="Address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={profileData.city}
              onChange={handleChange}
              placeholder="City"
            />
          </div>
          <div className="form-group">
            <label htmlFor="postalCode">Postal Code:</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={profileData.postalCode}
              onChange={handleChange}
              placeholder="Postal Code"
            />
          </div>
          <div className="form-group">
            <label htmlFor="province">Province:</label>
            <select
              id="province"
              name="province"
              value={profileData.province}
              onChange={handleChange}
              required
            >
              <option value="">Select your province</option>
              {['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape', 'Free State', 'Limpopo', 'Mpumalanga', 'North West', 'Northern Cape'].map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <p>Voter ID: {profileData.Voter_ID}</p> {/* Display the Voter_ID */}
          <p>Name: {profileData.name}</p>
          <p>Surname: {profileData.surname}</p>
          <p>Email: {profileData.email}</p>
          <p>ID Number: {profileData.idNumber}</p>
          <p>Address: {profileData.address}</p>
          <p>City: {profileData.city}</p>
          <p>Postal Code: {profileData.postalCode}</p>
          <p>Province: {profileData.province}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
      <p><Link to="/voting">Vote</Link></p>
      </div>
    </div>
  );
}

export default Profile;
