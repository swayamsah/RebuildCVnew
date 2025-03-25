import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ParametersModal = ({ parameters, onUpdateParameters, onClose, isPremium }) => {
  const [paramValues, setParamValues] = useState(parameters);
  
  const handleChange = (key, value) => {
    setParamValues(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleSubmit = () => {
    onUpdateParameters(paramValues);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        className="bg-gray-900 rounded-xl border border-gray-800 p-6 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.4 }}
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-2">Optimization Parameters</h2>
        <p className="text-gray-400 mb-6">Customize how your resume is optimized</p>
        
        {!isPremium ? (
          <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30 mb-6">
            <h3 className="text-lg font-medium text-purple-400 mb-2">Pro Feature</h3>
            <p className="text-gray-300 mb-4">
              Custom optimization parameters are available on the Pro plan. Upgrade to access this feature.
            </p>
            <Link 
              to="/dashboard/subscription" 
              className="block w-full py-2 text-center bg-gradient-to-r from-purple-600 to-cyan-500 rounded-md text-white hover:shadow-lg hover:shadow-purple-500/20 transition"
            >
              Upgrade to Pro
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-300">Keyword Emphasis</span>
                <span className="text-sm text-gray-400">{paramValues.keywordEmphasis}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={paramValues.keywordEmphasis}
                onChange={(e) => handleChange('keywordEmphasis', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Subtle</span>
                <span>Balanced</span>
                <span>Prominent</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-300">Content Length</span>
                <span className="text-sm text-gray-400">{paramValues.briefnessFactor}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={paramValues.briefnessFactor}
                onChange={(e) => handleChange('briefnessFactor', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Concise</span>
                <span>Balanced</span>
                <span>Detailed</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-300">Technical Detail</span>
                <span className="text-sm text-gray-400">{paramValues.technicalDetail}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={paramValues.technicalDetail}
                onChange={(e) => handleChange('technicalDetail', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Simplified</span>
                <span>Balanced</span>
                <span>Technical</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-300">Experience vs. Skills</span>
                <span className="text-sm text-gray-400">{paramValues.experienceHighlight}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={paramValues.experienceHighlight}
                onChange={(e) => handleChange('experienceHighlight', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Skills Focus</span>
                <span>Balanced</span>
                <span>Experience Focus</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-300">Skills Emphasis</span>
                <span className="text-sm text-gray-400">{paramValues.skillsEmphasis}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={paramValues.skillsEmphasis}
                onChange={(e) => handleChange('skillsEmphasis', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Core Skills</span>
                <span>Balanced</span>
                <span>All Skills</span>
              </div>
            </div>
            
            <div className="flex space-x-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 py-2 px-4 border border-gray-700 rounded-md bg-gray-800 hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-2 px-4 border border-transparent rounded-md text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:shadow-lg hover:shadow-purple-500/20 transition"
              >
                Apply Changes
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ParametersModal;
