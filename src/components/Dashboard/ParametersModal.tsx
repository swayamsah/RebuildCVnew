import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IParameters } from '../../types';

export interface ParametersModalProps {
  parameters: IParameters;
  onChange: (params: IParameters) => void;
  onClose: () => void;
}

const ParametersModal: React.FC<ParametersModalProps> = ({ 
  parameters, 
  onChange, 
  onClose 
}) => {
  const [paramValues, setParamValues] = useState<IParameters>(parameters);
  
  const handleChange = (key: keyof IParameters, value: number): void => {
    setParamValues(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleSubmit = (): void => {
    onChange(paramValues);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        className="bg-gray-900 rounded-xl border border-gray-800 p-6 w-full max-w-md relative"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
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
          </div>
          
          {/* Add other parameter sliders here */}
          
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
      </motion.div>
    </div>
  );
};

export default ParametersModal;
