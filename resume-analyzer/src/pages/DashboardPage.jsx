import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Button from '../components/common/Button';
import resumeService from '../services/resumeService';

const DashboardPage = () => {
  const { user, subscription } = useSelector((state) => state.auth);
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalysisHistory = async () => {
      try {
        // In a real app, this would fetch from the API
        // For now, we'll use mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockHistory = [
          {
            id: '1',
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            jobTitle: 'Frontend Developer',
            company: 'Tech Solutions Inc.',
            matchPercentage: 85,
            viewed: true,
          },
          {
            id: '2',
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            jobTitle: 'React Developer',
            company: 'InnovateSoft',
            matchPercentage: 72,
            viewed: true,
          },
          {
            id: '3',
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            jobTitle: 'UI Engineer',
            company: 'WebDesign Co.',
            matchPercentage: 64,
            viewed: false,
          },
          {
            id: '4',
            date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            jobTitle: 'Full Stack Developer',
            company: 'DevTeam Agency',
            matchPercentage: 78,
            viewed: true,
          },
        ];
        
        setAnalysisHistory(mockHistory);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching analysis history:', err);
        setError('Failed to load analysis history');
        setLoading(false);
      }
    };

    fetchAnalysisHistory();
  }, []);

  // Calculate stats
  const stats = {
    totalAnalyses: analysisHistory.length,
    averageMatch: analysisHistory.length > 0
      ? Math.round(
          analysisHistory.reduce((sum, item) => sum + item.matchPercentage, 0) / 
          analysisHistory.length
        )
      : 0,
    bestMatch: analysisHistory.length > 0
      ? Math.max(...analysisHistory.map(item => item.matchPercentage))
      : 0,
  };

  // Format data for chart
  const chartData = analysisHistory.map(item => ({
    name: item.jobTitle,
    match: item.matchPercentage,
  })).reverse();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link to="/analysis">
          <Button variant="primary">
            New Analysis
          </Button>
        </Link>
      </div>

      {/* Subscription Status */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Your Subscription</h2>
            <div className="flex items-center">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mr-3 ${
                subscription === 'premium' 
                  ? 'bg-blue-100 text-blue-800' 
                  : subscription === 'professional'
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {subscription.charAt(0).toUpperCase() + subscription.slice(1)} Plan
              </span>
              {subscription === 'standard' && (
                <span className="text-gray-600 text-sm">
                  5 analyses per day
                </span>
              )}
              {subscription === 'premium' && (
                <span className="text-gray-600 text-sm">
                  Unlimited analyses
                </span>
              )}
              {subscription === 'professional' && (
                <span className="text-gray-600 text-sm">
                  Unlimited analyses + Team features
                </span>
              )}
            </div>
          </div>
          
          {subscription !== 'professional' && (
            <Link to="/subscription">
              <Button variant={subscription === 'standard' ? 'primary' : 'outline'} size="sm">
                {subscription === 'standard' ? 'Upgrade Plan' : 'Manage Subscription'}
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Total Analyses</h3>
          <div className="flex items-center">
            <div className="text-3xl font-bold text-gray-800">{stats.totalAnalyses}</div>
            {subscription === 'standard' && (
              <div className="ml-2 text-xs text-gray-500">
                ({5 - (stats.totalAnalyses % 5)} remaining today)
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Average Match</h3>
          <div className="text-3xl font-bold text-gray-800">{stats.averageMatch}%</div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Best Match</h3>
          <div className="text-3xl font-bold text-gray-800">{stats.bestMatch}%</div>
        </div>
      </div>

      {/* Recent Analyses Graph */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Recent Analyses</h2>
        
        {chartData.length > 0 ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="match" 
                  name="Match Percentage" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <p className="text-gray-600 mb-2">No analysis data yet</p>
            <Link to="/analysis">
              <Button variant="primary" size="sm">
                Run Your First Analysis
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Analysis History */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Analysis History</h2>
          {analysisHistory.length > 0 && (
            <Button variant="outline" size="sm">
              Export History
            </Button>
          )}
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : error ? (
          <div className="p-6 text-center text-red-500">
            {error}
          </div>
        ) : analysisHistory.length === 0 ? (
          <div className="text-center p-8">
            <p className="text-gray-600">No analysis history yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Match
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {analysisHistory.map((analysis) => (
                  <tr key={analysis.id} className={!analysis.viewed ? 'bg-blue-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(analysis.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {analysis.jobTitle}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{analysis.company}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        analysis.matchPercentage >= 80
                          ? 'bg-green-100 text-green-800'
                          : analysis.matchPercentage >= 60
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {analysis.matchPercentage}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/analysis/${analysis.id}`} className="text-primary hover:text-blue-700 mr-4">
                        View
                      </Link>
                      <button className="text-gray-600 hover:text-gray-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;