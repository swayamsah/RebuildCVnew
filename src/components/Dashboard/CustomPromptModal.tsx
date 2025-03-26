import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export interface CustomPromptModalProps {
  onSubmit: (prompt: string) => void;
  onClose: () => void;
  isPro: boolean;
}

const CustomPromptModal: React.FC<CustomPromptModalProps> = ({
  onSubmit,
  onClose,
  isPro
}) => {
  const [prompt, setPrompt] = useState<string>('');

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt.trim());
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        className="bg-gray-900 rounded-xl border border-gray-800 p-6 w-full max-w-md"
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

        <h2 className="text-2xl font-bold mb-2">Customize Improvement</h2>
        <p className="text-gray-400 mb-6">
          Tell us how you'd like to improve your resume
        </p>

        {!isPro ? (
          <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
            <h3 className="text-lg font-medium text-purple-400 mb-2">Pro Feature</h3>
            <p className="text-gray-300 mb-4">
              Custom prompts are available on the Pro plan. Upgrade to access this feature.
            </p>
            <Link
              to="/dashboard/subscription"
              className="block w-full py-2 text-center bg-gradient-to-r from-purple-600 to-cyan-500 rounded-md text-white hover:shadow-lg hover:shadow-purple-500/20 transition"
            >
              Upgrade to Pro
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Add more emphasis on leadership skills, Make technical achievements more prominent..."
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white resize-none h-32 mb-4"
            />
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 px-4 border border-gray-700 rounded-md bg-gray-800 hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 px-4 border border-transparent rounded-md text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:shadow-lg hover:shadow-purple-500/20 transition"
                disabled={!prompt.trim()}
              >
                Improve Resume
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default CustomPromptModal;
