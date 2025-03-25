import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const FlipCard = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [autoFlip, setAutoFlip] = useState(true);
    const [messageIndex, setMessageIndex] = useState(0);
    const flipTimerRef = useRef(null);
    
    const messages = [
      "We analyze job descriptions to find the exact keywords needed",
      "Our AI tailors your resume to highlight the skills employers want",
      "Land more interviews with personalized, ATS-optimized resumes",
      "88% of our users get more interviews within two weeks"
    ];
    
    useEffect(() => {
      if (autoFlip) {
        flipTimerRef.current = setInterval(() => {
          setIsFlipped(prev => !prev);
          
          if (!isFlipped) {
            setMessageIndex(prev => (prev + 1) % messages.length);
          }
        }, 4000);
      }
      
      return () => {
        if (flipTimerRef.current) clearInterval(flipTimerRef.current);
      };
    }, [autoFlip, isFlipped, messages.length]);
    
    const handleCardClick = () => {
      setAutoFlip(false);
      setIsFlipped(prev => !prev);
      
      if (flipTimerRef.current) {
        clearInterval(flipTimerRef.current);
      }
    };
    
    return (
      <div 
        className="w-72 h-72 cursor-pointer perspective-1000 mx-auto mb-12"
        onClick={handleCardClick}
      >
        <motion.div
          className="relative w-full h-full transition-all duration-700"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front of card */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-2xl flex flex-col items-center justify-center p-6 shadow-xl backface-hidden border border-purple-400/30"
          >
            <div className="text-8xl font-bold text-white mb-4">R</div>
            <div className="text-3xl font-bold text-white text-center">RebuildCV</div>
            <div className="text-white/80 mt-2 text-center">Click to discover how we revolutionize your job search</div>
            <div className="absolute bottom-4 right-4 animate-pulse">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
          </div>
          
          {/* Back of card */}
          <div 
            className="absolute inset-0 bg-gray-900 rounded-2xl flex flex-col items-center justify-center p-8 backface-hidden border border-cyan-500/30 shadow-xl"
            style={{ transform: "rotateY(180deg)" }}
          >
            <div className="text-xl font-bold text-white mb-4 text-center">{messages[messageIndex]}</div>
            <div className="mt-auto">
              <div className="flex gap-2 justify-center">
                {messages.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`w-2 h-2 rounded-full ${idx === messageIndex ? 'bg-cyan-400' : 'bg-gray-600'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

export default FlipCard;