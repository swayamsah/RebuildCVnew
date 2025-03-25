import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Settings, User, Bell, Menu } from 'lucide-react';
import { IAuthContext } from '../../types';

interface User {
  name?: string;
}

const DashboardNavigation: React.FC = () => {
  const { currentUser, logout } = useAuth() as IAuthContext;
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  
  // Add fallback values for user data
  const userName = (currentUser as User)?.name || 'User';
  const userInitial = userName.charAt(0).toUpperCase();
  
  return (
    <nav className="border-b border-gray-800 backdrop-blur-lg bg-gray-950/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
              RebuildCV
            </Link>
            
            {/* Mobile menu button */}
            <button 
              className="ml-4 md:hidden text-gray-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu size={20} />
            </button>
          </div>
          
          <div className="flex items-center">
            <button className="mr-4 text-gray-300 hover:text-white">
              <Bell size={20} />
            </button>
            
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center text-gray-300 hover:text-white"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center text-white font-medium">
                  {userInitial}
                </div>
                <span className="ml-2 mr-1 hidden sm:block">{userName}</span>
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg border border-gray-800 overflow-hidden z-10">
                  <div className="py-1">
                    <Link to="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition flex items-center">
                      <User size={16} className="mr-2" /> Profile
                    </Link>
                    <Link to="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition flex items-center">
                      <Settings size={16} className="mr-2" /> Settings
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition flex items-center"
                    >
                      <LogOut size={16} className="mr-2" /> Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900 border-t border-gray-800">
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-purple-900/20 border border-purple-500/20"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Resume Builder
            </Link>
            <Link
              to="/dashboard/subscription"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Subscription
            </Link>
            <Link
              to="/dashboard/settings"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Settings
            </Link>
            <Link
              to="/dashboard/help"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Help & Support
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default DashboardNavigation;
