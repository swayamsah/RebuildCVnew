import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardNavigation from './DashboardNavigation';
import DashboardSidebar from './DashboardSidebar';
import ResumePreview from './ResumePreview';
import ParametersModal from './ParametersModal';
import TemplateSelector from './TemplateSelector';
import CustomPromptModal from './CustomPromptModal';
import { FaDownload, FaLayerGroup, FaArrowLeft, FaRedo, FaEye, FaPen } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const ResumeBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getResumeById, updateResume, useCredit, currentUser } = useAuth();
  
  const [resume, setResume] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [optimizedResume, setOptimizedResume] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isParametersModalOpen, setIsParametersModalOpen] = useState(false);
  const [isCustomPromptModalOpen, setIsCustomPromptModalOpen] = useState(false);
  const [isStartOverModalOpen, setIsStartOverModalOpen] = useState(false);
  const [parameters, setParameters] = useState({
    keywordEmphasis: 7,
    briefnessFactor: 5,
    technicalDetail: 5,
    experienceHighlight: 5,
    skillsEmphasis: 5
  });
  
  // Add state for editable content
  const [editableContent, setEditableContent] = useState({
    summary: '',
    skills: []
  });
  
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Update editable content when optimized resume changes
  useEffect(() => {
    if (optimizedResume) {
      setEditableContent({
        summary: optimizedResume.summary,
        skills: [...optimizedResume.skills]
      });
    }
  }, [optimizedResume]);
  
  // Load resume from auth context
  useEffect(() => {
    const loadResume = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const resumeData = getResumeById(id);
        if (resumeData) {
          setResume(resumeData);
          
          // If resume already has optimized version, show it
          if (resumeData.optimized) {
            setOptimizedResume(resumeData.optimized);
          }
        } else {
          // If resume not found, redirect to dashboard
          navigate('/dashboard');
        }
      } catch (err) {
        console.error('Failed to load resume:', err);
        setError('Failed to load resume. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadResume();
  }, [id, getResumeById, navigate]);
  
  // Handle resume optimization with error handling
  const handleOptimizeResume = async () => {
    if (!useCredit()) {
      navigate('/dashboard/subscription');
      return;
    }
    
    setIsProcessing(true);
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const optimizedData = {
        // Simulated optimized resume data
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "555-123-4567",
        title: "Senior Software Engineer",
        summary: "Detail-oriented software engineer with 8+ years of experience building modern web applications. Expert in React, Node.js, and cloud infrastructure with a proven track record of leading teams and delivering high-performance solutions that drive business results.",
        experience: [
          {
            title: "Senior Software Engineer",
            company: "Tech Solutions Inc.",
            period: "2018 - Present",
            responsibilities: [
              "Lead a team of 5 engineers developing a SaaS platform",
              "Architect and implement microservices using Node.js and AWS",
              "Optimize React frontend performance by reducing bundle size by 40%"
            ]
          },
          {
            title: "Software Engineer",
            company: "WebDev Agency",
            period: "2015 - 2018",
            responsibilities: [
              "Developed responsive web applications using React and Redux",
              "Implemented RESTful APIs using Express.js",
              "Collaborated with UX designers to improve user experience"
            ]
          }
        ],
        education: [
          {
            degree: "M.S. Computer Science",
            school: "Tech University",
            year: "2015"
          },
          {
            degree: "B.S. Computer Science",
            school: "State University",
            year: "2013"
          }
        ],
        skills: ["JavaScript", "React", "Redux", "Node.js", "Express", "AWS", "MongoDB", "GraphQL", "TypeScript", "CI/CD", "Docker"],
        keywordMatches: 85,
        improvements: [
          "Added keywords from job description",
          "Reordered experience to highlight relevant achievements",
          "Quantified achievements with metrics",
          "Adjusted summary to align with job requirements"
        ]
      };
      
      setOptimizedResume(optimizedData);
      
      // Update resume in context
      updateResume(id, {
        status: 'optimized',
        optimized: optimizedData
      });
      
      toast.success('Resume optimized successfully');
    } catch (error) {
      console.error('Optimization failed:', error);
      toast.error('Failed to optimize resume. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Handle resume download
  const handleDownload = async () => {
    if (!optimizedResume) {
      toast.error('Please optimize your resume first');
      return;
    }
    
    setIsDownloading(true);
    try {
      // In a real app, this would call an API to generate PDF/DOCX
      // For now, we'll simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create a blob with the resume data
      const blob = new Blob([JSON.stringify(optimizedResume, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume-${resume.jobTitle.toLowerCase().replace(/\s+/g, '-')}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success('Resume downloaded successfully');
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Failed to download resume. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };
  
  // Handle further improvements with custom prompt
  const handleImproveWithPrompt = (prompt) => {
    setIsCustomPromptModalOpen(false);
    
    // Check if user has a premium subscription for custom prompts
    if (currentUser.subscription === 'Free') {
      navigate('/dashboard/subscription');
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      // In a real app, this would call an API with the custom prompt
      // Just update some data for the demo
      const updatedData = {
        ...optimizedResume,
        summary: optimizedResume.summary + " " + prompt.substring(0, 50) + "..."
      };
      
      setOptimizedResume(updatedData);
      
      // Update resume in context
      updateResume(id, {
        optimized: updatedData
      });
      
      setIsProcessing(false);
    }, 2000);
  };
  
  // Handle parameters change with upgrade check
  const handleParametersChange = (newParams) => {
    // Check if user has a premium subscription for parameter adjustments
    if (currentUser.subscription === 'Free') {
      setIsParametersModalOpen(false);
      navigate('/dashboard/subscription');
      return;
    }
    
    setParameters(newParams);
    setIsParametersModalOpen(false);
    
    // In a real app, this would refresh the optimized resume
    // based on the new parameters
  };
  
  // Handle start over
  const handleStartOver = () => {
    setIsStartOverModalOpen(false);
    
    // Check if user has enough credits
    if (!useCredit()) {
      navigate('/dashboard/subscription');
      return;
    }
    
    // Reset the optimized resume
    setOptimizedResume(null);
    
    // Update resume in context
    updateResume(id, {
      status: 'pending',
      optimized: null
    });
  };

  // Handle content updates
  const handleContentUpdate = () => {
    if (!optimizedResume) return;
    
    const updatedResume = {
      ...optimizedResume,
      summary: editableContent.summary,
      skills: editableContent.skills
    };
    
    setOptimizedResume(updatedResume);
    
    // Update resume in context
    updateResume(id, {
      optimized: updatedResume
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading resume...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <p className="text-gray-400">Resume not found</p>
          <Link
            to="/dashboard"
            className="inline-block mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <DashboardNavigation />
      
      <div className="flex flex-col md:flex-row">
        <DashboardSidebar />
        
        <main className="flex-1 p-4">
          <div className="max-w-7xl mx-auto">
            {/* Header with resume info and actions */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="flex items-center">
                <Link 
                  to="/dashboard" 
                  className="mr-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
                >
                  <FaArrowLeft />
                </Link>
                <div>
                  <h2 className="text-xl font-bold">{resume.jobTitle} at {resume.jobCompany}</h2>
                  <p className="text-gray-400">Resume optimization</p>
                </div>
              </div>
              
              {optimizedResume && (
                <div className="flex space-x-2 mt-4 sm:mt-0">
                  <button
                    onClick={() => setIsStartOverModalOpen(true)}
                    className="p-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition text-sm"
                  >
                    Start Over
                  </button>
                  <Link
                    to={`/dashboard/compare/${id}`}
                    className="p-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition text-sm flex items-center"
                  >
                    <FaEye className="mr-2" /> Compare Versions
                  </Link>
                </div>
              )}
            </div>

            {/* Main content with resume and job details/parameters */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left pane - Resume */}
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-900">
                  <h3 className="font-medium">
                    {optimizedResume ? "Optimized Resume" : "Your Resume"}
                  </h3>
                  <div className="flex space-x-2">
                    {optimizedResume ? (
                      <>
                        <button 
                          onClick={() => setIsTemplateModalOpen(true)}
                          className="p-2 bg-gray-800 rounded-md hover:bg-gray-700 transition"
                          title="Change template"
                        >
                          <FaLayerGroup className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setIsCustomPromptModalOpen(true)}
                          className="p-2 bg-gray-800 rounded-md hover:bg-gray-700 transition"
                          title="Improve further"
                        >
                          <FaPen className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleDownload}
                          disabled={isDownloading || !optimizedResume}
                          className="flex-1 py-2 px-4 border border-transparent rounded-md text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:shadow-lg hover:shadow-purple-500/20 transition flex items-center justify-center disabled:opacity-50"
                        >
                          {isDownloading ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Downloading...
                            </>
                          ) : (
                            <>
                              <FaDownload className="mr-2" />
                              Download Resume
                            </>
                          )}
                        </button>
                      </>
                    ) : (
                      <div className="text-sm text-gray-400">
                        Original resume preview
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <div className="h-[calc(100vh-300px)] overflow-y-auto custom-scrollbar">
                    {optimizedResume ? (
                      <ResumePreview resume={optimizedResume} template={selectedTemplate} />
                    ) : (
                      <ResumePreview 
                        resume={{
                          name: "John Doe",
                          email: "john.doe@example.com",
                          phone: "555-123-4567",
                          title: "Software Engineer",
                          summary: "Experienced software engineer with expertise in React, Node.js, and cloud infrastructure. 8+ years building scalable web applications and leading development teams.",
                          experience: [
                            {
                              title: "Senior Software Engineer",
                              company: "Tech Solutions Inc.",
                              period: "2018 - Present",
                              responsibilities: [
                                "Lead a team of 5 engineers developing a SaaS platform",
                                "Architect and implement microservices using Node.js and AWS",
                                "Optimize React frontend performance by reducing bundle size by 40%"
                              ]
                            },
                            {
                              title: "Software Engineer",
                              company: "WebDev Agency",
                              period: "2015 - 2018",
                              responsibilities: [
                                "Developed responsive web applications using React and Redux",
                                "Implemented RESTful APIs using Express.js",
                                "Collaborated with UX designers to improve user experience"
                              ]
                            }
                          ],
                          education: [
                            {
                              degree: "M.S. Computer Science",
                              school: "Tech University",
                              year: "2015"
                            },
                            {
                              degree: "B.S. Computer Science",
                              school: "State University",
                              year: "2013"
                            }
                          ],
                          skills: ["JavaScript", "React", "Node.js", "Express", "AWS", "MongoDB", "GraphQL", "TypeScript", "Docker", "Kubernetes"]
                        }} 
                        template="simple" 
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Right pane - Job details or parameters */}
              <AnimatePresence mode="wait">
                {!optimizedResume ? (
                  <motion.div
                    key="job-details"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-800 bg-gray-900">
                      <h3 className="font-medium">Job Details</h3>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Job Title
                          </label>
                          <div className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md">
                            {resume.jobTitle}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Company
                          </label>
                          <div className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md">
                            {resume.jobCompany}
                          </div>
                        </div>
                        
                        {/* Optional Job Description if available */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Job Description
                          </label>
                          <div className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md h-40 overflow-y-auto">
                            {resume.jobDescription || "No job description provided."}
                          </div>
                        </div>
                        
                        {/* Optional parameters toggle - with upgrade prompt for free users */}
                        <div className="pt-2">
                          <button
                            onClick={() => setIsParametersModalOpen(true)}
                            className="text-sm text-purple-400 hover:text-purple-300 mb-4 flex items-center"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                            </svg>
                            Customize Optimization Parameters
                            {currentUser.subscription === 'Free' && (
                              <span className="ml-2 text-xs bg-purple-900/50 text-purple-300 px-2 py-0.5 rounded-full">Pro</span>
                            )}
                          </button>
                        </div>
                        
                        <div className="pt-4">
                          <button
                            type="button"
                            onClick={handleOptimizeResume}
                            disabled={isProcessing}
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:shadow-lg hover:shadow-purple-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition disabled:opacity-50"
                          >
                            {isProcessing ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Optimizing Resume...
                              </>
                            ) : (
                              'Optimize Resume'
                            )}
                          </button>
                          
                          <div className="text-center text-sm text-gray-400 mt-2">
                            This will use 1 credit. You have {currentUser.credits} credits remaining.
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="optimization-parameters"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-800 bg-gray-900 flex justify-between items-center">
                      <h3 className="font-medium">Resume Analysis</h3>
                      <button
                        onClick={() => setIsParametersModalOpen(true)} 
                        className="text-sm text-purple-400 hover:text-purple-300 flex items-center"
                      >
                        <FaRedo className="mr-1" /> Adjust Parameters
                        {currentUser.subscription === 'Free' && (
                          <span className="ml-2 text-xs bg-purple-900/50 text-purple-300 px-2 py-0.5 rounded-full">Pro</span>
                        )}
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="bg-green-900/20 border border-green-500/30 rounded-md p-4 mb-6">
                        <h3 className="text-green-400 font-medium mb-2 flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg>
                          {optimizedResume.keywordMatches}% Keyword Match
                        </h3>
                        <p className="text-sm text-gray-300">
                          Your optimized resume includes {optimizedResume.keywordMatches}% of the key skills and qualifications from the job description.
                        </p>
                      </div>
                      
                      <div className="bg-gray-800/50 border border-gray-700 rounded-md p-4 mb-6">
                        <h3 className="font-medium mb-2">Improvements Made</h3>
                        <ul className="text-sm text-gray-300 space-y-2">
                          {optimizedResume.improvements.map((improvement, index) => (
                            <li key={index} className="flex items-start">
                              <svg className="w-5 h-5 text-purple-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                              {improvement}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-gray-800/50 border border-gray-700 rounded-md p-4 mb-6">
                        <h3 className="font-medium mb-2">Edit Resume Content</h3>
                        <p className="text-sm text-gray-300 mb-3">
                          Make custom adjustments to your optimized resume.
                        </p>
                        
                        {/* Simple form for editing key resume sections */}
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Professional Summary
                            </label>
                            <textarea
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                              rows={3}
                              value={editableContent.summary}
                              onChange={(e) => setEditableContent(prev => ({ ...prev, summary: e.target.value }))}
                            ></textarea>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Skills (comma separated)
                            </label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                              value={editableContent.skills.join(", ")}
                              onChange={(e) => setEditableContent(prev => ({ 
                                ...prev, 
                                skills: e.target.value.split(',').map(skill => skill.trim()).filter(Boolean)
                              }))}
                            />
                          </div>
                          
                          <button
                            onClick={handleContentUpdate}
                            className="w-full py-2 text-center bg-gray-700 hover:bg-gray-600 rounded transition text-sm"
                          >
                            Update Resume
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex space-x-4">
                        <button
                          onClick={() => setIsCustomPromptModalOpen(true)}
                          className="flex-1 py-2 px-4 border border-gray-700 rounded-md bg-gray-800 hover:bg-gray-700 transition flex items-center justify-center"
                        >
                          <FaPen className="mr-2" />
                          Improve Further
                        </button>
                        <button
                          onClick={handleDownload}
                          className="flex-1 py-2 px-4 border border-transparent rounded-md text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:shadow-lg hover:shadow-purple-500/20 transition flex items-center justify-center"
                        >
                          <FaDownload className="mr-2" />
                          Download Resume
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>

      {/* Template Selector Modal */}
      {isTemplateModalOpen && (
        <TemplateSelector
          currentTemplate={selectedTemplate}
          onSelectTemplate={(template) => {
            setSelectedTemplate(template);
            setIsTemplateModalOpen(false);
          }}
          onClose={() => setIsTemplateModalOpen(false)}
        />
      )}
      
      {/* Parameters Modal */}
      {isParametersModalOpen && (
        <ParametersModal
          parameters={parameters}
          onUpdateParameters={handleParametersChange}
          onClose={() => setIsParametersModalOpen(false)}
          isPremium={currentUser.subscription !== 'Free'}
        />
      )}
      
      {/* Custom Prompt Modal */}
      {isCustomPromptModalOpen && (
        <CustomPromptModal
          onSubmit={handleImproveWithPrompt}
          onClose={() => setIsCustomPromptModalOpen(false)}
          isPremium={currentUser.subscription !== 'Free'}
        />
      )}
      
      {/* Start Over Confirmation Modal */}
      {isStartOverModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsStartOverModalOpen(false)}
        >
          <motion.div 
            className="bg-gray-900 rounded-xl border border-gray-800 p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.4 }}
          >
            <h2 className="text-xl font-bold mb-4">Start Over</h2>
            <p className="text-gray-300 mb-6">
              Are you sure you want to start over? This will use another credit and your current optimized resume will be lost.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setIsStartOverModalOpen(false)}
                className="flex-1 py-2 px-4 border border-gray-700 rounded-md bg-gray-800 hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleStartOver}
                className="flex-1 py-2 px-4 border border-transparent rounded-md text-white bg-red-600 hover:bg-red-700 transition"
              >
                Start Over
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;
