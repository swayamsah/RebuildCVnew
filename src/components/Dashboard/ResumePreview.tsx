import React from 'react';
import { IOptimizedResume } from '../../types';

interface TemplateStyle {
  fontFamily: string;
  headerBg: string;
  headerText: string;
  bodyBg: string;
  bodyText: string;
  accentColor: string;
  spacing: string;
}

interface TemplateStyles {
  [key: string]: TemplateStyle;
}

interface ResumePreviewProps {
  resume: IOptimizedResume;
  template: string;
}

// Resume preview component that shows different templates
const ResumePreview: React.FC<ResumePreviewProps> = ({ resume, template }) => {
  // Different template styles
  const templateStyles: TemplateStyles = {
    simple: {
      fontFamily: 'system-ui, sans-serif',
      headerBg: 'bg-gray-100 dark:bg-gray-800',
      headerText: 'text-gray-900 dark:text-white',
      bodyBg: 'bg-white dark:bg-gray-900',
      bodyText: 'text-gray-700 dark:text-gray-300',
      accentColor: 'bg-gray-200 dark:bg-gray-700',
      spacing: 'p-6',
    },
    modern: {
      fontFamily: 'system-ui, sans-serif',
      headerBg: 'bg-gradient-to-r from-purple-600 to-cyan-500',
      headerText: 'text-white',
      bodyBg: 'bg-white dark:bg-gray-900',
      bodyText: 'text-gray-700 dark:text-gray-300',
      accentColor: 'bg-purple-100 dark:bg-purple-900/20',
      spacing: 'p-0',
    },
    professional: {
      fontFamily: 'Georgia, serif',
      headerBg: 'bg-blue-900',
      headerText: 'text-white',
      bodyBg: 'bg-white dark:bg-gray-900',
      bodyText: 'text-gray-800 dark:text-gray-200',
      accentColor: 'bg-blue-50 dark:bg-blue-900/20',
      spacing: 'p-4',
    },
    creative: {
      fontFamily: 'system-ui, sans-serif',
      headerBg: 'bg-cyan-500',
      headerText: 'text-white',
      bodyBg: 'bg-white dark:bg-gray-900',
      bodyText: 'text-gray-700 dark:text-gray-300',
      accentColor: 'bg-cyan-50 dark:bg-cyan-900/20',
      spacing: 'p-6',
    },
    minimal: {
      fontFamily: 'system-ui, sans-serif',
      headerBg: 'bg-white dark:bg-gray-900',
      headerText: 'text-gray-900 dark:text-white',
      bodyBg: 'bg-white dark:bg-gray-900',
      bodyText: 'text-gray-700 dark:text-gray-300',
      accentColor: 'bg-gray-50 dark:bg-gray-800',
      spacing: 'p-6',
    },
  };

  const style = templateStyles[template] || templateStyles.simple;

  return (
    <div className={`border rounded-lg overflow-hidden shadow-sm text-left ${style.bodyBg}`}>
      <div className={`${style.headerBg} ${style.spacing}`}>
        <h1 className={`text-2xl font-bold ${style.headerText}`}>{resume.name}</h1>
        <p className={`${style.headerText} opacity-90`}>{resume.title}</p>
        <div className={`flex flex-wrap gap-3 mt-2 text-sm ${style.headerText} opacity-80`}>
          <span>{resume.email}</span>
          <span>•</span>
          <span>{resume.phone}</span>
        </div>
      </div>
      
      <div className={`${style.spacing}`}>
        <div className="mb-4">
          <h2 className={`text-lg font-bold mb-2 ${style.bodyText}`}>Summary</h2>
          <p className={`${style.bodyText}`}>{resume.summary}</p>
        </div>
        
        <div className="mb-4">
          <h2 className={`text-lg font-bold mb-2 ${style.bodyText}`}>Experience</h2>
          {resume.experience.map((exp, index) => (
            <div key={index} className={`mb-3 ${index > 0 ? 'mt-4' : ''}`}>
              <div className="flex justify-between items-start">
                <h3 className={`font-bold ${style.bodyText}`}>{exp.title}</h3>
                <span className={`text-sm ${style.bodyText} opacity-75`}>{exp.period}</span>
              </div>
              <p className={`${style.bodyText} opacity-90 mb-1`}>{exp.company}</p>
              <ul className={`list-disc list-inside space-y-1 ${style.bodyText} text-sm`}>
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mb-4">
          <h2 className={`text-lg font-bold mb-2 ${style.bodyText}`}>Education</h2>
          {resume.education.map((edu, index) => (
            <div key={index} className={`mb-2 ${index > 0 ? 'mt-3' : ''}`}>
              <div className="flex justify-between">
                <h3 className={`font-bold ${style.bodyText}`}>{edu.degree}</h3>
                <span className={`text-sm ${style.bodyText} opacity-75`}>{edu.year}</span>
              </div>
              <p className={`${style.bodyText} opacity-90`}>{edu.school}</p>
            </div>
          ))}
        </div>
        
        <div>
          <h2 className={`text-lg font-bold mb-2 ${style.bodyText}`}>Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, index) => (
              <span key={index} className={`${style.accentColor} px-2 py-1 rounded-md text-sm ${style.bodyText}`}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
