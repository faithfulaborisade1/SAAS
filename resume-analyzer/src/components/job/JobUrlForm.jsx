import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setJobDescription } from '../../store/analysisSlice';

const JobUrlForm = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!url) {
      setError('Please enter a job URL');
      return;
    }
    
    // Validate URL format
    try {
      new URL(url);
    } catch (err) {
      setError('Please enter a valid URL');
      return;
    }
    
    setError('');
    setLoading(true);
    
    // In a real implementation, we would call our backend to scrape the job description
    // For now, we'll simulate the API call with a timeout
    try {
      // This would be replaced with an actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock job description data
      const jobData = {
        url: url,
        title: 'Software Engineer',
        company: 'Example Corp',
        location: 'Remote',
        description: 'We are seeking a skilled Software Engineer with experience in React, Node.js, and cloud technologies. The ideal candidate will have 3+ years of experience building web applications and a strong understanding of software development principles.',
        requirements: [
          'Experience with React, Redux, and modern JavaScript',
          'Knowledge of Node.js and Express',
          'Understanding of database systems (SQL and NoSQL)',
          'Experience with cloud platforms (AWS, Azure, or GCP)',
          'Strong problem-solving skills and attention to detail',
        ],
        source: url,
      };
      
      dispatch(setJobDescription(jobData));
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch job description. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-2">Enter Job URL</h3>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/jobs/software-engineer"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={loading}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <button
            type="submit"
            className={`px-6 py-2 font-medium rounded-lg text-white ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary hover:bg-blue-700'
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing
              </div>
            ) : (
              'Fetch Job Details'
            )}
          </button>
        </div>
      </form>
      <p className="text-gray-500 text-sm mt-2">
        Enter the URL of the job posting to automatically extract the job description.
      </p>
    </div>
  );
};

export default JobUrlForm;