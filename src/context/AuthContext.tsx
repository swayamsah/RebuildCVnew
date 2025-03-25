import React, { createContext, useState, useContext, useEffect, FC, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  credits: number;
  subscription: string;
  expiresAt: string | null;
}

interface Resume {
  id: string;
  [key: string]: any;
}

export interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  resumes: Resume[];
  login: (email: string, password: string) => User;
  signup: (email: string, password: string, name?: string) => User;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  addResume: (resume: Resume) => string;
  updateResume: (resumeId: string, updatedData: Partial<Resume>) => void;
  deleteResume: (resumeId: string) => void;
  getResumeById: (resumeId: string) => Resume | undefined;
  useCredit: () => boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext);

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [resumes, setResumes] = useState<Resume[]>([]);

  // Check if a user is logged in from localStorage on initial load
  useEffect(() => {
    const user = localStorage.getItem('user');
    const savedResumes = localStorage.getItem('resumes');
    
    if (user) {
      const parsedUser = JSON.parse(user);
      // For testing, ensure the user has 100 credits
      if (parsedUser.credits < 100) {
        parsedUser.credits = 100;
        localStorage.setItem('user', JSON.stringify(parsedUser));
      }
      setCurrentUser(parsedUser);
    }
    
    if (savedResumes) {
      setResumes(JSON.parse(savedResumes));
    }
    
    setLoading(false);
  }, []);

  // Login function - in a real app, this would make an API call
  const login = (email: string, password: string): User => {
    // Mocked login functionality
    const user: User = {
      id: "user" + Date.now(),
      email,
      name: email.split('@')[0],
      credits: 100, // Starting with 100 credits for testing
      subscription: "Free",
      expiresAt: null
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
    return user;
  };

  // Signup function - in a real app, this would make an API call
  const signup = (email: string, password: string, name?: string): User => {
    // Mocked signup functionality
    const user: User = {
      id: "user" + Date.now(),
      email,
      name: name || email.split('@')[0],
      credits: 100, // Starting with 100 credits for testing
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
  const updateUser = (userData: Partial<User>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
    }
  };

  // Function to add a new resume
  const addResume = (resume: Resume): string => {
    const updatedResumes = [...resumes, resume];
    localStorage.setItem('resumes', JSON.stringify(updatedResumes));
    setResumes(updatedResumes);
    return resume.id;
  };

  // Function to update existing resume
  const updateResume = (resumeId: string, updatedData: Partial<Resume>) => {
    const updatedResumes = resumes.map(resume => 
      resume.id === resumeId ? { ...resume, ...updatedData } : resume
    );
    localStorage.setItem('resumes', JSON.stringify(updatedResumes));
    setResumes(updatedResumes);
  };

  // Function to delete a resume
  const deleteResume = (resumeId: string) => {
    const updatedResumes = resumes.filter(resume => resume.id !== resumeId);
    localStorage.setItem('resumes', JSON.stringify(updatedResumes));
    setResumes(updatedResumes);
  };

  // Function to get resume by ID
  const getResumeById = (resumeId: string): Resume | undefined => {
    return resumes.find(resume => resume.id === resumeId);
  };

  // Function to use a credit
  const useCredit = (): boolean => {
    if (currentUser && currentUser.credits > 0) {
      updateUser({ credits: currentUser.credits - 1 });
      return true;
    }
    return false;
  };

  const value: AuthContextType = {
    currentUser,
    login,
    signup,
    logout,
    updateUser,
    loading,
    resumes,
    addResume,
    updateResume,
    deleteResume,
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
