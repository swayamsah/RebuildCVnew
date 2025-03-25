import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resumes, setResumes] = useState([]);

  // Check if a user is logged in from localStorage on initial load
  useEffect(() => {
    const user = localStorage.getItem('user');
    const savedResumes = localStorage.getItem('resumes');
    
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    
    if (savedResumes) {
      setResumes(JSON.parse(savedResumes));
    }
    
    setLoading(false);
  }, []);

  // Login function - in a real app, this would make an API call
  const login = (email, password) => {
    // Mocked login functionality
    const user = {
      id: "user" + Date.now(),
      email,
      name: email.split('@')[0],
      credits: 5,
      subscription: "Free",
      expiresAt: null
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
    return user;
  };

  // Signup function - in a real app, this would make an API call
  const signup = (email, password, name) => {
    // Mocked signup functionality
    const user = {
      id: "user" + Date.now(),
      email,
      name: name || email.split('@')[0],
      credits: 5,
      subscription: "Free",
      expiresAt: null
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
    return user;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  // Function to update user data
  const updateUser = (userData) => {
    const updatedUser = { ...currentUser, ...userData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
  };

  // Function to add a new resume
  const addResume = (resume) => {
    const updatedResumes = [...resumes, resume];
    localStorage.setItem('resumes', JSON.stringify(updatedResumes));
    setResumes(updatedResumes);
    return resume.id;
  };

  // Function to update existing resume
  const updateResume = (resumeId, updatedData) => {
    const updatedResumes = resumes.map(resume => 
      resume.id === resumeId ? { ...resume, ...updatedData } : resume
    );
    localStorage.setItem('resumes', JSON.stringify(updatedResumes));
    setResumes(updatedResumes);
  };

  // Function to get resume by ID
  const getResumeById = (resumeId) => {
    return resumes.find(resume => resume.id === resumeId);
  };

  // Function to use a credit
  const useCredit = () => {
    if (currentUser && currentUser.credits > 0) {
      updateUser({ credits: currentUser.credits - 1 });
      return true;
    }
    return false;
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    updateUser,
    loading,
    resumes,
    addResume,
    updateResume,
    getResumeById,
    useCredit
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
