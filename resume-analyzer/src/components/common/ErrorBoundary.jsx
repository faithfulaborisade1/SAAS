import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
    
    // Here you could also send the error to your analytics or error tracking service
    // For example: logErrorToService(error, errorInfo);
  }

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      // If a custom fallback is provided, use it
      if (fallback) {
        return typeof fallback === 'function' 
          ? fallback(error, errorInfo) 
          : fallback;
      }

      // Default error UI
      return (
        <div className="p-6 max-w-lg mx-auto my-8 bg-white rounded-lg shadow-md border border-red-100">
          <div className="flex items-center mb-4">
            <svg className="w-10 h-10 text-red-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h2 className="text-xl font-bold text-gray-800">Something went wrong</h2>
          </div>
          <p className="text-gray-600 mb-4">
            We're sorry, but an error occurred while rendering this component.
          </p>
          <div className="bg-gray-100 p-4 rounded mb-4 overflow-auto text-sm">
            <details>
              <summary className="cursor-pointer text-blue-600">Error details</summary>
              <p className="mt-2 text-red-600">{error && error.toString()}</p>
              {errorInfo && (
                <pre className="mt-2 text-xs text-gray-700 overflow-auto">
                  {errorInfo.componentStack}
                </pre>
              )}
            </details>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export default ErrorBoundary;