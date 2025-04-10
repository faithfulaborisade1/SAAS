import React from 'react';
import PropTypes from 'prop-types';

const SkillsComparison = ({ matchingSkills, missingSkills, additionalSkills }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Skills Match</h3>
      <div className="space-y-4">
        {/* Matching Skills */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Matching Skills</span>
            <span className="text-sm font-medium text-green-600">{matchingSkills.length}</span>
          </div>
          <div className="bg-white p-3 rounded border border-gray-200">
            {matchingSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {matchingSkills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No matching skills found</p>
            )}
          </div>
        </div>
        
        {/* Missing Skills */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Missing Skills</span>
            <span className="text-sm font-medium text-red-600">{missingSkills.length}</span>
          </div>
          <div className="bg-white p-3 rounded border border-gray-200">
            {missingSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No missing skills - great job!</p>
            )}
          </div>
        </div>
        
        {/* Additional Skills */}
        {additionalSkills && additionalSkills.length > 0 && (
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Additional Skills</span>
              <span className="text-sm font-medium text-blue-600">{additionalSkills.length}</span>
            </div>
            <div className="bg-white p-3 rounded border border-gray-200">
              <div className="flex flex-wrap gap-2">
                {additionalSkills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// PropTypes for type checking
SkillsComparison.propTypes = {
  matchingSkills: PropTypes.arrayOf(PropTypes.string).isRequired,
  missingSkills: PropTypes.arrayOf(PropTypes.string).isRequired,
  additionalSkills: PropTypes.arrayOf(PropTypes.string),
};

// Default props
SkillsComparison.defaultProps = {
  matchingSkills: [],
  missingSkills: [],
  additionalSkills: [],
};

export default SkillsComparison;