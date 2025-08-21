import React, { useState } from 'react';
import { useEffect } from 'react';
import Header from './components/Header';
import JobSearch from './components/JobSearch';
import JobCard from './components/JobCard';
import CreateJobModal from './components/CreateJobModal';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import { Job, User } from './types';
import { loadJobs, saveJobs } from './utils/storage';

const initialJobsData: Job[] = [
  {
    id: 1,
    title: 'Full Stack Developer',
    company: 'Amazon',
    logo: 'amazon',
    experience: '5+ 1-3 yr Exp',
    location: 'Onsite',
    salary: '12LPA',
    postedTime: '24h Ago',
    description: 'A user-friendly interface lets you browse stunning photos and videos • Filter destinations based on interests and travel style, and create personalized',
    postedBy: 'system'
  },
  {
    id: 2,
    title: 'Node Js Developer',
    company: 'Tesla',
    logo: 'tesla',
    experience: '3+ 1-3 yr Exp',
    location: 'Onsite',
    salary: '12LPA',
    postedTime: '24h Ago',
    description: 'A user-friendly interface lets you browse stunning photos and videos • Filter destinations based on interests and travel style, and create personalized',
    postedBy: 'system'
  },
  {
    id: 3,
    title: 'UX/UI Designer',
    company: 'Onsite',
    logo: 'lightbulb',
    experience: '3+ 1-3 yr Exp',
    location: 'Onsite',
    salary: '12LPA',
    postedTime: '24h Ago',
    description: 'A user-friendly interface lets you browse stunning photos and videos • Filter destinations based on interests and travel style, and create personalized',
    postedBy: 'system'
  },
  {
    id: 4,
    title: 'Full Stack Developer',
    company: 'Amazon',
    logo: 'amazon',
    experience: '3+ 1-3 yr Exp',
    location: 'Onsite',
    salary: '12LPA',
    postedTime: '24h Ago',
    description: 'A user-friendly interface lets you browse stunning photos and videos • Filter destinations based on interests and travel style, and create personalized',
    postedBy: 'system'
  },
  {
    id: 5,
    title: 'Node Js Developer',
    company: 'Tesla',
    logo: 'tesla',
    experience: '3+ 1-3 yr Exp',
    location: 'Onsite',
    salary: '12LPA',
    postedTime: '24h Ago',
    description: 'A user-friendly interface lets you browse stunning photos and videos • Filter destinations based on interests and travel style, and create personalized',
    postedBy: 'system'
  },
  {
    id: 6,
    title: 'UX/UI Designer',
    company: 'Onsite',
    logo: 'lightbulb',
    experience: '3+ 1-3 yr Exp',
    location: 'Onsite',
    salary: '12LPA',
    postedTime: '24h Ago',
    description: 'A user-friendly interface lets you browse stunning photos and videos • Filter destinations based on interests and travel style, and create personalized',
    postedBy: 'system'
  },
  {
    id: 7,
    title: 'Full Stack Developer',
    company: 'Amazon',
    logo: 'amazon',
    experience: '3+ 1-3 yr Exp',
    location: 'Onsite',
    salary: '12LPA',
    postedTime: '24h Ago',
    description: 'A user-friendly interface lets you browse stunning photos and videos • Filter destinations based on interests and travel style, and create personalized',
    postedBy: 'system'
  },
  {
    id: 8,
    title: 'Node Js Developer',
    company: 'Tesla',
    logo: 'tesla',
    experience: '3+ 1-3 yr Exp',
    location: 'Onsite',
    salary: '12LPA',
    postedTime: '24h Ago',
    description: 'A user-friendly interface lets you browse stunning photos and videos • Filter destinations based on interests and travel style, and create personalized',
    postedBy: 'system'
  }
];

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');
  const [salaryRange, setSalaryRange] = useState([50, 80]);

  useEffect(() => {
    // Load jobs from localStorage on component mount
    const savedJobs = loadJobs();
    if (savedJobs.length > 0) {
      setJobs(savedJobs);
    } else {
      setJobs(initialJobsData);
      saveJobs(initialJobsData);
    }
  }, []);

  const handleLogin = (userData: User) => {
    setIsLoggedIn(true);
    setCurrentUser(userData);
    setShowLoginModal(false);
  };

  const handleSignup = (userData: User) => {
    setIsLoggedIn(true);
    setCurrentUser(userData);
    setShowSignupModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleCreateJob = (jobData: Omit<Job, 'id' | 'postedTime' | 'postedBy'>) => {
    const newJob: Job = {
      ...jobData,
      id: Date.now(),
      postedTime: 'Just now',
      postedBy: currentUser?.email || 'anonymous'
    };
    
    const updatedJobs = [newJob, ...jobs];
    setJobs(updatedJobs);
    saveJobs(updatedJobs);
    setShowCreateJobModal(false);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !selectedLocation || job.location === selectedLocation;
    const matchesJobType = !selectedJobType || job.title.toLowerCase().includes(selectedJobType.toLowerCase());
    
    return matchesSearch && matchesLocation && matchesJobType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onCreateJob={() => setShowCreateJobModal(true)}
        onLogin={() => setShowLoginModal(true)}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        currentUser={currentUser}
      />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <JobSearch 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedJobType={selectedJobType}
          setSelectedJobType={setSelectedJobType}
          salaryRange={salaryRange}
          setSalaryRange={setSalaryRange}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </main>

      {showCreateJobModal && (
        <CreateJobModal 
          onClose={() => setShowCreateJobModal(false)}
          onCreateJob={handleCreateJob}
        />
      )}

      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
          onSwitchToSignup={() => {
            setShowLoginModal(false);
            setShowSignupModal(true);
          }}
        />
      )}

      {showSignupModal && (
        <SignupModal 
          onClose={() => setShowSignupModal(false)}
          onSignup={handleSignup}
          onSwitchToLogin={() => {
            setShowSignupModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
    </div>
  );
}

export default App;