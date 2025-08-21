import React, { useState } from 'react';
import { X, Calendar, ChevronDown } from 'lucide-react';
import { Job } from '../types';

interface CreateJobModalProps {
  onClose: () => void;
  onCreateJob: (jobData: Omit<Job, 'id' | 'postedTime' | 'postedBy'>) => void;
}

const CreateJobModal: React.FC<CreateJobModalProps> = ({ onClose, onCreateJob }) => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    location: '',
    jobType: '',
    salaryMin: '',
    salaryMax: '',
    applicationDeadline: '',
    jobDescription: ''
  });

  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showJobTypeDropdown, setShowJobTypeDropdown] = useState(false);

  const locations = ['Chennai', 'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune'];
  const jobTypes = ['FullTime', 'Internship', 'Partime', 'Contract'];

  const handleSubmit = (isDraft: boolean) => {
    if (!formData.jobTitle || !formData.companyName) {
      alert('Please fill in required fields');
      return;
    }

    const jobData = {
      title: formData.jobTitle,
      company: formData.companyName,
      logo: formData.companyName.toLowerCase().includes('amazon') ? 'amazon' :
            formData.companyName.toLowerCase().includes('tesla') ? 'tesla' : 'lightbulb',
      experience: '1-3 yr Exp',
      location: formData.location || 'Onsite',
      salary: formData.salaryMax ? `${formData.salaryMax}LPA` : '12LPA',
      description: formData.jobDescription || 'A user-friendly interface lets you browse stunning photos and videos • Filter destinations based on interests and travel style, and create personalized'
    };

    if (!isDraft) {
      onCreateJob(jobData);
    } else {
      console.log('Saved as draft:', jobData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Create Job Opening</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
              <input
                type="text"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                placeholder="Full Stack Developer"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="Amazon, Microsoft, Swiggy"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <button
                type="button"
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-left flex items-center justify-between"
              >
                <span className={formData.location ? 'text-gray-900' : 'text-gray-500'}>
                  {formData.location || 'Choose Preferred Location'}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {showLocationDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                  {locations.map((location) => (
                    <button
                      key={location}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, location });
                        setShowLocationDropdown(false);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {location}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
              <button
                type="button"
                onClick={() => setShowJobTypeDropdown(!showJobTypeDropdown)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-left flex items-center justify-between"
              >
                <span className={formData.jobType ? 'text-gray-900' : 'text-gray-500'}>
                  {formData.jobType || 'FullTime'}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {showJobTypeDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                  {jobTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, jobType: type });
                        setShowJobTypeDropdown(false);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">₹</span>
                  <input
                    type="text"
                    value={formData.salaryMin}
                    onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                    placeholder="To"
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">₹</span>
                  <input
                    type="text"
                    value={formData.salaryMax}
                    onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                    placeholder="12,00,000"
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Application Deadline</label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.applicationDeadline}
                  onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <Calendar className="absolute right-3 top-2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
            <textarea
              value={formData.jobDescription}
              onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
              placeholder="Please share a description to let the candidate know more about the job role"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <button
            onClick={() => handleSubmit(true)}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
          >
            Save Draft ↑
          </button>
          <button
            onClick={() => handleSubmit(false)}
            className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
          >
            Publish ↗
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateJobModal;