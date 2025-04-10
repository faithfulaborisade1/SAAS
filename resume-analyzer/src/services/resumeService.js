import axios from 'axios';

// Assuming there's an API backend with these endpoints
const API_URL = process.env.REACT_APP_API_URL || 'https://api.resumeai.example.com';

/**
 * Upload and parse resume file
 * @param {File} file - The resume file (PDF, DOCX, DOC)
 * @returns {Promise} Parsed resume data
 */
export const parseResume = async (file) => {
  try {
    const formData = new FormData();
    formData.append('resume', file);
    
    const response = await axios.post(`${API_URL}/resume/parse`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Resume parsing error:', error);
    throw new Error(error.response?.data?.message || 'Failed to parse resume');
  }
};

/**
 * Analyze resume against a job description
 * @param {Object} resumeData - The parsed resume data
 * @param {Object} jobData - The job description data
 * @returns {Promise} Analysis results
 */
export const analyzeResume = async (resumeData, jobData) => {
  try {
    const response = await axios.post(`${API_URL}/resume/analyze`, {
      resume: resumeData,
      job: jobData,
    });
    
    return response.data;
  } catch (error) {
    console.error('Resume analysis error:', error);
    throw new Error(error.response?.data?.message || 'Failed to analyze resume');
  }
};

/**
 * Get resume analysis history for the current user
 * @returns {Promise} List of previous analyses
 */
export const getAnalysisHistory = async () => {
  try {
    const response = await axios.get(`${API_URL}/resume/history`);
    return response.data;
  } catch (error) {
    console.error('Get analysis history error:', error);
    throw new Error(error.response?.data?.message || 'Failed to get analysis history');
  }
};

/**
 * Generate improved resume based on analysis
 * @param {Object} analysisResult - The analysis result
 * @param {Object} originalResume - The original resume data
 * @returns {Promise} Improved resume content
 */
export const generateImprovedResume = async (analysisResult, originalResume) => {
  try {
    const response = await axios.post(`${API_URL}/resume/improve`, {
      analysis: analysisResult,
      resume: originalResume,
    });
    
    return response.data;
  } catch (error) {
    console.error('Resume improvement error:', error);
    throw new Error(error.response?.data?.message || 'Failed to improve resume');
  }
};

/**
 * Save analysis result to user's account
 * @param {Object} analysisResult - The analysis result to save
 * @returns {Promise} Saved analysis with ID
 */
export const saveAnalysis = async (analysisResult) => {
  try {
    const response = await axios.post(`${API_URL}/resume/save`, analysisResult);
    return response.data;
  } catch (error) {
    console.error('Save analysis error:', error);
    throw new Error(error.response?.data?.message || 'Failed to save analysis');
  }
};

// Mock implementation for development without backend
// This can be used during development until the backend is ready
export const mockAnalyzeResume = async (resumeData, jobData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Extract skills from resume (in a real implementation, this would be done by the backend)
  const resumeSkills = extractSkillsFromResume(resumeData);
  
  // Extract skills from job description
  const jobSkills = extractSkillsFromJob(jobData);
  
  // Find matching and missing skills
  const matchingSkills = resumeSkills.filter(skill => 
    jobSkills.some(jobSkill => jobSkill.toLowerCase() === skill.toLowerCase())
  );
  
  const missingSkills = jobSkills.filter(skill => 
    !resumeSkills.some(resumeSkill => resumeSkill.toLowerCase() === skill.toLowerCase())
  );
  
  const additionalSkills = resumeSkills.filter(skill => 
    !jobSkills.some(jobSkill => jobSkill.toLowerCase() === skill.toLowerCase())
  );
  
  // Calculate match percentage
  const matchPercentage = Math.round((matchingSkills.length / jobSkills.length) * 100);
  
  // Generate recommendations
  const recommendations = generateRecommendations(missingSkills, matchPercentage);
  
  return {
    matchPercentage,
    skills: {
      matching: matchingSkills,
      missing: missingSkills,
      additional: additionalSkills,
    },
    experienceMatch: matchPercentage > 80 ? 'High' : matchPercentage > 50 ? 'Medium' : 'Low',
    educationMatch: matchPercentage > 70 ? 'High' : matchPercentage > 40 ? 'Medium' : 'Low',
    recommendations,
  };
};

// Helper functions for mock implementation
const extractSkillsFromResume = (resumeData) => {
  // In a real implementation, this would use NLP to extract skills
  // For now, just return dummy data
  return [
    'React', 'JavaScript', 'CSS', 'HTML', 'Git', 'Angular', 'PHP', 'MongoDB'
  ];
};

const extractSkillsFromJob = (jobData) => {
  // In a real implementation, this would use NLP to extract skills
  // For now, extract from description or use dummy data
  if (jobData?.description) {
    // Very simple keyword extraction for demo purposes
    const keywords = ['react', 'javascript', 'node.js', 'typescript', 'aws', 'html', 'css', 'git'];
    const foundSkills = [];
    
    keywords.forEach(keyword => {
      if (jobData.description.toLowerCase().includes(keyword)) {
        // Capitalize first letter
        foundSkills.push(keyword.charAt(0).toUpperCase() + keyword.slice(1));
      }
    });
    
    return foundSkills.length > 0 ? foundSkills : ['React', 'Node.js', 'AWS', 'TypeScript', 'HTML', 'CSS', 'Git'];
  }
  
  return ['React', 'Node.js', 'AWS', 'TypeScript', 'HTML', 'CSS', 'Git'];
};

const generateRecommendations = (missingSkills, matchPercentage) => {
  const recommendations = missingSkills.map(skill => `Add ${skill} to your skills section`);
  
  if (matchPercentage < 70) {
    recommendations.push('Emphasize your relevant projects and experience');
    recommendations.push('Quantify your achievements with metrics');
  }
  
  if (matchPercentage < 50) {
    recommendations.push('Consider taking courses to develop missing skills');
    recommendations.push('Highlight transferable skills from your experience');
  }
  
  return recommendations;
};

export default {
  parseResume,
  analyzeResume,
  getAnalysisHistory,
  generateImprovedResume,
  saveAnalysis,
  mockAnalyzeResume,
};