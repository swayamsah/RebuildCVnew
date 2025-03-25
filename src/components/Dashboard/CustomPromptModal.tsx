import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface CustomPromptModalProps {
  onSubmit: (prompt: string) => void;
  onClose: () => void;
  isPremium: boolean;
}

const CustomPromptModal: React.FC<CustomPromptModalProps> = ({ onSubmit, onClose, isPremium }) => {
  const [prompt, setPrompt] = useState<string>('');
  
  const handleSubmit = (): void => {
    if (prompt.trim()) {
      onSubmit(prompt);
    }
  };

  // Suggest some example prompts
  const examplePrompts: string[] = [
    "Add more quantifiable achievements to my experience section",
    "Make my resume more focused on leadership and team management",
    "Highlight my customer service skills more prominently",
    "Emphasize my experience with data analysis and visualization",
    "Add more industry-specific terminology relevant to the job"
  ];

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
        
        <h2 className="text-2xl font-bold mb-2">Improve Your Resume</h2>
        <p className="text-gray-400 mb-4">Tell us how you'd like to improve your resume</p>
        
        {!isPremium ? (
          <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30 mb-6">
            <h3 className="text-lg font-medium text-purple-400 mb-2">Pro Feature</h3>
            <p className="text-gray-300 mb-4">
              Custom improvement prompts are available on the Pro plan. Upgrade to access this feature.
            </p>
            <Link 
              to="/dashboard/subscription" 
              className="block w-full py-2 text-center bg-gradient-to-r from-purple-600 to-cyan-500 rounded-md text-white hover:shadow-lg hover:shadow-purple-500/20 transition"
            >
              Upgrade to Pro
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <textarea
                value={prompt}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
                placeholder="Describe how you'd like to improve your resume..."
                className="w-full px-3 py-2 h-32 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-300 mb-2">Examples:</h3>
              <div className="space-y-2">
                {examplePrompts.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(example)}
                    className="block w-full text-left text-sm text-purple-400 hover:text-purple-300 transition px-2 py-1 rounded hover:bg-purple-900/20"
                  >
                    "{example}"
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 py-2 px-4 border border-gray-700 rounded-md bg-gray-800 hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!prompt.trim()}
                className="flex-1 py-2 px-4 border border-transparent rounded-md text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:shadow-lg hover:shadow-purple-500/20 transition disabled:opacity-50"
              >
                Apply Improvements
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default CustomPromptModal;
