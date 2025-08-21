import React from 'react';
import { MapPin, Building, Clock } from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const getLogoComponent = (logo: string) => {
    switch (logo) {
      case 'amazon':
        return (
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">a</span>
          </div>
        );
      case 'tesla':
        return (
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
        );
      case 'lightbulb':
        return (
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xl">💡</span>
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            <Building className="w-6 h-6 text-gray-600" />
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        {getLogoComponent(job.logo)}
        <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
          {job.postedTime}
        </div>
      </div>
      
      <h3 className="font-semibold text-lg text-gray-900 mb-2">{job.title}</h3>
      
      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
        <span>{job.experience}</span>
        <div className="flex items-center space-x-1">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>{job.salary}</span>
        </div>
      </div>
      
      <div className="text-sm text-gray-600 mb-6">
        <ul className="space-y-1">
          <li>• A user-friendly interface lets you browse stunning photos and videos</li>
          <li>• Filter destinations based on interests and travel style, and create personalized</li>
        </ul>
      </div>
      
      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;