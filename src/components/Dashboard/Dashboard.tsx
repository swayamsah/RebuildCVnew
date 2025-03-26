import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import DashboardNavigation from './DashboardNavigation';
import DashboardSidebar from './DashboardSidebar';
import { FaPlus, FaRegFilePdf, FaRegFileWord, FaEllipsisV, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { IResume, IUser, IAuthContext } from '../../types';
import { AuthContextType } from '../../context/AuthContext';

interface ResumeFile extends File {
  name: string;
}

const Dashboard: React.FC = () => {
  const auth = useAuth() as AuthContextType;
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [resumeFile, setResumeFile] = useState<ResumeFile | null>(null);
  const [jobTitle, setJobTitle] = useState<string>('');
  const [jobCompany, setJobCompany] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();

  // File input refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const jobDescInputRef = useRef<HTMLInputElement>(null);

  // Function to handle resume upload
  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files?.[0]) {
      setResumeFile(e.target.files[0] as ResumeFile);
    }
  };

  // Function to handle job description file upload
  const handleJobDescriptionUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          setJobDescription(result);
        }
      };
      reader.readAsText(e.target.files[0]);
    }
  };

  // Function to handle creating a new resume
  const handleCreateResume = (): void => {
    if (!resumeFile) {
      alert("Please upload your resume");
      return;
    }

    if (!jobTitle || !jobCompany) {
      if (!jobDescription) {
        alert("Please enter job details or upload a job description");
        return;
      }
    }

    // Create a unique ID for the new resume
    const newResumeId = `resume-${Date.now()}`;
    
    // In a real app, we would process the file here
    // For now, we'll create a simulated resume object
    const newResume: IResume = {
      id: newResumeId,
      jobTitle,
      jobCompany,
      jobDescription,
      status: 'pending',
      optimized: undefined
    };
    
    // Add resume to context and get the ID
    auth.addResume(newResume);
    
    // Close modal and reset form
    setIsUploadModalOpen(false);
    setResumeFile(null);
    setJobTitle('');
    setJobCompany('');
    setJobDescription('');
    
    // Navigate to the resume builder page with the new resume ID
    navigate(`/dashboard/resume/${newResumeId}`);
  };

  // Toggle dropdown menu for a resume
  const toggleDropdown = (id: string, e: React.MouseEvent): void => {
    e.stopPropagation();
    if (activeDropdown === id) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(id);
    }
  };

  // Delete a resume
  const handleDeleteResume = (id: string, e: React.MouseEvent): void => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this resume? This action cannot be undone.")) {
      auth.deleteResume(id);
      setActiveDropdown(null);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (): void => setActiveDropdown(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <DashboardNavigation />
      
      <div className="flex flex-col md:flex-row">
        <DashboardSidebar />
        
        <main className="flex-1 p-4">
          <div className="max-w-7xl mx-auto">
            {/* Header section with user info and credits */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-2xl font-bold">Welcome, {auth.currentUser?.name || 'User'}!</h2>
                <p className="text-gray-400">Let's optimize your resume for your dream job.</p>
              </div>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <div className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                  {auth.currentUser?.subscription || 'Free'} Plan
                </div>
                <div className="bg-purple-900/50 px-3 py-1 rounded-full text-sm border border-purple-500/30">
                  {auth.currentUser?.credits || 0} Credits
                </div>
              </div>
            </div>

            {/* Resume list section */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden">
              <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                <h3 className="text-xl font-medium">Your Resumes</h3>
                <button 
                  onClick={() => setIsUploadModalOpen(true)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md transition flex items-center"
                >
                  <FaPlus className="mr-2" /> Create New
                </button>
              </div>

              <div className="p-6">
                {auth.resumes.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                      <FaRegFilePdf className="w-8 h-8 text-gray-600" />
                    </div>
                    <h4 className="text-lg font-medium mb-2">No Resumes Yet</h4>
                    <p className="text-gray-400 mb-6 max-w-md mx-auto">
                      Upload your current resume and target job description to get started with AI optimization
                    </p>
                    <button
                      onClick={() => setIsUploadModalOpen(true)}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-md hover:shadow-lg hover:shadow-purple-500/20 transition"
                    >
                      Create Your First Resume
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {auth.resumes.map((resume) => (
                      <div 
                        key={resume.id} 
                        className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-purple-500/30 transition group"
                      >
                        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                          <div className="flex items-center">
                            <FaRegFilePdf className="text-red-400 mr-2" />
                            <span className="font-medium truncate" style={{maxWidth: '180px'}}>
                              {resume.jobTitle}
                            </span>
                          </div>
                          <div className="relative" onClick={(e) => e.stopPropagation()}>
                            <button 
                              onClick={(e) => toggleDropdown(resume.id || '', e)}
                              className="p-1 hover:bg-gray-700 rounded-md"
                            >
                              <FaEllipsisV className="text-gray-400" />
                            </button>
                            
                            {activeDropdown === resume.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10 border border-gray-700">
                                <Link 
                                  to={`/dashboard/resume/${resume.id}`}
                                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center"
                                >
                                  <FaEdit className="mr-2" /> Edit Resume
                                </Link>
                                {resume.status === 'optimized' && (
                                  <Link 
                                    to={`/dashboard/compare/${resume.id}`}
                                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center"
                                  >
                                    <FaEye className="mr-2" /> Compare Versions
                                  </Link>
                                )}
                                <button 
                                  onClick={(e) => handleDeleteResume(resume.id || '', e)}
                                  className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 flex items-center"
                                >
                                  <FaTrash className="mr-2" /> Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <div className="mb-3">
                            <div className="text-xs text-gray-400 mb-1">Job Position</div>
                            <div className="font-medium">{resume.jobTitle}</div>
                          </div>
                          <div className="mb-3">
                            <div className="text-xs text-gray-400 mb-1">Company</div>
                            <div className="font-medium">{resume.jobCompany}</div>
                          </div>
                          
                          <div className="mt-2">
                            {resume.status === 'pending' ? (
                              <div className="bg-yellow-900/30 text-yellow-400 text-xs px-2 py-1 rounded-full inline-flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Pending Optimization
                              </div>
                            ) : (
                              <div className="bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded-full inline-flex items-center">
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                                Optimized
                              </div>
                            )}
                          </div>
                          
                          <Link 
                            to={`/dashboard/resume/${resume.id}`}
                            className="mt-4 block w-full text-center py-2 bg-gray-700 hover:bg-gray-600 rounded transition"
                          >
                            {resume.status === 'pending' ? 'Continue Optimization' : 'View Resume'}
                          </Link>
                        </div>
                      </div>
                    ))}
                    
                    {/* Add new resume card */}
                    <div 
                      onClick={() => setIsUploadModalOpen(true)}
                      className="bg-gray-800/50 border border-gray-700 border-dashed rounded-lg overflow-hidden hover:bg-gray-800 hover:border-purple-500/30 transition cursor-pointer flex flex-col items-center justify-center p-8"
                    >
                      <div className="w-16 h-16 rounded-full bg-gray-700/50 flex items-center justify-center mb-4">
                        <FaPlus className="w-6 h-6 text-gray-500" />
                      </div>
                      <h4 className="text-lg font-medium mb-1">Create New Resume</h4>
                      <p className="text-gray-400 text-center">
                        Upload and optimize for a new job position
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* Upload Resume Modal */}
      {isUploadModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsUploadModalOpen(false)}
        >
          <motion.div 
            className="bg-gray-900 rounded-xl border border-gray-800 p-6 w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-6">Create New Resume</h2>
            
            <div className="space-y-6">
              {/* Step 1: Upload Resume */}
              <div className="bg-gray-800/60 rounded-lg p-5 border border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-purple-900/60 flex items-center justify-center text-purple-400 mr-3">
                    1
                  </div>
                  <h3 className="font-medium text-lg">Upload your resume</h3>
                </div>
                
                <div 
                  className="flex justify-center px-6 pt-6 pb-8 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer hover:border-purple-500/30 transition"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="text-center">
                    {resumeFile ? (
                      <>
                        <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-900/30 text-green-400 mb-3">
                          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-lg font-medium text-white mb-1">
                          {resumeFile.name}
                        </p>
                        <p className="text-sm text-gray-400 mb-3">
                          Ready to optimize!
                        </p>
                        <p className="text-xs text-purple-400 hover:text-purple-300">
                          Click to change file
                        </p>
                      </>
                    ) : (
                      <>
                        <svg className="mx-auto h-14 w-14 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H8m36-12h-4m4 0H20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-lg font-medium text-gray-300 mb-1">
                          Upload your resume
                        </p>
                        <p className="text-sm text-gray-400 mb-3">
                          <span className="text-purple-400 hover:text-purple-300">
                            Click to browse files
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
              
              {/* Step 2: Job Details */}
              <div className="bg-gray-800/60 rounded-lg p-5 border border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-purple-900/60 flex items-center justify-center text-purple-400 mr-3">
                    2
                  </div>
                  <h3 className="font-medium text-lg">Enter job details</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Job Title <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      placeholder="e.g. Software Engineer"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Company <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={jobCompany}
                      onChange={(e) => setJobCompany(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      placeholder="e.g. Google"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Job Description (optional)
                    </label>
                    <textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                      placeholder="Paste job description here..."
                    ></textarea>
                    
                    <div className="mt-2 flex items-center text-sm">
                      <span className="text-gray-400 mr-2">or</span>
                      <button
                        type="button"
                        onClick={() => jobDescInputRef.current?.click()}
                        className="text-purple-400 hover:text-purple-300"
                      >
                        upload a file
                      </button>
                      <input
                        ref={jobDescInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleJobDescriptionUpload}
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
                onClick={() => setIsUploadModalOpen(false)}
                className="flex-1 py-2 px-4 border border-gray-700 rounded-md bg-gray-800 hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateResume}
                disabled={!resumeFile || (!jobTitle && !jobCompany)}
                className="flex-1 py-2 px-4 border border-transparent rounded-md text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:shadow-lg hover:shadow-purple-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
