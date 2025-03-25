import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

// Scroll prompt animation
const ScrollPrompt = () => {
    return (
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.8 }}
      >
        <p className="text-sm mb-2 text-gray-300">Scroll to explore</p>
        <motion.div
          animate={{ 
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
        >
          <ArrowDown className="w-5 h-5 text-white" />
        </motion.div>
      </motion.div>
    );
  };

export default ScrollPrompt;
