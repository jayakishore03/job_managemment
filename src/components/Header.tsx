import React from 'react';
import { User, LogOut, Download } from 'lucide-react';
import { User as UserType } from '../types';

interface HeaderProps {
  onCreateJob: () => void;
  onLogin: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  currentUser: UserType | null;
}

const Header: React.FC<HeaderProps> = ({ onCreateJob, onLogin, isLoggedIn, onLogout, currentUser }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleExportJobs = () => {
    const jobs = JSON.parse(localStorage.getItem('jobPortalJobs') || '[]');
    const dataStr = JSON.stringify(jobs, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `jobs_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white transform rotate-45 rounded-sm"></div>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-900 hover:text-purple-600 font-medium">Home</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 font-medium">Find Jobs</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 font-medium">Find Talents</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 font-medium">About us</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 font-medium">Testimonials</a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleExportJobs}
                  className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 font-medium"
                  title="Export Jobs to JSON"
                >
                  <Download size={20} />
                  <span className="hidden md:inline">Export</span>
                </button>
                <button
                  onClick={onCreateJob}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Create Jobs
                </button>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {currentUser ? getInitials(currentUser.name) : 'U'}
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
                    <p className="text-xs text-gray-500">{currentUser?.email}</p>
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600 font-medium"
                >
                  <LogOut size={18} />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={onLogin}
                  className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 font-medium"
                >
                  <User size={20} />
                  <span>Login</span>
                </button>
                <button
                  onClick={onCreateJob}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Create Jobs
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;