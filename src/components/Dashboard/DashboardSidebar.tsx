import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FileText, 
  Settings, 
  CreditCard, 
  HelpCircle,
  ChevronRight,
  LucideIcon
} from 'lucide-react';

interface NavigationItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const DashboardSidebar: React.FC = () => {
  const location = useLocation();
  
  // Define sidebar navigation items
  const navigationItems: NavigationItem[] = [
    {
      name: 'Resume Builder',
      path: '/dashboard',
      icon: <FileText className="mr-3 h-5 w-5" />
    },
    {
      name: 'Subscription',
      path: '/dashboard/subscription',
      icon: <CreditCard className="mr-3 h-5 w-5" />
    },
    {
      name: 'Settings',
      path: '/dashboard/settings',
      icon: <Settings className="mr-3 h-5 w-5" />
    },
    {
      name: 'Help & Support',
      path: '/dashboard/help',
      icon: <HelpCircle className="mr-3 h-5 w-5" />
    }
  ];
  
  // Check if a path is active
  const isActive = (path: string): boolean => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-gray-900/50 border-r border-gray-800 hidden md:block min-h-[calc(100vh-64px)] p-4">
      <nav className="space-y-1">
        {navigationItems.map((item) => (
          <Link 
            key={item.path}
            to={item.path} 
            className={`flex items-center px-3 py-2 text-sm rounded-md ${
              isActive(item.path)
                ? 'bg-purple-900/20 text-purple-400 border border-purple-500/20'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white transition'
            }`}
          >
            {item.icon}
            {item.name}
            {isActive(item.path) && <ChevronRight className="ml-auto h-4 w-4" />}
          </Link>
        ))}
      </nav>
      
      <div className="mt-10 bg-gray-800/50 rounded-lg p-4 border border-gray-700">
        <h3 className="text-sm font-medium text-white mb-2">Upgrade to Pro</h3>
        <p className="text-xs text-gray-400 mb-3">Get unlimited resume optimizations, premium templates, and more.</p>
        <Link to="/dashboard/subscription" className="block w-full py-2 text-xs text-center bg-gradient-to-r from-purple-600 to-cyan-500 rounded-md text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition">
          View Plans
        </Link>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
