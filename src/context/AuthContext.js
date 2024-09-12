import React, { createContext, useContext, useState } from 'react';
import bcrypt from 'bcryptjs';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const backendUrl = '/techvotesa/public'; // Use relative URL
  // For when we switch over to online
  // const backendUrl = 'https://www.techvotesa.co.za/'

  const register = async (userData) => {
    try {
      const response = await fetch(`${backendUrl}/registration.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (data.message === 'Registration successful') {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Backend not available, saving registration data in local storage', error);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${backendUrl}/login.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Login failed', error);
      return 'Invalid email or password.';
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const resetPassword = async (email, newPassword) => {
    if (user && user.email === email) {
      const updatedUser = { ...user, password: newPassword };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

const updateProfile = async (profileData) => {
  try {
    const response = await fetch(`${backendUrl}/updateProfile.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    const text = await response.text();
    console.log('Response text:', text); // Debug response

    const updatedUser = JSON.parse(text);

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    setUser(updatedUser.user);
    localStorage.setItem('user', JSON.stringify(updatedUser.user));
    return updatedUser.user;
  } catch (error) {
    console.error('Failed to update profile:', error);
    throw error;
  }
};





  const value = {
    user,
    register,
    login,
    logout,
    resetPassword,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
