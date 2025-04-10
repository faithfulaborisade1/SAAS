import axios from 'axios';

// Assuming there's an API backend with these endpoints
const API_URL = process.env.REACT_APP_API_URL || 'https://api.resumeai.example.com';

/**
 * Fetch and parse job description from URL
 * @param {string} url - Job posting URL
 * @returns {Promise} Parsed job data
 */
export const fetchJobFromUrl = async (url) => {
  try {
    const response = await axios.post(`${API_URL}/job/fetch`, { url });
    return response.data;
  } catch (error) {
    console.error('Job fetch error:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch job posting');
  }
};

/**
 * Parse job description text
 * @param {Object} jobData - Job data with description text
 * @returns {Promise} Parsed job data with extracted skills and requirements
 */
export const parseJobDescription = async (jobData) => {
  try {
    const response = await axios.post(`${API_URL}/job/parse`, jobData);
    return response.data;
  } catch (error) {
    console.error('Job parsing error:', error);
    throw new Error(error.response?.data?.message || 'Failed to parse job description');
  }
};

/**
 * Search for job postings
 * @param {Object} filters - Search filters (keywords, location, etc.)
 * @returns {Promise} List of job postings
 */
export const searchJobs = async (filters) => {
  try {
    const response = await axios.get(`${API_URL}/job/search`, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Job search error:', error);
    throw new Error(error.response?.data?.message || 'Failed to search for jobs');
  }
};

/**
 * Save job description to user's account
 * @param {Object} jobData - The job data to save
 * @returns {Promise} Saved job with ID
 */
export const saveJob = async (jobData) => {
  try {
    const response = await axios.post(`${API_URL}/job/save`, jobData);
    return response.data;
  } catch (error) {
    console.error('Save job error:', error);
    throw new Error(error.response?.data?.message || 'Failed to save job');
  }
};

// Mock implementation for development without backend
export const mockFetchJobFromUrl = async (url) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Check if URL is valid
  try {
    new URL(url);
  } catch (err) {
    throw new Error('Invalid URL format');
  }
  
  // Return mock job data
  return {
    url: url,
    title: 'Senior Frontend Developer',
    company: 'Tech Innovations Inc.',
    location: 'Remote (US)',
    description: `
      We are seeking a skilled Senior Frontend Developer with experience in React, TypeScript, and modern JavaScript practices. The ideal candidate will have 4+ years of experience building responsive web applications and a strong understanding of front-end architecture.
      
      Requirements:
      - 4+ years of experience with React and Redux
      - Strong knowledge of TypeScript, JavaScript, HTML5, and CSS3
      - Experience with responsive design and cross-browser compatibility
      - Familiarity with testing frameworks (Jest, React Testing Library)
      - Experience with REST APIs and GraphQL
      - Knowledge of modern front-end build tools (Webpack, Babel)
      - Understanding of CI/CD pipelines
      - Excellent problem-solving and communication skills
      
      Nice to have:
      - Experience with Node.js and Express
      - Knowledge of AWS services
      - Experience with server-side rendering
      - Contributions to open-source projects
      
      Benefits:
      - Competitive salary
      - Remote-first work environment
      - Flexible working hours
      - Health insurance
      - 401(k) with company match
      - Professional development budget
    `,
    requirements: [
      'React',
      'Redux',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Responsive Design',
      'Testing (Jest, RTL)',
      'REST APIs',
      'GraphQL',
      'Webpack',
      'CI/CD',
    ],
    source: url,
    datePosted: new Date().toISOString(),
  };
};

// Parse job description without a backend
export const mockParseJobDescription = async (jobData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (!jobData || !jobData.description) {
    throw new Error('Job description is required');
  }
  
  // Extract requirements based on common formatting patterns
  const requirements = extractRequirements(jobData.description);
  
  return {
    ...jobData,
    requirements: requirements.length > 0 ? requirements : jobData.requirements || [],
    skills: extractSkills(jobData.description),
    // Add more parsed fields as needed
  };
};

// Helper function to extract requirements from text
const extractRequirements = (text) => {
  const requirements = [];
  
  // Look for common patterns in job descriptions
  // This is a simplified approach - real implementation would use NLP
  
  // Look for bullet points after "Requirements:", "Qualifications:", etc.
  const sections = text.split(/Requirements:|Qualifications:|What You'll Need:|Key Skills:/i);
  
  if (sections.length > 1) {
    // Take the section after the heading
    const reqSection = sections[1].split(/Benefits:|What We Offer:|About Us:|Apply Now:/i)[0];
    
    // Extract bullet points (lines starting with - or •)
    const bulletPoints = reqSection.match(/[-•]\s*(.*?)(?=\n[-•]|\n\n|$)/gs);
    
    if (bulletPoints) {
      bulletPoints.forEach(point => {
        // Clean up the bullet point
        const cleaned = point.replace(/[-•]\s*/, '').trim();
        if (cleaned) {
          requirements.push(cleaned);
        }
      });
    }
  }
  
  return requirements;
};

// Helper function to extract skills from job description
const extractSkills = (text) => {
  // Common tech skills to look for
  const skillsList = [
    'JavaScript', 'TypeScript', 'React', 'Angular', 'Vue', 'Node.js', 'Express',
    'HTML', 'CSS', 'SASS', 'LESS', 'Bootstrap', 'Tailwind', 'Material UI',
    'Redux', 'GraphQL', 'REST', 'API', 'AWS', 'Azure', 'GCP',
    'Docker', 'Kubernetes', 'CI/CD', 'Git', 'GitHub', 'GitLab',
    'MongoDB', 'PostgreSQL', 'MySQL', 'SQL', 'NoSQL', 'Firebase',
    'Jest', 'Mocha', 'Cypress', 'Testing', 'TDD', 'Agile', 'Scrum',
  ];
  
  // Look for these skills in the text
  return skillsList.filter(skill => {
    // Create a regex that matches the skill as a whole word, case insensitive
    const regex = new RegExp(`\\b${skill.replace(/\./g, '\\.')}\\b`, 'i');
    return regex.test(text);
  });
};

export default {
  fetchJobFromUrl,
  parseJobDescription,
  searchJobs,
  saveJob,
  mockFetchJobFromUrl,
  mockParseJobDescription,
};