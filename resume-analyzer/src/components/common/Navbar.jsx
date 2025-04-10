import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

const Navbar = () => {
  const { isAuthenticated, user, subscription } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  
  // State for dropdown menus
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  // Refs for dropdown menus (to handle click outside)
  const accountMenuRef = useRef(null);
  const notificationsRef = useRef(null);
  
  // Sample notifications
  const notifications = [
    {
      id: 1,
      type: 'info',
      message: 'Your last analysis shows a 75% match with the job post.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'success',
      message: 'Your resume has been successfully uploaded.',
      time: '1 day ago',
      read: true
    },
    {
      id: 3,
      type: 'reminder',
      message: 'Complete your profile to get better job matches.',
      time: '3 days ago',
      read: true
    }
  ];
  
  // Handle clicks outside the dropdown menus to close them
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
        setAccountMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
  };
  
  // Determine if a nav link is active
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="bg-dark text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold flex items-center">
            <svg className="w-8 h-8 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path>
            </svg>
            ResumeAI
          </Link>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-200 hover:text-white focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition ${
                    isActive('/dashboard') ? 'bg-gray-700' : ''
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/analysis" 
                  className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition ${
                    isActive('/analysis') ? 'bg-gray-700' : ''
                  }`}
                >
                  New Analysis
                </Link>
                
                {/* Notifications dropdown */}
                <div className="relative" ref={notificationsRef}>
                  <button
                    type="button"
                    className="relative p-1 rounded-full text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    {notifications.some(n => !n.read) && (
                      <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-dark"></span>
                    )}
                  </button>
                  
                  {notificationsOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <div className="py-2">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                        </div>
                        
                        <div className="max-h-60 overflow-y-auto">
                          {notifications.length > 0 ? (
                            <div className="divide-y divide-gray-100">
                              {notifications.map((notification) => (
                                <div 
                                  key={notification.id}
                                  className={`px-4 py-3 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                                >
                                  <div className="flex items-start">
                                    {notification.type === 'info' && (
                                      <div className="flex-shrink-0 mr-3">
                                        <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                      </div>
                                    )}
                                    {notification.type === 'success' && (
                                      <div className="flex-shrink-0 mr-3">
                                        <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                      </div>
                                    )}
                                    {notification.type === 'reminder' && (
                                      <div className="flex-shrink-0 mr-3">
                                        <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                      </div>
                                    )}
                                    <div className="flex-1">
                                      <p className="text-sm text-gray-900">{notification.message}</p>
                                      <p className="mt-1 text-xs text-gray-500">{notification.time}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="px-4 py-6 text-center text-sm text-gray-500">
                              No notifications yet
                            </div>
                          )}
                        </div>
                        
                        <div className="border-t border-gray-100 px-4 py-2">
                          <button className="text-xs text-primary hover:text-blue-700 font-medium">
                            Mark all as read
                          </button>
                          <button className="text-xs text-primary hover:text-blue-700 font-medium ml-4">
                            View all
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Account dropdown */}
                <div className="relative ml-3" ref={accountMenuRef}>
                  <button
                    type="button"
                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  >
                    <span className="sr-only">Open user menu</span>
                    {user?.avatar ? (
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user.avatar}
                        alt={user.name}
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center text-white">
                        {user?.name?.charAt(0) || 'U'}
                      </div>
                    )}
                  </button>
                  
                  {accountMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>
                      
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setAccountMenuOpen(false)}
                      >
                        Your Profile
                      </Link>
                      
                      <Link
                        to="/subscription"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setAccountMenuOpen(false)}
                      >
                        <div className="flex justify-between items-center">
                          <span>Subscription</span>
                          <span className="ml-2 px-2 py-0.5 bg-primary text-white text-xs rounded-full">
                            {subscription.charAt(0).toUpperCase() + subscription.slice(1)}
                          </span>
                        </div>
                      </Link>
                      
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setAccountMenuOpen(false)}
                      >
                        Settings
                      </Link>
                      
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setAccountMenuOpen(false);
                          handleLogout();
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/features" 
                  className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition ${
                    isActive('/features') ? 'bg-gray-700' : ''
                  }`}
                >
                  Features
                </Link>
                <Link 
                  to="/pricing" 
                  className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition ${
                    isActive('/pricing') ? 'bg-gray-700' : ''
                  }`}
                >
                  Pricing
                </Link>
                <Link 
                  to="/login" 
                  className="ml-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="ml-2 px-3 py-2 rounded-md text-sm font-medium bg-primary hover:bg-blue-600 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
        
        {/* Mobile menu, show/hide based on menu state */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/dashboard') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/analysis" 
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/analysis') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    New Analysis
                  </Link>
                  <Link 
                    to="/profile" 
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/profile') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link 
                    to="/subscription" 
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/subscription') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Subscription
                  </Link>
                  <button
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/features" 
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/features') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Features
                  </Link>
                  <Link 
                    to="/pricing" 
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/pricing') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                  <Link 
                    to="/login" 
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/login') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="block px-3 py-2 rounded-md text-base font-medium bg-primary text-white hover:bg-blue-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;