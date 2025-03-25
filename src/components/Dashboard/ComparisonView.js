import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaArrowLeft, FaDownload } from 'react-icons/fa';
import DashboardNavigation from './DashboardNavigation';
import DashboardSidebar from './DashboardSidebar';
import ResumePreview from './ResumePreview';

const ComparisonView = () => {
  const { id } = useParams();
  const { getResumeById } = useAuth();
  const [resume, setResume] = useState(null);
  const [activeTab, setActiveTab] = useState('side-by-side');

  // Load resume data
  useEffect(() => {
    const resumeData = getResumeById(id);
    if (resumeData) {
      setResume(resumeData);
    }
  }, [id, getResumeById]);

  if (!resume || !resume.optimized) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // Sample original resume data (would be stored in the real app)
  const originalResume = {
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
  };

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
                  to={`/dashboard/resume/${id}`} 
                  className="mr-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
                >
                  <FaArrowLeft />
                </Link>
                <div>
                  <h2 className="text-xl font-bold">Resume Comparison</h2>
                  <p className="text-gray-400">{resume.jobTitle} at {resume.jobCompany}</p>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-4 sm:mt-0">
                <button
                  onClick={() => {}}
                  className="p-2 px-4 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-md text-white hover:shadow-lg hover:shadow-purple-500/20 transition flex items-center"
                >
                  <FaDownload className="mr-2" /> Download Optimized
                </button>
              </div>
            </div>

            {/* Tab navigation */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden mb-6">
              <div className="flex border-b border-gray-800">
                <button
                  className={`flex-1 py-3 text-center ${activeTab === 'side-by-side' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setActiveTab('side-by-side')}
                >
                  Side by Side
                </button>
                <button
                  className={`flex-1 py-3 text-center ${activeTab === 'diff-view' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setActiveTab('diff-view')}
                >
                  Differences
                </button>
              </div>
            </div>

            {/* Resume comparison content */}
            {activeTab === 'side-by-side' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Original Resume */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-800 bg-gray-900">
                    <h3 className="font-medium">Original Resume</h3>
                  </div>
                  <div className="p-4">
                    <div className="h-[calc(100vh-250px)] overflow-y-auto custom-scrollbar">
                      <ResumePreview resume={originalResume} template="simple" />
                    </div>
                  </div>
                </div>
                
                {/* Optimized Resume */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-800 bg-gray-900">
                    <h3 className="font-medium">Optimized Resume</h3>
                  </div>
                  <div className="p-4">
                    <div className="h-[calc(100vh-250px)] overflow-y-auto custom-scrollbar">
                      <ResumePreview resume={resume.optimized} template="modern" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-800 bg-gray-900">
                  <h3 className="font-medium">Key Differences</h3>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-purple-400 mb-3">Summary</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-800/50 p-4 rounded-md border border-gray-700">
                        <div className="text-xs text-gray-400 mb-2">Original:</div>
                        <p className="text-gray-300">{originalResume.summary}</p>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-md border border-gray-700 relative">
                        <div className="text-xs text-gray-400 mb-2">Optimized:</div>
                        <p className="text-gray-300">{resume.optimized.summary}</p>
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          Improved
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-purple-400 mb-3">Skills</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-800/50 p-4 rounded-md border border-gray-700">
                        <div className="text-xs text-gray-400 mb-2">Original Skills:</div>
                        <div className="flex flex-wrap gap-2">
                          {originalResume.skills.map((skill, index) => (
                            <span key={index} className="bg-gray-700 px-2 py-1 rounded-md text-sm text-gray-300">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-md border border-gray-700 relative">
                        <div className="text-xs text-gray-400 mb-2">Optimized Skills:</div>
                        <div className="flex flex-wrap gap-2">
                          {resume.optimized.skills.map((skill, index) => {
                            const isNew = !originalResume.skills.includes(skill);
                            return (
                              <span 
                                key={index} 
                                className={`${isNew ? 'bg-green-900/40 text-green-300 border-green-500/30' : 'bg-gray-700 text-gray-300'} px-2 py-1 rounded-md text-sm border`}
                              >
                                {skill} {isNew && <span className="text-xs">+</span>}
                              </span>
                            );
                          })}
                        </div>
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          Optimized
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-purple-400 mb-3">Key Improvements</h4>
                    <ul className="space-y-2">
                      {resume.optimized.improvements.map((improvement, index) => (
                        <li key={index} className="flex items-start bg-gray-800/50 p-3 rounded-md border border-gray-700">
                          <svg className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ComparisonView;
