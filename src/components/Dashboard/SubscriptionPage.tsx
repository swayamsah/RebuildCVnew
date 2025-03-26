import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useAuth, AuthContextType } from '../../context/AuthContext';
import DashboardNavigation from './DashboardNavigation';
import DashboardSidebar from './DashboardSidebar';

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  credits: number;
  features: string[];
  limitations?: string[];
  cta: string;
  disabled?: boolean;
  popular?: boolean;
}

interface FAQ {
  question: string;
  answer: string;
}

const SubscriptionPage: React.FC = () => {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const navigate = useNavigate();
  const auth = useAuth();
  
  if (!auth) {
    // Handle the case where auth context is not available
    return <div>Authentication context not available</div>;
  }
  
  const { currentUser, updateUser } = auth;

  if (!currentUser) {
    // Handle the case where user is not logged in
    return <div>Please log in to view subscription details</div>;
  }
  
  // Define subscription plans
  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      credits: 5,
      features: [
        'Basic ATS optimization',
        '5 resume optimizations',
        'Limited templates',
        'Basic keyword matching'
      ],
      limitations: [
        'No custom parameters',
        'No custom prompts',
        'No premium templates'
      ],
      cta: 'Current Plan',
      disabled: true
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$9.99',
      period: 'month',
      credits: 100,
      popular: true,
      features: [
        'Advanced ATS optimization',
        '100 resume optimizations',
        'All templates included',
        'Advanced keyword matching',
        'Custom optimization parameters',
        'Improve with custom prompts'
      ],
      cta: 'Upgrade Now',
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$29.99',
      period: 'month',
      credits: 500,
      features: [
        'Everything in Pro',
        '500 resume optimizations',
        'LinkedIn profile optimization',
        'Cover letter generation',
        'Priority support',
        'Job application tracking'
      ],
      cta: 'Upgrade',
    }
  ];
  
  // Open upgrade confirmation modal
  const handleUpgradeClick = (plan: Plan): void => {
    setSelectedPlan(plan);
    setIsUpgradeModalOpen(true);
  };
  
  // Handle upgrade confirmation
  const handleConfirmUpgrade = (): void => {
    // For testing purposes, we're just updating the user object
    // In a real app, this would make an API call to process payment
    updateUser({
      subscription: selectedPlan!.name,
      credits: selectedPlan!.credits,
      // Set expiration date to 30 days from now
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    });
    
    // Close modal and show success
    setIsUpgradeModalOpen(false);
    
    // Navigate back to dashboard
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  const faqs: FAQ[] = [
    {
      question: "How many credits do I need per resume?",
      answer: "Each resume optimization uses 1 credit. This includes the initial optimization and any further improvements you make with custom prompts."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. You'll continue to have access to your plan until the end of your billing period."
    },
    {
      question: "Do unused credits expire?",
      answer: "Credits remain valid as long as your subscription is active. If you downgrade or cancel, you'll have 30 days to use any remaining credits."
    },
    {
      question: "Can I upgrade my plan later?",
      answer: "Yes, you can upgrade your plan at any time. Your new benefits will be available immediately, and we'll prorate the cost based on your current billing cycle."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <DashboardNavigation />
      
      <div className="flex flex-col md:flex-row">
        <DashboardSidebar />
        
        <main className="flex-1 p-4">
          <div className="max-w-7xl mx-auto">
            {/* Header section */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold mb-2">Subscription & Credits</h2>
              <p className="text-gray-400">Manage your subscription and purchase credits</p>
              
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800/60 p-4 rounded-lg border border-gray-700">
                  <div className="text-gray-400 text-sm mb-1">Current Plan</div>
                  <div className="text-xl font-bold">{currentUser.subscription}</div>
                </div>
                
                <div className="bg-gray-800/60 p-4 rounded-lg border border-gray-700">
                  <div className="text-gray-400 text-sm mb-1">Credits Remaining</div>
                  <div className="text-xl font-bold">{currentUser.credits}</div>
                </div>
                
                {currentUser.subscription !== "Free" && (
                  <div className="bg-gray-800/60 p-4 rounded-lg border border-gray-700">
                    <div className="text-gray-400 text-sm mb-1">Expires On</div>
                    <div className="text-xl font-bold">
                      {currentUser.expiresAt ? new Date(currentUser.expiresAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                )}
                
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <div className="text-purple-400 text-sm mb-1">Need More Credits?</div>
                  <div className="text-gray-300 text-sm mb-2">
                    Upgrade your plan for more resume optimizations.
                  </div>
                  <button
                    onClick={() => window.scrollTo({ top: document.getElementById('plans')?.offsetTop! - 100, behavior: 'smooth' })}
                    className="text-sm bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded transition"
                  >
                    View Plans
                  </button>
                </div>
              </div>
            </div>
            
            {/* Subscription plans */}
            <div id="plans" className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden">
              <div className="p-6 border-b border-gray-800 bg-gray-900">
                <h3 className="text-xl font-medium">Choose Your Plan</h3>
                <p className="text-gray-400 mt-1">Select the plan that works best for you</p>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <div
                      key={plan.id}
                      className={`bg-gray-800/60 rounded-xl border relative ${
                        plan.popular
                          ? 'border-purple-500/50 shadow-lg shadow-purple-500/10'
                          : 'border-gray-700'
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-cyan-500 px-4 py-1 text-sm rounded-full">
                          Most Popular
                        </div>
                      )}
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                        <div className="flex items-end mb-4">
                          <div className="text-3xl font-bold">{plan.price}</div>
                          {plan.period !== 'forever' && (
                            <div className="text-gray-400 ml-1">/{plan.period}</div>
                          )}
                        </div>
                        
                        <div className="text-purple-400 font-medium mb-1">
                          {plan.credits} Resume Optimizations
                        </div>
                        
                        <ul className="space-y-2 mt-6 mb-8">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{feature}</span>
                            </li>
                          ))}
                          
                          {plan.limitations && plan.limitations.map((limitation, index) => (
                            <li key={`limit-${index}`} className="flex items-start">
                              <X className="w-5 h-5 text-gray-600 mr-2 flex-shrink-0" />
                              <span className="text-gray-500 text-sm">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <button
                          onClick={() => handleUpgradeClick(plan)}
                          disabled={plan.disabled}
                          className={`w-full py-2 rounded-md text-white font-medium ${
                            plan.disabled
                              ? 'bg-gray-700 cursor-not-allowed'
                              : plan.popular
                              ? 'bg-gradient-to-r from-purple-600 to-cyan-500 hover:shadow-lg hover:shadow-purple-500/20'
                              : 'bg-purple-600 hover:bg-purple-700'
                          } transition`}
                        >
                          {plan.cta}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 bg-gray-800/30 border border-gray-700 rounded-lg p-4 text-center">
                  <h4 className="font-medium mb-2">Need a Custom Plan?</h4>
                  <p className="text-gray-400 text-sm mb-4">
                    Contact us for enterprise pricing and custom solutions for your team or company.
                  </p>
                  <a 
                    href="mailto:support@rebuildcv.com" 
                    className="text-purple-400 hover:text-purple-300 font-medium"
                  >
                    Contact Sales →
                  </a>
                </div>
              </div>
            </div>
            
            {/* FAQ section */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden mt-6">
              <div className="p-6 border-b border-gray-800 bg-gray-900">
                <h3 className="text-xl font-medium">Frequently Asked Questions</h3>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="bg-gray-800/40 border border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium mb-2">{faq.question}</h4>
                      <p className="text-gray-400 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* Upgrade Modal */}
      {isUpgradeModalOpen && selectedPlan && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsUpgradeModalOpen(false)}
        >
          <motion.div 
            className="bg-gray-900 rounded-xl border border-gray-800 p-6 w-full max-w-md"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-4">Upgrade to {selectedPlan.name}</h2>
            
            <div className="bg-gray-800/60 rounded-lg p-4 border border-gray-700 mb-6">
              <div className="flex justify-between mb-2">
                <span>Plan:</span>
                <span className="font-medium">{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Price:</span>
                <span className="font-medium">{selectedPlan.price}/{selectedPlan.period}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Credits:</span>
                <span className="font-medium">{selectedPlan.credits}</span>
              </div>
              <div className="flex justify-between">
                <span>Billing cycle:</span>
                <span className="font-medium">Monthly</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-400 mb-6">
              By clicking "Confirm Upgrade", you agree to our Terms of Service and will be charged {selectedPlan.price} per {selectedPlan.period}.
              <br /><br />
              <strong className="text-white">FOR TESTING:</strong> Instead of charging your card, we'll instantly upgrade your account so you can test the premium features.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setIsUpgradeModalOpen(false)}
                className="flex-1 py-2 px-4 border border-gray-700 rounded-md bg-gray-800 hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmUpgrade}
                className="flex-1 py-2 px-4 border border-transparent rounded-md text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:shadow-lg hover:shadow-purple-500/20 transition"
              >
                Confirm Upgrade
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPage;
