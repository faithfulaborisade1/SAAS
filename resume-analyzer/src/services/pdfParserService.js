import * as pdfjs from 'pdfjs-dist';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

/**
 * Parse PDF file to extract text content
 * @param {ArrayBuffer} fileData - The PDF file data as ArrayBuffer
 * @returns {Promise<string>} - Extracted text from the PDF
 */
export const parsePdfText = async (fileData) => {
  try {
    // Load PDF document
    const loadingTask = pdfjs.getDocument({ data: fileData });
    const pdf = await loadingTask.promise;
    
    // Get total number of pages
    const numPages = pdf.numPages;
    let fullText = '';
    
    // Extract text from each page
    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      
      // Join all text items into a string
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\\n';
    }
    
    return fullText;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Failed to parse PDF file');
  }
};

/**
 * Extract key sections from resume text (skills, education, experience)
 * @param {string} text - The extracted text from the resume
 * @returns {Object} - Structured resume data with sections
 */
export const extractResumeData = (text) => {
  // This is a simplified implementation
  // In a real app, you would use NLP or more sophisticated pattern matching
  
  // Try to find skills section
  const skillsRegex = /(?:skills|technical skills|core competencies)(?::|\\n)(.*?)(?:\\n\\n|$)/is;
  const skillsMatch = text.match(skillsRegex);
  
  // Try to find education section
  const educationRegex = /(?:education|academic background)(?::|\\n)(.*?)(?:\\n\\n|$)/is;
  const educationMatch = text.match(educationRegex);
  
  // Try to find experience section
  const experienceRegex = /(?:experience|work experience|professional experience)(?::|\\n)(.*?)(?:\\n\\n|$)/is;
  const experienceMatch = text.match(experienceRegex);
  
  // Extract skills as array
  const extractSkills = (text) => {
    if (!text) return [];
    
    // Try to find comma or bullet separated skills
    const skillsList = text
      .replace(/•/g, ',')  // Replace bullets with commas
      .split(/,|•/)        // Split by comma or bullet
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0);
    
    return skillsList;
  };
  
  return {
    skills: extractSkills(skillsMatch ? skillsMatch[1] : ''),
    education: educationMatch ? educationMatch[1].trim() : '',
    experience: experienceMatch ? experienceMatch[1].trim() : '',
    fullText: text
  };
};

/**
 * Parse Word documents (.docx) to extract text
 * @param {ArrayBuffer} fileData - The Word file data as ArrayBuffer 
 * @returns {Promise<string>} - Extracted text from the document
 */
export const parseWordDocument = async (fileData) => {
  // This is a stub function as we would need to use a library like mammoth.js
  // In a real implementation, you would integrate with the mammoth library
  throw new Error('Word document parsing not implemented yet');
};

export default {
  parsePdfText,
  extractResumeData,
  parseWordDocument
};