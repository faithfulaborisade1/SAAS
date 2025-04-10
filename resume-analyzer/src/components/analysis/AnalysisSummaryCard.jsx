import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AnalysisSummaryCard = ({ analysis }) => {
  // Helper function to determine the color based on match percentage
  const getMatchColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-100 text-green-800';
    if (percentage >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  // Format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${!analysis.viewed ? 'border-blue-200' : 'border-gray-200'} overflow-hidden transition-all hover:shadow-md`}>
      {!analysis.viewed && (
        <div className="bg-blue-500 h-1 w-full"></div>
      )}
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-gray-800 text-lg">{analysis.jobTitle}</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMatchColor(analysis.matchPercentage)}`}>
            {analysis.matchPercentage}% Match
          </span>
        </div>
        
        <p className="text-gray-600 mb-4">{analysis.company}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{formatDate(analysis.date)}</span>
          <Link 
            to={`/analysis/${analysis.id}`} 
            className="text-sm font-medium text-primary hover:text-blue-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

AnalysisSummaryCard.propTypes = {
  analysis: PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    matchPercentage: PropTypes.number.isRequired,
    viewed: PropTypes.bool.isRequired
  }).isRequired
};

export default AnalysisSummaryCard;