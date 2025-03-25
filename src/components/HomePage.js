import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion';
import { ChevronRight, ArrowRight, Check, Star, Zap, Award, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Howitwork from './Howitwork';
import Pricing from './Pricing';
import Testimonials from './Testimonials';
import Footer from './Footer';
import Navigation from './Navigation';
import { useAuth } from '../context/AuthContext';
import ParticleBackground from './design/ParticleBackground';

// Animated particles background

// Typing animation component
const TypeWriter = ({ text, className }) => {
  const [displayText, setDisplayText] = useState('');
  const index = useRef(0);
  
  useEffect(() => {
    if (index.current < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayText(text.substring(0, index.current + 1));
        index.current += 1;
      }, 50);
      
      return () => clearTimeout(timeoutId);
    }
  }, [displayText, text]);
  
  return <span className={className}>{displayText}</span>;
};

// Floating elements animation
const FloatingElement = ({ children, delay = 0, duration = 4, y = 15 }) => {
  return (
    <motion.div
      animate={{ 
        y: [0, -y, 0],
        transition: {
          duration,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: Infinity,
          delay
        }
      }}
    >
      {children}
    </motion.div>
  );
};

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

// Animated resume mockup component for hero section
const ResumePreview = () => {
  return (
    <div className="relative rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 p-1 shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-2xl blur-xl"></div>
      <div className="relative bg-gray-900 rounded-lg overflow-hidden">
        {/* Resume header */}
        <div className="bg-gradient-to-r from-purple-600 to-cyan-500 p-6">
          <h3 className="text-2xl font-bold text-white">John Developer</h3>
          <p className="text-white/90">Senior Software Engineer</p>
          <div className="flex flex-wrap gap-3 mt-2 text-sm text-white/80">
            <span>john@example.com</span>
            <span>•</span>
            <span>(555) 123-4567</span>
          </div>
        </div>
        
        {/* Resume content */}
        <div className="p-6">
          {/* Summary section */}
          <div className="mb-4">
            <h4 className="text-lg font-bold mb-2 text-white">Summary</h4>
            <div className="h-3 bg-gray-800 rounded-full w-full mb-2"></div>
            <div className="h-3 bg-gray-800 rounded-full w-11/12 mb-2"></div>
            <div className="h-3 bg-gray-800 rounded-full w-3/4"></div>
          </div>
          
          {/* Skills section */}
          <div className="mb-4">
            <h4 className="text-lg font-bold mb-2 text-white">Skills</h4>
            <div className="flex flex-wrap gap-2 animate-pulse">
              <div className="px-3 py-1 bg-purple-900/30 rounded-md"></div>
              <div className="px-4 py-1 bg-cyan-900/30 rounded-md"></div>
              <div className="px-3 py-1 bg-purple-900/30 rounded-md"></div>
              <div className="px-5 py-1 bg-cyan-900/30 rounded-md"></div>
            </div>
          </div>
          
          {/* Experience section */}
          <div className="mb-4">
            <h4 className="text-lg font-bold mb-2 text-white">Experience</h4>
            <div>
              <div className="flex justify-between">
                <h5 className="font-bold text-white">Senior Developer</h5>
                <span className="text-sm text-gray-400">2020 - Present</span>
              </div>
              <p className="text-gray-400 mb-2">Tech Company</p>
              <div className="space-y-1">
                <div className="h-2 bg-gray-800 rounded-full w-full"></div>
                <div className="h-2 bg-gray-800 rounded-full w-11/12"></div>
                <div className="h-2 bg-gray-800 rounded-full w-3/4"></div>
              </div>
            </div>
          </div>
          
          {/* Animated highlight annotations */}
          <motion.div 
            className="absolute -top-2 -right-2 w-14 h-14 bg-cyan-500 rounded-full flex items-center justify-center text-white"
            animate={{ 
              scale: [1, 1.1, 1],
              boxShadow: ['0 0 0 rgba(8, 145, 178, 0.4)', '0 0 20px rgba(8, 145, 178, 0.7)', '0 0 0 rgba(8, 145, 178, 0.4)']
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          >
            <Zap className="w-6 h-6" />
          </motion.div>
          
          <motion.div 
            className="absolute bottom-4 -left-2 bg-purple-500 text-white text-xs px-2 py-1 rounded"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Keyword optimized!
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Main HomePage component
export default function HomePage() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const { currentUser } = useAuth();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Refs for sections
  const heroRef = useRef(null);
  
  // Stats for psychological impact - updated as requested
  const stats = [
    { value: "93%", label: "ATS Pass Rate", icon: <Star className="w-5 h-5 text-yellow-400" /> },
    { value: "2.5×", label: "More Callbacks", icon: <Zap className="w-5 h-5 text-cyan-400" /> },
    { value: "87%", label: "Keyword Match", icon: <Check className="w-5 h-5 text-green-400" /> },
    { value: "100K+", label: "Resumes Optimized", icon: <Award className="w-5 h-5 text-purple-400" /> }
  ];
  
  // Hide scroll indicator after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollIndicator(false);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="relative bg-gray-950 overflow-hidden">
      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-cyan-500 z-50 origin-left"
        style={{ scaleX }}
      />
      
      {/* Background particles effect */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground />
      </div>
      
      {/* Noise texture overlay */}
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none bg-repeat"></div>
      
      <Navigation />
      
      {/* Hero section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen pt-32 pb-20 overflow-hidden z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-gray-950 to-gray-950 z-0"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full filter blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white"
              >
                <TypeWriter
                  text="Transform Your Resume Into"
                  className=""
                />
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400 mt-2 block">
                  Your Career Superpower
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="text-xl text-gray-300 leading-relaxed"
              >
                Our AI-powered platform analyzes job descriptions to create perfectly tailored resumes that bypass ATS systems and catch recruiters' attention in <span className="text-cyan-400 font-semibold">8.2 seconds</span> - the average time spent reviewing each application.
              </motion.p>
              
              {/* Stats display */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="grid grid-cols-2 gap-6 my-8"
              >
                {stats.map((stat, index) => (
                  <FloatingElement key={index} delay={index * 0.2} y={8} duration={3 + index}>
                    <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-gray-800 hover:border-purple-500/50 transition group">
                      <div className="flex items-center gap-3 mb-2">
                        {stat.icon}
                        <span className="text-2xl font-bold text-white">{stat.value}</span>
                      </div>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                    </div>
                  </FloatingElement>
                ))}
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                {currentUser ? (
                  <Link
                    to="/dashboard"
                    className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-cyan-500 px-8 py-4 rounded-lg text-white font-medium text-lg hover:shadow-lg hover:shadow-purple-500/20 transition flex items-center justify-center gap-2 group"
                  >
                    <span className="relative z-10">Go to Dashboard</span>
                    <ChevronRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-cyan-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </Link>
                ) : (
                  <Link
                    to="/signup"
                    className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-cyan-500 px-8 py-4 rounded-lg text-white font-medium text-lg hover:shadow-lg hover:shadow-purple-500/20 transition flex items-center justify-center gap-2 group"
                  >
                    <span className="relative z-10">Try for Free</span>
                    <ChevronRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-cyan-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </Link>
                )}
                <a 
                  href="#pricing" 
                  className="relative overflow-hidden px-8 py-4 rounded-lg border border-gray-700 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700 transition text-lg font-medium flex items-center justify-center text-white group"
                >
                  <span className="relative z-10">View Pricing</span>
                  <div className="absolute inset-0 bg-gray-700 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                </a>
              </motion.div>
              
              {/* Trust signals */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.2 }}
                className="flex flex-col space-y-3 mt-6"
              >
                <div className="text-sm text-gray-400">Trusted by professionals across industries:</div>
                <div className="flex flex-wrap gap-6 items-center opacity-60">
                  <div className="h-6 w-20 bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-6 w-24 bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-6 w-16 bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-6 w-28 bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-6 w-20 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </motion.div>
            </div>
            
            {/* Resume Preview instead of 3D model */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden lg:block relative h-[500px] flex items-center justify-center"
            >
              <ResumePreview />
            </motion.div>
          </div>
        </div>
        
        {/* Scroll prompt */}
        {showScrollIndicator && (
          <ScrollPrompt />
        )}
      </section>
      
      {/* Value Proposition section */}
      <section className="relative py-20 z-10 overflow-hidden" id="features">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-gray-950 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Why Job Seekers <span className="text-cyan-400">Love</span> RebuildCV</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Our platform transforms the job application process with AI-powered precision.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Keyword Optimization",
                description: "Our algorithm identifies and incorporates the exact keywords that ATS systems prioritize.",
                icon: <div className="w-16 h-16 rounded-xl bg-purple-900/30 flex items-center justify-center mb-6 group-hover:bg-purple-800/50 transition text-purple-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012 2v0a2 2 0 002 2h0a2 2 0 012-2" />
                  </svg>
                </div>
              },
              {
                title: "Job-Specific Tailoring",
                description: "Each resume version is specifically engineered to match the exact requirements of your target position.",
                icon: <div className="w-16 h-16 rounded-xl bg-cyan-900/30 flex items-center justify-center mb-6 group-hover:bg-cyan-800/50 transition text-cyan-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                </div>
              },
              {
                title: "Real-time Analytics",
                description: "See exactly how your resume scores against job requirements with our match percentage technology.",
                icon: <div className="w-16 h-16 rounded-xl bg-purple-900/30 flex items-center justify-center mb-6 group-hover:bg-purple-800/50 transition text-purple-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 hover:border-cyan-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-cyan-900/20 hover:translate-y-[-5px]"
              >
                {feature.icon}
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials section */}
      <Testimonials />
      
      {/* CTA Section */}
      <section className="relative py-24 z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-purple-900/20 to- z-0"></div>
        
        {/* Animated background elements */}
        <div className="absolute w-full h-full overflow-hidden">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              x: ['-50%', '-30%', '-50%', '-70%', '-50%'],
              y: ['-50%', '-30%', '-50%', '-70%', '-50%'],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 top-1/2 w-[800px] h-[800px] border border-purple-500/10 rounded-full"
          />
          <motion.div
            animate={{ 
              rotate: [360, 0],
              x: ['-50%', '-40%', '-50%', '-60%', '-50%'],
              y: ['-50%', '-60%', '-50%', '-40%', '-50%'],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 top-1/2 w-[600px] h-[600px] border border-cyan-500/10 rounded-full"
          />
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 top-1/2 w-[400px] h-[400px] border border-purple-500/20 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="bg-gray-900/70 backdrop-blur-sm p-12 rounded-2xl border border-gray-800 text-center"
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="inline-block animate-bounce bg-gradient-to-r from-purple-600 to-cyan-500 p-4 rounded-full shadow-lg">
                <ArrowDown className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of successful job seekers who've optimized their resumes with RebuildCV
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              {currentUser ? (
                <Link
                  to="/dashboard"
                  className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium text-lg hover:shadow-lg hover:shadow-purple-500/20 transition group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Go to Dashboard
                    <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-700 to-cyan-600"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </Link>
              ) : (
                <Link
                  to="/signup"
                  className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium text-lg hover:shadow-lg hover:shadow-purple-500/20 transition group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Try RebuildCV for Free
                    <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-700 to-cyan-600"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </Link>
              )}
            </motion.div>
            
            <p className="mt-4 text-gray-400">
              No credit card required. One free resume optimization.
            </p>
          </motion.div>
        </div>
      </section>
      
      <div id="pricing">
        <Pricing />
      </div>
      <Howitwork />
      <Testimonials />
      <Footer />
      
      {/* Floating scroll-to-top button */}
      <motion.button
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-900/20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: scrollYProgress.get() > 0.2 ? 1 : 0,
          scale: scrollYProgress.get() > 0.2 ? 1 : 0
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.button>
    </div>
  );
}

