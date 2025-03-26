import React, { useState, useEffect, KeyboardEvent } from 'react';
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
import { 
  IResume, 
  IOptimizedResume, 
  IParameters, 
  IEditableContent
} from '../../types';

const ResumeBuilder: React.FC = () => {
  // All hooks must be called unconditionally at the top level
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const auth = useAuth();
  const [resume, setResume] = useState<IResume | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [optimizedResume, setOptimizedResume] = useState<IOptimizedResume | undefined>(undefined);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('modern');
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState<boolean>(false);
  const [isParametersModalOpen, setIsParametersModalOpen] = useState<boolean>(false);
  const [isCustomPromptModalOpen, setIsCustomPromptModalOpen] = useState<boolean>(false);
  const [isStartOverModalOpen, setIsStartOverModalOpen] = useState<boolean>(false);
  const [parameters, setParameters] = useState<IParameters>({
    keywordEmphasis: 7,
    briefnessFactor: 5,
    technicalDetail: 5,
    experienceHighlight: 5,
    skillsEmphasis: 5
  });
  const [editableContent, setEditableContent] = useState<IEditableContent>({
    summary: '',
    skills: []
  });
  const [isDownloading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // All hooks must be called at the top level
  const [hasCredits, setHasCredits] = useState(false);
  
  // Handle custom hook and auth context
  useEffect(() => {
    if (auth?.useCredit) {
      // Call useCredit only when it exists
      try {
        const hasAvailableCredits = auth.useCredit();
        setHasCredits(!!hasAvailableCredits);
      } catch (err) {
        console.error('Error checking credits:', err);
        setHasCredits(false);
      }
    } else {
      setHasCredits(false);
    }
  }, [auth]);

  // Auth-related destructuring (after all hooks)
  const { getResumeById, updateResume, currentUser } = auth || {};

  useEffect(() => {
    if (optimizedResume) {
      setEditableContent({
        summary: optimizedResume.summary || '',
        skills: [...(optimizedResume.skills || [])]
      });
    }
  }, [optimizedResume]);

  useEffect(() => {
    const loadResume = async (): Promise<void> => {
      if (!auth || !getResumeById) return;

      try {
        setIsLoading(true);
        setError(null);
        
        if (!id) {
          navigate('/dashboard');
          return;
        }

        const resumeData = getResumeById(id);
        if (resumeData) {
          setResume(resumeData as unknown as IResume);
          
          if (resumeData.optimized) {
            setOptimizedResume(resumeData.optimized);
          }
        } else {
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
  }, [id, auth, getResumeById, navigate]);

  // Early return for missing auth context
  if (!auth) {
    return <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-500 mb-4">Authentication context not available</div>
        <Link
          to="/login"
          className="inline-block px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
        >
          Return to Login
        </Link>
      </div>
    </div>;
  }

  const handleOptimizeResume = async (): Promise<void> => {
    if (!hasCredits) {
      navigate('/dashboard/subscription');
      return;
    }
    
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const optimizedData: IOptimizedResume = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "555-123-4567",
        title: "Senior Software Engineer",
        summary: "Detail-oriented software engineer with 8+ years of experience building modern web applications.",
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
          }
        ],
        education: [
          {
            degree: "M.S. Computer Science",
            school: "Tech University",
            year: "2015"
          }
        ],
        skills: ["JavaScript", "React", "Redux", "Node.js"],
        keywordMatches: 85,
        improvements: [
          "Added keywords from job description",
          "Reordered experience to highlight achievements"
        ]
      };
      
      setOptimizedResume(optimizedData);
      
      if (id && updateResume) {
        updateResume(id, {
          status: 'optimized',
          optimized: optimizedData
        });
      }
      
      toast.success('Resume optimized successfully');
    } catch (error) {
      console.error('Optimization failed:', error);
      toast.error('Failed to optimize resume. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleImproveWithPrompt = (prompt: string): void => {
    setIsCustomPromptModalOpen(false);
    
    if (currentUser?.subscription === 'Free') {
      navigate('/dashboard/subscription');
      return;
    }
    
    setIsProcessing(true);
    
    setTimeout(() => {
      if (optimizedResume && id && updateResume) {
        const updatedData: IOptimizedResume = {
          ...optimizedResume,
          summary: optimizedResume.summary + " " + prompt.substring(0, 50) + "..."
        };
        
        setOptimizedResume(updatedData);
        updateResume(id, {
          optimized: updatedData
        });
      }
      
      setIsProcessing(false);
    }, 2000);
  };
  
  const handleParametersChange = (newParams: IParameters): void => {
    if (currentUser?.subscription === 'Free') {
      setIsParametersModalOpen(false);
      navigate('/dashboard/subscription');
      return;
    }
    
    setParameters(newParams);
    setIsParametersModalOpen(false);
  };
  
  const handleStartOver = (): void => {
    setIsStartOverModalOpen(false);
    
    if (!hasCredits) {
      navigate('/dashboard/subscription');
      return;
    }
    
    setOptimizedResume(undefined);
    
    if (id && updateResume) {
      updateResume(id, {
        status: 'pending',
        optimized: undefined
      });
    }
  };

  const handleContentUpdate = (): void => {
    if (!optimizedResume || !id || !updateResume) return;
    
    const updatedResume: IOptimizedResume = {
      ...optimizedResume,
      summary: editableContent.summary,
      skills: editableContent.skills
    };
    
    setOptimizedResume(updatedResume);
    updateResume(id, {
      optimized: updatedResume
    });
  };

  const handleSkillKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      setEditableContent({
        ...editableContent,
        skills: [...editableContent.skills, e.currentTarget.value.trim()]
      });
      e.currentTarget.value = '';
    }
  };

  const handleAddSkill = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const input = e.currentTarget.previousSibling as HTMLInputElement;
    if (input && input.value && input.value.trim()) {
      setEditableContent({
        ...editableContent,
        skills: [...editableContent.skills, input.value.trim()]
      });
      input.value = '';
    }
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

  const dummyResume: IOptimizedResume = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "555-123-4567",
    title: "Software Engineer",
    summary: "Experienced software engineer with expertise in React, Node.js, and cloud infrastructure.",
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
      }
    ],
    education: [
      {
        degree: "M.S. Computer Science",
        school: "Tech University",
        year: "2015"
      }
    ],
    skills: ["JavaScript", "React", "Node.js", "Express"],
    keywordMatches: 75,
    improvements: [
      "Added technical skills based on job requirements",
      "Enhanced project descriptions with metrics"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <DashboardNavigation />
      
      <div className="flex flex-col md:flex-row">
        <DashboardSidebar />
        
        <main className="flex-1 p-4">
          <div className="max-w-7xl mx-auto">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                          onClick={() => {}}
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
                      <ResumePreview resume={dummyResume} template="simple" />
                    )}
                  </div>
                </div>
              </div>

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
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Job Description
                          </label>
                          <div className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md h-40 overflow-y-auto">
                            {resume.jobDescription || "No job description provided."}
                          </div>
                        </div>
                        
                        <div className="pt-2">
                          <button
                            onClick={() => setIsParametersModalOpen(true)}
                            className="text-sm text-purple-400 hover:text-purple-300 mb-4 flex items-center"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                            </svg>
                            Customize Optimization Parameters
                            {currentUser?.subscription === 'Free' && (
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
                            This will use 1 credit. You have {currentUser?.credits || 0} credits remaining.
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
        {currentUser?.subscription === 'Free' && (
                          <span className="ml-2 text-xs bg-purple-900/50 text-purple-300 px-2 py-0.5 rounded-full">Pro</span>
                        )}
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="bg-green-900/20 border border-green-500/30 rounded-md p-4 mb-6">
                        <h3 className="text-green-400 font-medium mb-2 flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
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
                              <svg className="w-5 h-5 text-purple-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                              {improvement}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-3">Professional Summary</h3>
                          <textarea
                            value={editableContent.summary}
                            onChange={(e) => setEditableContent({...editableContent, summary: e.target.value})}
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white resize-none h-32"
                            placeholder="Professional summary..."
                          />
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-3">Core Skills</h3>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {editableContent.skills.map((skill, index) => (
                              <div key={index} className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1 text-sm flex items-center">
                                {skill}
                                <button
                                  onClick={() => {
                                    const newSkills = [...editableContent.skills];
                                    newSkills.splice(index, 1);
                                    setEditableContent({...editableContent, skills: newSkills});
                                  }}
                                  className="ml-2 text-gray-400 hover:text-white"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                  </svg>
                                </button>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex">
                            <input
                              type="text"
                              className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded-l-md text-white"
                              placeholder="Add a skill..."
                              onKeyDown={handleSkillKeyDown}
                            />
                            <button
                              onClick={handleAddSkill}
                              className="bg-gray-700 hover:bg-gray-600 text-white px-4 rounded-r-md border border-gray-700"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                        
                        <button
                          onClick={handleContentUpdate}
                          className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition"
                        >
                          Update Resume Content
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
      
      {/* Template Selection Modal */}
      <AnimatePresence>
        {isTemplateModalOpen && (
          <TemplateSelector 
            currentTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
            onClose={() => setIsTemplateModalOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Parameters Modal */}
      <AnimatePresence>
        {isParametersModalOpen && (
          <ParametersModal
            parameters={parameters}
            onChange={handleParametersChange}
            onClose={() => setIsParametersModalOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Custom Prompt Modal */}
      <AnimatePresence>
        {isCustomPromptModalOpen && (
          <CustomPromptModal
            onSubmit={handleImproveWithPrompt}
            onClose={() => setIsCustomPromptModalOpen(false)}
            isPro={currentUser?.subscription !== 'Free'}
          />
        )}
      </AnimatePresence>
      
      {/* Start Over Confirmation Modal */}
      <AnimatePresence>
        {isStartOverModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-gray-800 rounded-lg p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-semibold mb-4">Start Over</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to start over? This will reset your optimized resume and use another credit.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setIsStartOverModalOpen(false)}
                  className="flex-1 py-2 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStartOver}
                  className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
                >
                  Start Over
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeBuilder;
