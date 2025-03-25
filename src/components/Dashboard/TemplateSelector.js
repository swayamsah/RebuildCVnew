import React from 'react';
import { X } from 'lucide-react';

const TemplateSelector = ({ currentTemplate, onSelectTemplate, onClose }) => {
  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and contemporary with a colorful header gradient',
      isPro: false,
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Traditional and elegant for corporate applications',
      isPro: true,
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold and distinctive for design roles',
      isPro: true,
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple and understated for a clean look',
      isPro: false,
    },
    {
      id: 'simple',
      name: 'Simple',
      description: 'Basic layout with clear sections',
      isPro: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 w-full max-w-2xl relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-4">Choose a Template</h2>
        <p className="text-gray-400 mb-6">Select a template that best matches your personal style and target industry</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {templates.map((template) => (
            <div 
              key={template.id}
              onClick={() => onSelectTemplate(template.id)}
              className={`
                border rounded-lg p-4 cursor-pointer transition
                ${currentTemplate === template.id 
                  ? 'border-purple-500 bg-purple-900/20' 
                  : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
                }
              `}
            >
              <div className="aspect-w-8 aspect-h-11 mb-3">
                <div className={`w-full h-full rounded border ${
                  template.id === 'modern' ? 'bg-gradient-to-r from-purple-600 to-cyan-500' : 
                  template.id === 'professional' ? 'bg-blue-900' :
                  template.id === 'creative' ? 'bg-cyan-500' :
                  'bg-gray-200 dark:bg-gray-700'
                }`}>
                  <div className="h-3 w-1/2 bg-white/20 rounded m-1"></div>
                  <div className="h-2 w-1/3 bg-white/20 rounded m-1"></div>
                  <div className="h-1 w-2/3 bg-white/10 rounded m-1"></div>
                  <div className="mt-2 mx-1 h-12 bg-white dark:bg-gray-900 rounded"></div>
                </div>
              </div>
              <h3 className="font-medium">{template.name}</h3>
              <p className="text-xs text-gray-400 mt-1">{template.description}</p>
              {template.isPro && (
                <span className="mt-2 inline-block px-2 py-1 text-xs bg-purple-900/50 text-purple-300 rounded-full border border-purple-500/30">
                  Pro
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
