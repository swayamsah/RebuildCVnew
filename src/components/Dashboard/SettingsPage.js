import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardNavigation from './DashboardNavigation';
import DashboardSidebar from './DashboardSidebar';

const SettingsPage = () => {
  const { currentUser, updateUser, logout } = useAuth();
  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    email: currentUser.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle profile update
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    
    // Reset messages
    setSuccessMessage('');
    setErrorMessage('');
    
    // In a real app, this would make an API call to update the user's profile
    updateUser({
      name: formData.name,
      email: formData.email
    });
    
    setIsEditing(false);
    setSuccessMessage('Profile updated successfully!');
    
    // Clear success message after a delay
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  // Handle password update
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    
    // Reset messages
    setSuccessMessage('');
    setErrorMessage('');
    
    // Check if passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMessage('New passwords do not match');
      return;
    }
    
    // In a real app, this would verify the current password and update to the new one
    // For this demo, we'll just show a success message
    
    // Reset password fields
    setFormData({
      ...formData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    
    setSuccessMessage('Password updated successfully!');
    
    // Clear success message after a delay
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };
  
  // Handle account deletion
  const handleDeleteAccount = () => {
    // In a real app, this would make an API call to delete the user's account
    // For this demo, we'll just log out the user
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <DashboardNavigation />
      
      <div className="flex flex-col md:flex-row">
        <DashboardSidebar />
        
        <main className="flex-1 p-4">
          <div className="max-w-3xl mx-auto">
            {/* Header section */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold mb-2">Settings</h2>
              <p className="text-gray-400">Manage your account and preferences</p>
            </div>
            
            {/* Success/Error Messages */}
            {successMessage && (
              <div className="bg-green-900/20 border border-green-500/30 rounded-md p-4 mb-6">
                <p className="text-green-400">{successMessage}</p>
              </div>
            )}
            
            {errorMessage && (
              <div className="bg-red-900/20 border border-red-500/30 rounded-md p-4 mb-6">
                <p className="text-red-400">{errorMessage}</p>
              </div>
            )}
            
            {/* Profile settings */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden mb-6">
              <div className="p-6 border-b border-gray-800 bg-gray-900 flex justify-between items-center">
                <h3 className="text-xl font-medium">Profile Information</h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md text-sm transition"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>
              
              <div className="p-6">
                {!isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Name</div>
                      <div className="font-medium">{currentUser.name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Email</div>
                      <div className="font-medium">{currentUser.email}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Account Created</div>
                      <div className="font-medium">
                        {new Date().toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-white transition"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
            
            {/* Password settings */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden mb-6">
              <div className="p-6 border-b border-gray-800 bg-gray-900">
                <h3 className="text-xl font-medium">Change Password</h3>
              </div>
              
              <div className="p-6">
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-white transition"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Notification settings */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden mb-6">
              <div className="p-6 border-b border-gray-800 bg-gray-900">
                <h3 className="text-xl font-medium">Notification Settings</h3>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { id: 'email_updates', label: 'Email Updates' },
                    { id: 'product_news', label: 'Product News and Announcements' },
                    { id: 'marketing', label: 'Marketing Communications' }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <label htmlFor={item.id} className="font-medium">{item.label}</label>
                      <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                        <input
                          type="checkbox"
                          id={item.id}
                          name={item.id}
                          className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white rounded-full appearance-none cursor-pointer peer border border-gray-300 checked:border-purple-500 checked:bg-purple-500 checked:translate-x-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          defaultChecked={item.id === 'email_updates' ? true : false}
                        />
                        <span className="absolute inset-0 transition duration-200 ease-in-out bg-gray-700 rounded-full peer-checked:bg-purple-600"></span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <button
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md transition"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
            
            {/* Danger zone */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden">
              <div className="p-6 border-b border-gray-800 bg-red-900/10">
                <h3 className="text-xl font-medium text-red-400">Danger Zone</h3>
              </div>
              
              <div className="p-6">
                <p className="text-gray-400 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                
                {!showDeleteConfirmation ? (
                  <button
                    onClick={() => setShowDeleteConfirmation(true)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white transition"
                  >
                    Delete Account
                  </button>
                ) : (
                  <div className="bg-red-900/20 border border-red-500/30 rounded-md p-4">
                    <p className="text-red-400 mb-4">
                      Are you absolutely sure you want to delete your account? All of your data will be permanently removed. This action cannot be undone.
                    </p>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setShowDeleteConfirmation(false)}
                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDeleteAccount}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white transition"
                      >
                        Yes, Delete My Account
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
