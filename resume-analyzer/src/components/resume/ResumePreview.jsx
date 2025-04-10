import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const ResumePreview = ({ maxHeight = '400px' }) => {
  const { resume } = useSelector((state) => state.analysis);
  const [previewContent, setPreviewContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!resume) {
      setPreviewContent(null);
      setError(null);
      return;
    }

    const generatePreview = async () => {
      setLoading(true);
      setError(null);

      try {
        // Check file type
        const { type } = resume.file;
        
        if (type === 'application/pdf') {
          // For PDF files, we could use a PDF viewer library
          // For now, we'll just use a placeholder
          setPreviewContent({
            type: 'pdf',
            url: URL.createObjectURL(new Blob([resume.content])),
          });
        } else if (
          type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          type === 'application/msword'
        ) {
          // For Word documents, we'd need server-side conversion
          // For now, show a placeholder
          setPreviewContent({
            type: 'word',
            filename: resume.file.name,
          });
        } else {
          throw new Error('Unsupported file type');
        }
      } catch (err) {
        setError('Unable to preview this file');
        console.error('Preview generation error:', err);
      } finally {
        setLoading(false);
      }
    };

    generatePreview();

    // Cleanup function
    return () => {
      if (previewContent?.type === 'pdf' && previewContent?.url) {
        URL.revokeObjectURL(previewContent.url);
      }
    };
  }, [resume]);

  if (!resume) {
    return (
      <div className="border border-gray-300 rounded-lg p-8 text-center bg-gray-50">
        <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <p className="text-gray-600">No resume uploaded yet</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="border border-gray-300 rounded-lg p-8 text-center bg-gray-50">
        <div className="flex items-center justify-center">
          <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p className="text-gray-600 mt-4">Generating preview...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-gray-300 rounded-lg p-8 text-center bg-gray-50">
        <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p className="text-red-600">{error}</p>
        <p className="text-gray-600 mt-2">
          Your resume has been uploaded and will be analyzed, but preview is not available.
        </p>
      </div>
    );
  }

  if (previewContent?.type === 'pdf') {
    return (
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="bg-gray-200 py-2 px-4 flex justify-between items-center">
          <p className="text-sm font-medium text-gray-600">PDF Preview</p>
          <a 
            href={previewContent.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            Open Full Preview
          </a>
        </div>
        <div 
          className="w-full bg-gray-100" 
          style={{ height: maxHeight }}
        >
          <iframe 
            src={previewContent.url} 
            className="w-full h-full"
            title="Resume Preview"
          />
        </div>
      </div>
    );
  }

  if (previewContent?.type === 'word') {
    return (
      <div className="border border-gray-300 rounded-lg p-8 text-center bg-gray-50">
        <svg className="w-12 h-12 text-blue-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <p className="text-gray-800 font-medium">{previewContent.filename}</p>
        <p className="text-gray-600 mt-2">
          Word document preview is not available. Your resume has been uploaded and will be analyzed.
        </p>
      </div>
    );
  }

  return null;
};

ResumePreview.propTypes = {
  maxHeight: PropTypes.string,
};

export default ResumePreview;