import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const fileInputRef = React.useRef(null);
  const jobDescInputRef = React.useRef(null);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const handleResumeUpload = (e) => {
    if (e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };
  
  const handleJobDescUpload = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setJobDescription(e.target.result);
      };
      reader.readAsText(e.target.files[0]);
    }
  };
  
  const handleContinue = () => {
    if (!resumeFile) {
      alert("Please upload your resume");
      return;
    }
    
    if (!jobTitle || !company) {
      if (!jobDescription) {
        alert("Please enter job details or upload a job description");
        return;
      }
    }
    
    // Close modal and redirect
    setIsSignupModalOpen(false);
    if (!currentUser) {
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div>
      <nav className="border-b border-gray-800 backdrop-blur-lg bg-gray-900/95 z-50 fixed top-0 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
                  RebuildCV
                </span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition">Testimonials</a>
              
              {currentUser ? (
                <Link
                  to="/dashboard"
                  className="bg-gradient-to-r from-purple-600 to-cyan-500 px-4 py-2 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition"
                >
                  Dashboard
                </Link>
              ) : (
                <div className="flex space-x-4">
                  <Link
                    to="/login"
                    className="text-white hover:text-cyan-400 transition"
                  >
                    Log in
                  </Link>
                  <button
                    onClick={() => setIsSignupModalOpen(true)}
                    className="bg-gradient-to-r from-purple-600 to-cyan-500 px-4 py-2 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition"
                  >
                    Try for Free
                  </button>
                </div>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-300 hover:text-white p-2"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900 border-t border-gray-800">
              <a 
                href="#features" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#pricing" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a 
                href="#testimonials" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </a>
              <div className="px-3 py-2">
                {currentUser ? (
                  <Link
                    to="/dashboard"
                    className="block w-full text-center bg-gradient-to-r from-purple-600 to-cyan-500 px-4 py-2 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-3 py-2 mb-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Log in
                    </Link>
                    <button
                      onClick={() => {
                        setIsSignupModalOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 px-4 py-2 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition"
                    >
                      Try for Free
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
      
      {/* Sign Up Modal */}
      <AnimatePresence>
        {isSignupModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsSignupModalOpen(false)}
          >
            <motion.div 
              className="bg-gray-900 rounded-xl border border-gray-800 p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", bounce: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-6">Get Started</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-purple-900/60 flex items-center justify-center text-purple-400 mr-3">
                      1
                    </div>
                    <label className="block font-medium">Upload your resume</label>
                  </div>
                  <div 
                    className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-md cursor-pointer hover:border-gray-600 transition"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <div className="space-y-1 text-center">
                      {resumeFile ? (
                        <>
                          <svg className="mx-auto h-12 w-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <p className="text-sm text-gray-400">
                            {resumeFile.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Click to change file
                          </p>
                        </>
                      ) : (
                        <>
                          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H8m36-12h-4m4 0H20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <p className="text-sm text-gray-400">
                            <span className="font-medium text-purple-400 hover:text-purple-300">
                              Upload a file
                            </span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PDF, DOC, DOCX up to 10MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="sr-only"
                  />
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-purple-900/60 flex items-center justify-center text-purple-400 mr-3">
                      2
                    </div>
                    <label className="block font-medium">Enter job details</label>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Job Title
                      </label>
                      <input
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        placeholder="e.g. Software Engineer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        placeholder="e.g. Google"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Job Description
                      </label>
                      <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        placeholder="Paste job description here..."
                      ></textarea>
                      <div className="mt-1 flex items-center text-sm">
                        <span className="text-gray-400 mr-2">Or</span>
                        <button
                          type="button"
                          onClick={() => jobDescInputRef.current.click()}
                          className="text-purple-400 hover:text-purple-300"
                        >
                          upload a file
                        </button>
                        <input
                          ref={jobDescInputRef}
                          type="file"
                          accept=".pdf,.doc,.docx,.txt"
                          onChange={handleJobDescUpload}
                          className="sr-only"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setIsSignupModalOpen(false)}
                  className="flex-1 py-2 px-4 border border-gray-700 rounded-md bg-gray-800 hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleContinue}
                  className="flex-1 py-2 px-4 border border-transparent rounded-md text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:shadow-lg hover:shadow-purple-500/20 transition group"
                >
                  <span className="flex items-center justify-center">
                    Continue
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

