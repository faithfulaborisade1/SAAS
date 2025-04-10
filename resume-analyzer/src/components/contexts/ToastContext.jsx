import React, { createContext, useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';

// Create context
const ToastContext = createContext();

// Toast types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
};

// Provider component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Add new toast
  const addToast = useCallback((message, type = TOAST_TYPES.INFO, duration = 5000) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prevToasts) => [...prevToasts, { id, message, type, duration }]);
    
    // Auto remove toast after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    
    return id;
  }, []);

  // Remove toast by id
  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  // Shorthand methods for different toast types
  const success = useCallback((message, duration) => addToast(message, TOAST_TYPES.SUCCESS, duration), [addToast]);
  const error = useCallback((message, duration) => addToast(message, TOAST_TYPES.ERROR, duration), [addToast]);
  const info = useCallback((message, duration) => addToast(message, TOAST_TYPES.INFO, duration), [addToast]);
  const warning = useCallback((message, duration) => addToast(message, TOAST_TYPES.WARNING, duration), [addToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, success, error, info, warning }}>
      {children}
      
      {/* Toast container */}
      {toasts.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50 space-y-2 w-80">
          {toasts.map((toast) => (
            <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
};

// Individual Toast component
const Toast = ({ toast, onClose }) => {
  const { id, message, type } = toast;
  
  // Define styles based on toast type
  const getToastStyles = () => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return 'bg-green-50 border-green-500 text-green-800';
      case TOAST_TYPES.ERROR:
        return 'bg-red-50 border-red-500 text-red-800';
      case TOAST_TYPES.WARNING:
        return 'bg-yellow-50 border-yellow-500 text-yellow-800';
      case TOAST_TYPES.INFO:
      default:
        return 'bg-blue-50 border-blue-500 text-blue-800';
    }
  };
  
  const getIconStyles = () => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return 'text-green-500';
      case TOAST_TYPES.ERROR:
        return 'text-red-500';
      case TOAST_TYPES.WARNING:
        return 'text-yellow-500';
      case TOAST_TYPES.INFO:
      default:
        return 'text-blue-500';
    }
  };
  
  const getIcon = () => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return (
          <svg className={`w-5 h-5 ${getIconStyles()}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
          </svg>
        );
      case TOAST_TYPES.ERROR:
        return (
          <svg className={`w-5 h-5 ${getIconStyles()}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
          </svg>
        );
      case TOAST_TYPES.WARNING:
        return (
          <svg className={`w-5 h-5 ${getIconStyles()}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
          </svg>
        );
      case TOAST_TYPES.INFO:
      default:
        return (
          <svg className={`w-5 h-5 ${getIconStyles()}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
          </svg>
        );
    }
  };

  return (
    <div
      id={`toast-${id}`}
      className={`flex items-center p-4 border-l-4 rounded-lg shadow-md animate-slideIn ${getToastStyles()}`}
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 mr-3">
        {getIcon()}
      </div>
      <div className="text-sm font-normal">{message}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 hover:bg-gray-200 focus:outline-none"
        onClick={onClose}
        aria-label="Close"
      >
        <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  );
};

// Custom hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// PropTypes
ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

Toast.propTypes = {
  toast: PropTypes.shape({
    id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.values(TOAST_TYPES)).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ToastContext;