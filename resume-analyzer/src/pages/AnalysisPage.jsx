import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetAnalysis, startAnalysis, analysisSuccess, analysisFailure } from '../store/analysisSlice';
import ResumeUploader from '../components/resume/ResumeUploader';
import JobUrlForm from '../components/job/JobUrlForm';
import JobDescriptionForm from '../components/job/JobDescriptionForm';
import AnalysisResult from '../components/analysis/AnalysisResult';
import ResumePreview from '../components/resume/ResumePreview';
import resumeService from '../services/resumeService';
import Button from '../components/common/Button';

const AnalysisPage = () => {
  const [activeTab, setActiveTab] = useState('url'); // 'url' or 'manual'
  const dispatch = useDispatch();
  const { resume, jobDescription, analysisResult, loading, error, analysisCount } = useSelector((state) => state.analysis);
  const { subscription } = useSelector((state) => state.auth);

  const handleRunAnalysis = async () => {
    if (!resume || !jobDescription) {
      return;
    }

    dispatch(startAnalysis());

    try {
      // Use our mock service for now
      // In production, this would use the real API
      const result = await resumeService.mockAnalyzeResume(resume, jobDescription);
      
      // Track usage for free tier limitations
      dispatch(analysisSuccess(result));
      
    } catch (error) {
      console.error('Analysis error:', error);
      dispatch(analysisFailure(
        error.message || 'Failed to analyze resume. Please try again.'
      ));
    }
  };

  const handleReset = () => {
    dispatch(resetAnalysis());
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Resume Analysis</h1>
        {analysisResult && (
          <Button
            variant="outline"
            onClick={handleReset}
          >
            Start New Analysis
          </Button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Step 1: Upload Your Resume</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ResumeUploader />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Resume Preview</h3>
            <ResumePreview />
          </div>
        </div>
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
        <Button
          onClick={handleRunAnalysis}
          disabled={!resume || !jobDescription || loading}
          size="xl"
          isLoading={loading}
          fullWidth={false}
          variant={!resume || !jobDescription ? "outline" : "primary"}
        >
          {loading ? "Analyzing Resume..." : "Analyze Resume"}
        </Button>
        
        {error && <p className="text-red-500 mt-2">{error}</p>}
        
        {!resume && !jobDescription && (
          <p className="text-gray-500 mt-4">Please upload your resume and enter a job description to analyze.</p>
        )}
        {resume && !jobDescription && (
          <p className="text-gray-500 mt-4">Please enter a job description to continue.</p>
        )}
        {!resume && jobDescription && (
          <p className="text-gray-500 mt-4">Please upload your resume to continue.</p>
        )}
        
        {/* Subscription tier notice */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg inline-block mx-auto">
          <p className="text-sm text-gray-700">
            Free tier: <span className="font-semibold">{5 - (analysisCount || 0)}</span> analyses remaining today
            
            {subscription !== 'standard' && (
              <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                {subscription.charAt(0).toUpperCase() + subscription.slice(1)} Plan
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Use the new AnalysisResult component */}
      {analysisResult && <AnalysisResult analysisResult={analysisResult} />}
    </div>
  );
};

export default AnalysisPage;