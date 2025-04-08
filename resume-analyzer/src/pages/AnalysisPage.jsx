import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetAnalysis, startAnalysis, analysisSuccess, analysisFailure } from '../store/analysisSlice';
import ResumeUploader from '../components/resume/ResumeUploader';
import JobUrlForm from '../components/job/JobUrlForm';
import JobDescriptionForm from '../components/job/JobDescriptionForm';
import MatchScore from '../components/analysis/MatchScore';
import SkillsComparison from '../components/analysis/SkillsComparison';
import Recommendations from '../components/analysis/Recommendations';

const AnalysisPage = () => {
  const [activeTab, setActiveTab] = useState('url'); // 'url' or 'manual'
  const dispatch = useDispatch();
  const { resume, jobDescription, analysisResult, loading, error } = useSelector((state) => state.analysis);
  const { subscription } = useSelector((state) => state.auth);

  const handleRunAnalysis = async () => {
    if (!resume || !jobDescription) {
      return;
    }

    dispatch(startAnalysis());

    try {
      // In a real implementation, this would be an API call to your backend
      // For now, we'll simulate the analysis with a timeout
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock analysis result
      const result = {
        matchPercentage: 78,
        skills: {
          matching: ['React', 'JavaScript', 'CSS', 'HTML', 'Git'],
          missing: ['Node.js', 'AWS', 'TypeScript'],
          additional: ['Angular', 'PHP', 'MongoDB'],
        },
        experienceMatch: 'Medium',
        educationMatch: 'High',
        recommendations: [
          'Add Node.js to your skills section',
          'Highlight any AWS experience or certifications',
          'Include TypeScript in your technical skills',
          'Emphasize your web development projects',
          'Quantify your achievements with metrics',
        ],
      };

      dispatch(analysisSuccess(result));
    } catch (error) {
      dispatch(analysisFailure('Failed to analyze resume. Please try again.'));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Resume Analysis</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Step 1: Upload Your Resume</h2>
        <ResumeUploader />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Step 2: Job Description</h2>
        
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <button
              className={`py-2 px-4 font-medium mr-4 ${
                activeTab === 'url'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('url')}
            >
              URL Method
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === 'manual'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('manual')}
            >
              Manual Entry
            </button>
          </div>
        </div>
        
        {activeTab === 'url' ? <JobUrlForm /> : <JobDescriptionForm />}
      </div>

      <div className="text-center mb-8">
        <button
          onClick={handleRunAnalysis}
          disabled={!resume || !jobDescription || loading}
          className={`px-8 py-3 text-lg font-bold rounded-lg ${
            !resume || !jobDescription || loading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-primary hover:bg-blue-700 text-white'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing Resume...
            </div>
          ) : (
            'Analyze Resume'
          )}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {analysisResult && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Analysis Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Match Score</h3>
              <div className="flex justify-center">
                <div className="relative w-32 h-32">
                  <svg viewBox="0 0 36 36" className="w-full h-full">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={
                        analysisResult.matchPercentage > 75
                          ? '#10B981'
                          : analysisResult.matchPercentage > 50
                          ? '#F59E0B'
                          : '#EF4444'
                      }
                      strokeWidth="3"
                      strokeDasharray={`${analysisResult.matchPercentage}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">
                      {analysisResult.matchPercentage}%
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-center mt-4 text-gray-600">
                {analysisResult.matchPercentage > 75
                  ? 'Great match for this position!'
                  : analysisResult.matchPercentage > 50
                  ? 'Decent match, with some gaps.'
                  : 'Significant gaps for this role.'}
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Skills Match</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Matching Skills</span>
                    <span className="text-sm font-medium text-green-600">{analysisResult.skills.matching.length}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {analysisResult.skills.matching.join(', ')}
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Missing Skills</span>
                    <span className="text-sm font-medium text-red-600">{analysisResult.skills.missing.length}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {analysisResult.skills.missing.join(', ')}
                  </div>
                </div>
              </div>
            </div>
            
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
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
            <ul className="space-y-2">
              {analysisResult.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-primary mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default AnalysisPage;