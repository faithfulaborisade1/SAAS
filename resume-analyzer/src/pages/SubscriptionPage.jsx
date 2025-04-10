import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSubscription } from '../store/authSlice';
import Button from '../components/common/Button';

const SubscriptionPage = () => {
  const { subscription } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const [selectedPlan, setSelectedPlan] = useState(subscription);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  const plans = {
    standard: {
      name: 'Standard',
      monthly: 0,
      yearly: 0,
      features: [
        '5 resume analyses per day',
        'Basic recommendations',
        'Limited templates',
        'Standard support',
      ],
      limitations: [
        'No advanced AI features',
        'No premium templates',
        'No bulk processing',
      ],
    },
    premium: {
      name: 'Premium',
      monthly: 10,
      yearly: 96, // 20% discount for annual
      features: [
        'Unlimited resume analyses',
        'Advanced recommendations',
        'Full template library',
        'Priority support',
        'AI-powered improvement suggestions',
        'Resume version history',
      ],
      limitations: [
        'No team collaboration',
        'No API access',
      ],
    },
    professional: {
      name: 'Professional',
      monthly: 200,
      yearly: 1920, // 20% discount for annual
      features: [
        'All Premium features',
        'Bulk resume processing',
        'Candidate ranking',
        'Advanced analytics',
        'Team collaboration',
        'API access',
        'Dedicated account manager',
      ],
      limitations: [],
    },
  };
  
  const handleChangePlan = async () => {
    if (selectedPlan === subscription) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call to update subscription
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update Redux store with new subscription
      dispatch(updateSubscription(selectedPlan));
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('Failed to update subscription. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const renderPrice = (plan) => {
    const price = billingCycle === 'monthly' ? plan.monthly : plan.yearly;
    
    if (price === 0) {
      return 'Free';
    }
    
    return (
      <>
        <span className="text-4xl font-bold">€{price}</span>
        <span className="text-gray-500 text-lg">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
      </>
    );
  };
  
  const getDiscountPercentage = (monthlyPrice, yearlyPrice) => {
    if (monthlyPrice === 0) return 0;
    const annualMonthlyEquivalent = yearlyPrice / 12;
    return Math.round(((monthlyPrice - annualMonthlyEquivalent) / monthlyPrice) * 100);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Subscription Plans</h1>
      <p className="text-gray-600 mb-8">
        Choose the right plan to maximize your job search success.
      </p>
      
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-8">
          Your subscription has been updated successfully! The changes will take effect immediately.
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
          {error}
        </div>
      )}
      
      {/* Billing cycle toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 inline-flex rounded-lg">
          <button
            className={`px-6 py-2 rounded-md ${
              billingCycle === 'monthly' ? 'bg-white shadow-sm' : 'text-gray-500'
            }`}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </button>
          <button
            className={`px-6 py-2 rounded-md ${
              billingCycle === 'yearly' ? 'bg-white shadow-sm' : 'text-gray-500'
            }`}
            onClick={() => setBillingCycle('yearly')}
          >
            Yearly
            <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
              Save 20%
            </span>
          </button>
        </div>
      </div>
      
      {/* Subscription plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {Object.entries(plans).map(([planId, plan]) => (
          <div 
            key={planId}
            className={`border rounded-lg overflow-hidden ${
              selectedPlan === planId 
                ? 'border-primary ring-2 ring-blue-100' 
                : 'border-gray-200'
            }`}
          >
            {/* Plan header */}
            <div className="p-6 bg-white">
              <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
              <div className="mb-4">
                {renderPrice(plan)}
              </div>
              
              <Button
                fullWidth
                variant={selectedPlan === planId ? 'primary' : 'outline'}
                disabled={planId === subscription || loading}
                onClick={() => setSelectedPlan(planId)}
              >
                {planId === subscription ? 'Current Plan' : 'Select Plan'}
              </Button>
            </div>
            
            {/* Plan features */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-3">What's included:</h3>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
                
                {plan.limitations.map((limitation, index) => (
                  <li key={index} className="flex items-start text-gray-500">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                    </svg>
                    <span>{limitation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      
      {/* Action buttons */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1">Your Current Plan: {plans[subscription].name}</h3>
            <p className="text-gray-600">
              {subscription === 'standard' ? (
                'Free plan with limited features'
              ) : (
                `Billed ${billingCycle === 'monthly' ? 'monthly' : 'annually'}`
              )}
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-4">
            {selectedPlan !== subscription && (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedPlan(subscription)}
                >
                  Cancel
                </Button>
                
                <Button 
                  variant="primary"
                  isLoading={loading}
                  onClick={handleChangePlan}
                >
                  {subscription === 'standard' ? 'Upgrade Plan' : 'Change Plan'}
                </Button>
              </>
            )}
            
            {selectedPlan === subscription && subscription !== 'standard' && (
              <Button 
                variant="danger" 
                isLoading={loading}
                disabled={loading}
              >
                Cancel Subscription
              </Button>
            )}
          </div>
        </div>
        
        {/* Special notes based on current subscription */}
        {subscription === 'standard' && selectedPlan !== 'standard' && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-gray-700">
            <p className="font-medium">What happens when you upgrade?</p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>You'll be charged immediately for your new plan</li>
              <li>You'll have immediate access to all premium features</li>
              <li>You can cancel at any time</li>
            </ul>
          </div>
        )}
        
        {subscription !== 'standard' && selectedPlan === 'standard' && (
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg text-sm text-gray-700">
            <p className="font-medium">What happens when you downgrade?</p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Your current plan benefits will continue until the end of your billing period</li>
              <li>You won't be charged for the next billing cycle</li>
              <li>You can upgrade again at any time</li>
            </ul>
          </div>
        )}
      </div>
      
      {/* FAQ section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Can I change plans at any time?</h3>
            <p className="text-gray-600">
              Yes, you can upgrade, downgrade, or cancel your subscription at any time. 
              Changes will take effect immediately for upgrades, or at the end of your billing cycle for downgrades.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">How does the billing work?</h3>
            <p className="text-gray-600">
              We offer both monthly and annual billing options. Annual subscriptions come with a 20% discount 
              compared to monthly billing. Your subscription will automatically renew at the end of each billing period 
              unless you cancel.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-600">
              We accept all major credit cards, including Visa, Mastercard, and American Express. 
              For annual subscriptions over €500, we also offer invoice payment options.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Is there a refund policy?</h3>
            <p className="text-gray-600">
              We offer a 14-day money-back guarantee for all new subscriptions. If you're not satisfied 
              with our service, you can cancel within the first 14 days and receive a full refund.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;