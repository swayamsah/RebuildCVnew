import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardNavigation from './DashboardNavigation';
import DashboardSidebar from './DashboardSidebar';
import { useAuth } from '../../context/AuthContext';
import { Mail, MessageCircle, FileText, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { IUser } from '../../types';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface FAQCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  faqs: FAQ[];
}

interface ContactFormData {
  subject: string;
  message: string;
}

interface AuthContextExtended {
  currentUser: IUser;
}

const HelpPage: React.FC = () => {
  const { currentUser } = useAuth() as AuthContextExtended;
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('getting-started');
  const [expandedFaqs, setExpandedFaqs] = useState<string[]>([]);
  const [contactFormData, setContactFormData] = useState<ContactFormData>({
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Toggle FAQ expansion
  const toggleFaq = (faqId: string): void => {
    if (expandedFaqs.includes(faqId)) {
      setExpandedFaqs(expandedFaqs.filter(id => id !== faqId));
    } else {
      setExpandedFaqs([...expandedFaqs, faqId]);
    }
  };

  // Handle contact form input changes
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setContactFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle contact form submission
  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // In a real app, this would submit the form to a backend API
    // For now, just show success message
    setFormSubmitted(true);
    
    // Reset form
    setTimeout(() => {
      setContactFormData({
        subject: '',
        message: ''
      });
      setFormSubmitted(false);
    }, 5000);
  };

  // FAQ data
  const faqCategories: FAQCategory[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <FileText className="w-5 h-5" />,
      faqs: [
        {
          id: 'gs-1',
          question: 'How do I optimize my first resume?',
          answer: 'To optimize your first resume, navigate to the dashboard and click "Create New Resume". Upload your existing resume, enter the job details, and click "Optimize Resume". Our AI will analyze your resume against the job description and optimize it for you.'
        },
        {
          id: 'gs-2',
          question: 'What file formats are supported?',
          answer: 'We currently support PDF, DOC, and DOCX file formats for resume uploads. For job descriptions, you can either paste the text directly or upload PDF, DOC, DOCX, or TXT files.'
        },
        {
          id: 'gs-3',
          question: 'How long does optimization take?',
          answer: 'The optimization process typically takes 30-60 seconds, depending on the complexity of your resume and the job description. Once complete, youll be able to view, edit, and download your optimized resume.'
        },
        {
          id: 'gs-4',
          question: 'How many credits do I need?',
          answer: 'Each resume optimization requires 1 credit. You can view your remaining credits on the dashboard or in the subscription page. Free users get 5 credits, Pro users get 100 credits, and Premium users get 500 credits.'
        }
      ]
    },
    {
      id: 'customization',
      title: 'Customization',
      icon: <MessageCircle className="w-5 h-5" />,
      faqs: [
        {
          id: 'cust-1',
          question: 'Can I customize the optimization parameters?',
          answer: 'Yes, Pro and Premium users can adjust optimization parameters such as keyword emphasis, content length, technical detail level, and more. These options appear before optimization or can be accessed by clicking "Adjust Parameters" after optimization.'
        },
        {
          id: 'cust-2',
          question: 'How do I change the resume template?',
          answer: 'After optimizing your resume, click the template icon in the toolbar above your resume. This will open the template selector where you can choose from various designs. Some templates are only available to Pro and Premium users.'
        },
        {
          id: 'cust-3',
          question: 'Can I edit my optimized resume?',
          answer: 'Yes, after optimization, you can edit any part of your resume content. The editing panel will appear on the right side of the screen where you can modify sections like your summary, experience, and skills.'
        },
        {
          id: 'cust-4',
          question: 'What is the "Improve Further" feature?',
          answer: 'The "Improve Further" feature allows you to provide custom instructions to further refine your resume. For example, you can ask to emphasize specific skills or experiences. This feature is available to Pro and Premium users.'
        }
      ]
    },
    {
      id: 'account',
      title: 'Account & Billing',
      icon: <Mail className="w-5 h-5" />,
      faqs: [
        {
          id: 'acc-1',
          question: 'How do I upgrade my subscription?',
          answer: 'To upgrade your subscription, go to the Subscription page from the sidebar menu. There, you ll see available plans and can select the one that best suits your needs. Follow the prompts to complete the payment process.'
        },
        {
          id: 'acc-2',
          question: 'Can I cancel my subscription?',
          answer: 'Yes, you can cancel your subscription at any time from the Settings page. Your subscription will remain active until the end of your current billing period. Any unused credits will remain available for 30 days after cancellation.'
        },
        {
          id: 'acc-3',
          question: 'How do I update my payment information?',
          answer: 'You can update your payment information in the Settings page under the "Billing Information" section. This allows you to change your credit card, billing address, or other payment details.'
        },
        {
          id: 'acc-4',
          question: 'Do you offer refunds?',
          answer: 'We offer a 7-day money-back guarantee for new subscribers. If youre not satisfied with our service, contact our support team within 7 days of your initial purchase for a full refund. After this period, refunds are considered on a case-by-case basis.'
        }
      ]
    }
  ];

  // Filter FAQs based on search query
  const filteredFaqs = searchQuery
    ? faqCategories.flatMap(category => 
        category.faqs.filter(faq => 
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        ).map(faq => ({ ...faq, category: category.title }))
      )
    : [];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <DashboardNavigation />
      
      <div className="flex flex-col md:flex-row">
        <DashboardSidebar />
        
        <main className="flex-1 p-4">
          <div className="max-w-4xl mx-auto">
            {/* Header section */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold mb-2">Help & Support</h2>
              <p className="text-gray-400">Find answers to common questions or contact our support team</p>
              
              {/* Search bar */}
              <div className="mt-6 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="Search for help with keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Search results */}
            {searchQuery && (
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden mb-6">
                <div className="p-4 border-b border-gray-800 bg-gray-900">
                  <h3 className="font-medium">Search Results</h3>
                </div>
                
                <div className="p-4">
                  {filteredFaqs.length > 0 ? (
                    <div className="space-y-3">
                      {filteredFaqs.map((faq) => (
                        <div 
                          key={faq.id} 
                          className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition cursor-pointer"
                          onClick={() => toggleFaq(faq.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="text-sm text-purple-400 mb-1">{faq.category}</div>
                              <h4 className="font-medium">{faq.question}</h4>
                            </div>
                            <div className="ml-2 mt-1">
                              {expandedFaqs.includes(faq.id) ? (
                                <ChevronDown className="h-5 w-5 text-gray-400" />
                              ) : (
                                <ChevronRight className="h-5 w-5 text-gray-400" />
                              )}
                            </div>
                          </div>
                          
                          {expandedFaqs.includes(faq.id) && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              transition={{ duration: 0.3 }}
                              className="mt-2 text-sm text-gray-300"
                            >
                              {faq.answer}
                            </motion.div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400 mb-2">No results found for "{searchQuery}"</p>
                      <p className="text-sm text-gray-500">Try different keywords or contact our support team</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {!searchQuery && (
              <>
                {/* FAQ Categories */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {faqCategories.map((category) => (
                    <div
                      key={category.id}
                      className={`
                        p-4 rounded-lg border cursor-pointer transition
                        ${activeCategory === category.id 
                          ? 'bg-purple-900/20 border-purple-500/30' 
                          : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'
                        }
                      `}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      <div className="flex items-center mb-2">
                        <div className={`
                          w-8 h-8 rounded-full flex items-center justify-center mr-2
                          ${activeCategory === category.id 
                            ? 'bg-purple-900/50 text-purple-400' 
                            : 'bg-gray-800 text-gray-400'
                          }
                        `}>
                          {category.icon}
                        </div>
                        <h3 className="font-medium">{category.title}</h3>
                      </div>
                      <p className="text-sm text-gray-400">
                        {category.faqs.length} articles
                      </p>
                    </div>
                  ))}
                </div>
                
                {/* FAQ Content */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden mb-6">
                  <div className="p-4 border-b border-gray-800 bg-gray-900">
                    <h3 className="font-medium">
                      {faqCategories.find(cat => cat.id === activeCategory)?.title} FAQs
                    </h3>
                  </div>
                  
                  <div className="p-4">
                    <div className="space-y-3">
                      {faqCategories
                        .find(cat => cat.id === activeCategory)
                        ?.faqs.map((faq) => (
                          <div 
                            key={faq.id} 
                            className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition cursor-pointer"
                            onClick={() => toggleFaq(faq.id)}
                          >
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">{faq.question}</h4>
                              <div>
                                {expandedFaqs.includes(faq.id) ? (
                                  <ChevronDown className="h-5 w-5 text-gray-400" />
                                ) : (
                                  <ChevronRight className="h-5 w-5 text-gray-400" />
                                )}
                              </div>
                            </div>
                            
                            {expandedFaqs.includes(faq.id) && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                transition={{ duration: 0.3 }}
                                className="mt-3 text-sm text-gray-300"
                              >
                                {faq.answer}
                              </motion.div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                
                {/* Contact support section */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden">
                  <div className="p-6 border-b border-gray-800 bg-gray-900">
                    <h3 className="text-xl font-medium">Still Need Help?</h3>
                  </div>
                  
                  <div className="p-6">
                    {formSubmitted ? (
                      <div className="bg-green-900/20 border border-green-500/30 rounded-md p-4 mb-6">
                        <h4 className="text-green-400 font-medium mb-2">Message Sent!</h4>
                        <p className="text-sm text-gray-300">
                          Thank you for contacting us. Our support team will get back to you within 24 hours.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                            Subject
                          </label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={contactFormData.subject}
                            onChange={handleContactChange}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                            Message
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={contactFormData.message}
                            onChange={handleContactChange}
                            rows={5}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                            required
                          ></textarea>
                        </div>
                        
                        <div className="pt-2">
                          <button
                            type="submit"
                            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-md text-white hover:shadow-lg hover:shadow-purple-500/20 transition"
                          >
                            Send Message
                          </button>
                          
                          <p className="mt-4 text-sm text-gray-400">
                            You can also email us directly at{' '}
                            <a href="mailto:support@rebuildcv.com" className="text-purple-400 hover:text-purple-300">
                              support@rebuildcv.com
                            </a>
                          </p>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HelpPage;
