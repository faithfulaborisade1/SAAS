import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// Context providers
import { ToastProvider } from './contexts/ToastContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Error handling
import ErrorBoundary from './components/common/ErrorBoundary';

// Layout components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Page components
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import AnalysisPage from './pages/AnalysisPage';
import SubscriptionPage from './pages/SubscriptionPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// Auth protection
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <ThemeProvider>
          <ToastProvider>
            <Router>
              <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    
                    {/* Protected routes */}
                    <Route 
                      path="/dashboard" 
                      element={
                        <ProtectedRoute>
                          <DashboardPage />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/analysis" 
                      element={
                        <ProtectedRoute>
                          <AnalysisPage />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/subscription" 
                      element={
                        <ProtectedRoute>
                          <SubscriptionPage />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/profile" 
                      element={
                        <ProtectedRoute>
                          <ProfilePage />
                        </ProtectedRoute>
                      } 
                    />
                    
                    {/* Premium features route example */}
                    <Route 
                      path="/premium-features" 
                      element={
                        <ProtectedRoute requiredSubscription="premium">
                          <div>Premium Features Page</div>
                        </ProtectedRoute>
                      } 
                    />
                    
                    {/* Catch-all route for 404 */}
                    <Route 
                      path="*" 
                      element={
                        <div className="flex flex-col items-center justify-center min-h-[70vh]">
                          <h1 className="text-4xl font-bold mb-4">404</h1>
                          <p className="text-xl mb-8">Page not found</p>
                          <a href="/" className="px-4 py-2 bg-primary text-white rounded-lg">
                            Go Home
                          </a>
                        </div>
                      } 
                    />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </ToastProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;