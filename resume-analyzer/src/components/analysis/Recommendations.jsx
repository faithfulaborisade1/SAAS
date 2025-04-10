import React from 'react';
import PropTypes from 'prop-types';

const Recommendations = ({ recommendations }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
      
      {recommendations.length > 0 ? (
        <ul className="space-y-3">
          {recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start">
              <svg 
                className="w-5 h-5 text-primary mt-0.5 mr-2 flex-shrink-0" 
                fill="currentColor" 
                viewBox="0 0 20 20" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                  clipRule="evenodd"
                ></path>
              </svg>
              <div>
                <p className="text-gray-800">{recommendation}</p>
                {index < 3 && (
                  <div className="mt-1 text-sm text-gray-500">
                    {index === 0 && 'High priority - This could significantly improve your chances.'}
                    {index === 1 && 'Medium priority - Consider adding this to strengthen your application.'}
                    {index === 2 && 'Helpful addition - This would make your resume more appealing.'}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center p-6 bg-white rounded border border-gray-200">
          <svg 
            className="w-12 h-12 text-green-500 mx-auto mb-4" 
            fill="currentColor" 
            viewBox="0 0 20 20" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
              clipRule="evenodd"
            ></path>
          </svg>
          <p className="text-lg font-medium text-gray-800">Your resume looks great!</p>
          <p className="text-gray-500 mt-2">
            We don't have any specific recommendations at this time. Your resume seems well aligned with this job posting.
          </p>
        </div>
      )}
      
      <div className="mt-6 border-t border-gray-200 pt-4">
        <h4 className="text-md font-medium mb-2">Next Steps</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Save as PDF
          </button>
          <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

// PropTypes for type checking
Recommendations.propTypes = {
  recommendations: PropTypes.arrayOf(PropTypes.string).isRequired,
};

// Default props
Recommendations.defaultProps = {
  recommendations: [],
};

export default Recommendations;