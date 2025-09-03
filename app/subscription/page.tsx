'use client';

import { useState } from 'react';
import Link from 'next/link';
import AppHeader from '@/components/ui/AppHeader';
import { FiArrowLeft, FiCheck, FiX } from 'react-icons/fi';

// Mock subscription plans
const SUBSCRIPTION_PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
    description: 'Basic access to trending local spots',
    features: [
      'View trending recommendations',
      'Basic map view',
      'Save up to 5 places',
      'Limited filtering options',
    ],
    limitations: [
      'No personalized vibe matching',
      'Contains advertisements',
      'Limited filtering options',
      'Save limit of 5 places',
    ],
    is_popular: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 5,
    interval: 'month',
    description: 'Enhanced experience with personalized recommendations',
    features: [
      'All Free features',
      'Personalized vibe matching',
      'Advanced filtering options',
      'No advertisements',
      'Unlimited saved places',
      'Priority updates for new features',
    ],
    limitations: [],
    is_popular: true,
  },
];

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('month');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubscribe = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, this would call an API to handle subscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to success page or profile
      window.location.href = '/profile';
    } catch (error) {
      console.error('Error subscribing:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Calculate yearly price (20% discount)
  const getYearlyPrice = (monthlyPrice: number) => {
    return (monthlyPrice * 12 * 0.8).toFixed(2);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      
      <main className="flex-1 container-fluid py-8">
        <div className="mb-6">
          <Link href="/profile" className="inline-flex items-center text-gray-600 hover:text-primary">
            <FiArrowLeft className="mr-2" />
            Back to Profile
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-center">Choose Your Plan</h1>
          <p className="text-gray-600 mb-8 text-center">
            Select the plan that best fits your needs
          </p>
          
          {/* Billing Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-lg inline-flex">
              <button
                onClick={() => setBillingInterval('month')}
                className={`px-4 py-2 rounded-md ${
                  billingInterval === 'month'
                    ? 'bg-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingInterval('year')}
                className={`px-4 py-2 rounded-md ${
                  billingInterval === 'year'
                    ? 'bg-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="ml-1 text-xs text-accent">Save 20%</span>
              </button>
            </div>
          </div>
          
          {/* Subscription Plans */}
          <div className="grid md:grid-cols-2 gap-6">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`border rounded-lg overflow-hidden ${
                  plan.is_popular ? 'border-primary' : 'border-gray-200'
                } ${
                  selectedPlan === plan.id ? 'ring-2 ring-primary' : ''
                }`}
              >
                {plan.is_popular && (
                  <div className="bg-primary text-white text-center py-1 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="p-6">
                  <h2 className="text-xl font-bold">{plan.name}</h2>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="mb-6">
                    {plan.price === 0 ? (
                      <div className="text-3xl font-bold">Free</div>
                    ) : (
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold">
                          ${billingInterval === 'month' ? plan.price : getYearlyPrice(plan.price)}
                        </span>
                        <span className="text-gray-500 ml-1">
                          /{billingInterval}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <FiCheck className="text-accent mt-1 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    
                    {plan.limitations.map((limitation, index) => (
                      <li key={`limit-${index}`} className="flex items-start text-gray-500">
                        <FiX className="text-gray-400 mt-1 mr-2 flex-shrink-0" />
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full ${
                      selectedPlan === plan.id
                        ? 'btn-primary'
                        : 'btn-outline'
                    }`}
                  >
                    {selectedPlan === plan.id ? 'Selected' : 'Select'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Payment Section */}
          {selectedPlan !== 'free' && (
            <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Payment Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="input"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="input"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="input"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={handleSubscribe}
                  disabled={isLoading}
                  className="btn-primary w-full"
                >
                  {isLoading ? 'Processing...' : `Subscribe for $${
                    billingInterval === 'month' 
                      ? SUBSCRIPTION_PLANS.find(p => p.id === selectedPlan)?.price 
                      : getYearlyPrice(SUBSCRIPTION_PLANS.find(p => p.id === selectedPlan)?.price || 0)
                  }/${billingInterval}`}
                </button>
                
                <p className="text-sm text-gray-500 mt-2 text-center">
                  You can cancel your subscription at any time.
                </p>
              </div>
            </div>
          )}
          
          {/* Free Plan Subscribe Button */}
          {selectedPlan === 'free' && (
            <div className="mt-8 text-center">
              <button
                onClick={handleSubscribe}
                disabled={isLoading}
                className="btn-primary"
              >
                {isLoading ? 'Processing...' : 'Continue with Free Plan'}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

