import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { setResume } from '../../store/analysisSlice';

const ResumeUploader = () => {
  const dispatch = useDispatch();

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Read the file content
    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result;
      
      // Create a resume object with file info and content
      const resumeData = {
        file: {
          name: file.name,
          size: file.size,
          type: file.type,
        },
        content: fileContent,
      };
      
      // Dispatch the resume data to Redux store
      dispatch(setResume(resumeData));
    };
    
    reader.readAsArrayBuffer(file);
  }, [dispatch]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
    },
    maxFiles: 1,
  });

  const file = acceptedFiles[0];

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-2">Upload Your Resume</h3>
      
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition
          ${isDragActive ? 'border-primary bg-blue-50' : 'border-gray-300 hover:border-primary'}`}
      >
        <input {...getInputProps()} />
        
        {file ? (
          <div className="flex flex-col items-center">
            <svg className="w-10 h-10 text-green-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-gray-800 font-medium">{file.name}</p>
            <p className="text-gray-500 text-sm">{(file.size / 1024).toFixed(1)} KB</p>
            <button 
              className="mt-3 text-red-500 text-sm hover:text-red-700"
              onClick={(e) => {
                e.stopPropagation();
                acceptedFiles.splice(0, acceptedFiles.length);
                dispatch(setResume(null));
              }}
            >
              Remove
            </button>
          </div>
        ) : isDragActive ? (
          <div className="flex flex-col items-center">
            <svg className="w-12 h-12 text-primary mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
            </svg>
            <p className="text-primary font-medium">Drop your resume here...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p className="text-gray-800 font-medium">Drag & drop your resume here</p>
            <p className="text-gray-500 text-sm mt-1">or click to browse files</p>
            <p className="text-gray-500 text-xs mt-2">Supported formats: PDF, DOC, DOCX</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUploader;