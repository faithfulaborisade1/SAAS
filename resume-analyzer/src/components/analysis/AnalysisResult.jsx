import React from 'react';
import PropTypes from 'prop-types';
import MatchScore from './MatchScore';
import SkillsComparison from './SkillsComparison';
import Recommendations from './Recommendations';

const AnalysisResult = ({ analysisResult }) => {
  if (!analysisResult) return null;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-6">Analysis Results</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MatchScore score={analysisResult.matchPercentage} />
        
        <SkillsComparison 
          matchingSkills={analysisResult.skills.matching}
          missingSkills={analysisResult.skills.missing}
          additionalSkills={analysisResult.skills.additional}
        />
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Experience & Education</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Experience Match</h4>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      analysisResult.experienceMatch === 'High'
                        ? 'bg-green-600 w-full'
                        : analysisResult.experienceMatch === 'Medium'
                        ? 'bg-yellow-500 w-2/3'
                        : 'bg-red-500 w-1/3'
                    }`}
                  ></div>
                </div>
                <span className="ml-2 text-sm text-gray-600">{analysisResult.experienceMatch}</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Education Match</h4>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      analysisResult.educationMatch === 'High'
                        ? 'bg-green-600 w-full'
                        : analysisResult.educationMatch === 'Medium'
                        ? 'bg-yellow-500 w-2/3'
                        : 'bg-red-500 w-1/3'
                    }`}
                  ></div>
                </div>
                <span className="ml-2 text-sm text-gray-600">{analysisResult.educationMatch}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Recommendations recommendations={analysisResult.recommendations} />
    </div>
  );
};

AnalysisResult.propTypes = {
  analysisResult: PropTypes.object
};

export default AnalysisResult;