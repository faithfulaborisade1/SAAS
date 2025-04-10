import React from 'react';
import { useToast, TOAST_TYPES } from '../../contexts/ToastContext';
import Button from '../common/Button';

const ToastDemo = () => {
  const { success, error, info, warning } = useToast();

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Toast Notifications Demo</h2>
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => success('Operation completed successfully!')}
          variant="success"
          size="sm"
        >
          Show Success
        </Button>
        
        <Button
          onClick={() => error('An error occurred. Please try again.')}
          variant="danger"
          size="sm"
        >
          Show Error
        </Button>
        
        <Button
          onClick={() => info('Here is some useful information.')}
          variant="primary"
          size="sm"
        >
          Show Info
        </Button>
        
        <Button
          onClick={() => warning('Please be careful with this action.')}
          variant="outline"
          size="sm"
          className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
        >
          Show Warning
        </Button>
        
        <Button
          onClick={() => {
            const id = info('This toast will not auto-dismiss.', 0);
            // You could save the ID to dismiss it programmatically later
          }}
          variant="outline"
          size="sm"
        >
          Persistent Toast
        </Button>
      </div>
    </div>
  );
};

export default ToastDemo;