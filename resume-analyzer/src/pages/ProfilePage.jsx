import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    confirmPassword: '',
    currentPassword: '',
  });

  const [profileUpdated, setProfileUpdated] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear any errors when field is changed
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear success messages when form is changed
    setProfileUpdated(false);
    setPasswordUpdated(false);
  };

  const validateProfileForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'New password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    if (!validateProfileForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update Redux store with new user info
      dispatch(loginSuccess({
        user: {
          ...user,
          name: formData.name,
          email: formData.email,
        },
        subscription: user.subscription,
      }));
      
      setProfileUpdated(true);
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        form: 'Failed to update profile. Please try again.'
      }));
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear password fields
      setFormData(prev => ({
        ...prev,
        password: '',
        confirmPassword: '',
        currentPassword: '',
      }));
      
      setPasswordUpdated(true);
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        passwordForm: 'Failed to update password. Please try again.'
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-4 overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                  </svg>
                )}
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
              
              <div className="mt-6 w-full">
                <h3 className="text-md font-medium mb-2 text-gray-700">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <button className="w-full text-left px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700">
                      Account Settings
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700">
                      Subscription
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700">
                      Resume History
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700 text-red-500 hover:text-red-700">
                      Delete Account
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-2">
          {/* Profile Information */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
            
            {profileUpdated && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md">
                Profile updated successfully!
              </div>
            )}
            
            <form onSubmit={handleProfileUpdate}>
              <div className="grid grid-cols-1 gap-6 mb-6">
                <Input
                  label="Full Name"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  required
                />
                
                <Input
                  label="Email Address"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                />
              </div>
              
              <div className="flex justify-end">
                <Button
                  type="submit"
                  isLoading={loading}
                  disabled={loading}
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
          
          {/* Change Password */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Change Password</h2>
            
            {passwordUpdated && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md">
                Password updated successfully!
              </div>
            )}
            
            {errors.passwordForm && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
                {errors.passwordForm}
              </div>
            )}
            
            <form onSubmit={handlePasswordUpdate}>
              <div className="grid grid-cols-1 gap-6 mb-6">
                <Input
                  label="Current Password"
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  error={errors.currentPassword}
                  required
                />
                
                <Input
                  label="New Password"
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  helper="Password must be at least 8 characters"
                  required
                />
                
                <Input
                  label="Confirm New Password"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  required
                />
              </div>
              
              <div className="flex justify-end">
                <Button
                  type="submit"
                  isLoading={loading}
                  disabled={loading}
                  variant="secondary"
                >
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;