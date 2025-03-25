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
import { 
  IResume, 
  IOptimizedResume, 
  IParameters, 
  IEditableContent,
  IAuthContext
} from '../../types';

const ResumeBuilder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getResumeById, updateResume, useCredit, currentUser } = useAuth() as IAuthContext;
  
  const hasCredits = useCredit();
  
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
  
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (optimizedResume) {
      setEditableContent({
        summary: optimizedResume.summary,
        skills: [...optimizedResume.skills]
      });
    }
  }, [optimizedResume]);
  
  useEffect(() => {
    const loadResume = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);
        
        if (!id) {
          navigate('/dashboard');
          return;
        }

        const resumeData = getResumeById(id);
        if (resumeData) {
          setResume(resumeData);
          
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
  }, [id, getResumeById, navigate]);
  
  const handleStartOver = (): void => {
    setIsStartOverModalOpen(false);
    
    if (!hasCredits) {
      navigate('/dashboard/subscription');
      return;
    }
    
    setOptimizedResume(undefined);
    
    if (id) {
      updateResume(id, {
        status: 'pending',
        optimized: undefined
      });
    }
  };

  const handleContentUpdate = (): void => {
    if (!optimizedResume || !id) return;
    
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

  // ... rest of the component remains the same ...

  return (
    // ... JSX remains the same ...
  );
};

export default ResumeBuilder;
