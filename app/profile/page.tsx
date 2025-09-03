'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AppHeader from '@/components/ui/AppHeader';
import VibeTag from '@/components/ui/VibeTag';
import { FiEdit2, FiSettings, FiLogOut, FiUser, FiHeart, FiCreditCard, FiInstagram, FiVideo } from 'react-icons/fi';

// Mock user data
const MOCK_USER = {
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar_url: 'https://randomuser.me/api/portraits/lego/1.jpg',
  preferences: {
    vibes: ['trendy', 'foodie', 'outdoor', 'cozy'],
    categories: ['restaurants', 'cafes', 'parks', 'markets'],
    max_distance: 15,
  },
  saved_locations: ['1', '2'],
  onboarding_complete: true,
  subscription_tier: 'free' as const,
};

export default function ProfilePage() {
  const [user] = useState(MOCK_USER);
  const [activeTab, setActiveTab] = useState('preferences');
  
  const handleLogout = () => {
    // In a real app, this would call an API to log out
    window.location.href = '/';
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      
      <main className="flex-1 container-fluid py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-4 md:mb-0 md:mr-6">
                {user.avatar_url ? (
                  <Image 
                    src={user.avatar_url} 
                    alt={user.name} 
                    width={96} 
                    height={96} 
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary text-white text-2xl">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              
              <div className="text-center md:text-left flex-1">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
                
                <div className="mt-2 flex flex-wrap justify-center md:justify-start">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.subscription_tier === 'premium' 
                      ? 'bg-accent/10 text-accent-700' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.subscription_tier === 'premium' ? 'Premium' : 'Free'} Plan
                  </span>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex space-x-2">
                <Link href="/settings" className="btn-outline py-2 flex items-center">
                  <FiSettings className="mr-2" />
                  Settings
                </Link>
                <button 
                  onClick={handleLogout}
                  className="btn-outline py-2 flex items-center text-red-600 border-red-600 hover:bg-red-50"
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="border-b">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('preferences')}
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === 'preferences'
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Preferences
                </button>
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === 'saved'
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Saved Places
                </button>
                <button
                  onClick={() => setActiveTab('subscription')}
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === 'subscription'
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Subscription
                </button>
                <button
                  onClick={() => setActiveTab('account')}
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === 'account'
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Account
                </button>
              </nav>
            </div>
            
            <div className="p-6">
              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Your Preferences</h2>
                    <Link href="/onboarding" className="text-primary hover:underline flex items-center">
                      <FiEdit2 className="mr-1" />
                      Edit
                    </Link>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Vibes */}
                    <div>
                      <h3 className="text-lg font-medium mb-2">Vibes</h3>
                      <div className="flex flex-wrap gap-2">
                        {user.preferences.vibes.map(vibe => (
                          <VibeTag key={vibe} tag={vibe} />
                        ))}
                      </div>
                    </div>
                    
                    {/* Categories */}
                    <div>
                      <h3 className="text-lg font-medium mb-2">Categories</h3>
                      <div className="flex flex-wrap gap-2">
                        {user.preferences.categories.map(category => (
                          <span 
                            key={category}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Distance */}
                    <div>
                      <h3 className="text-lg font-medium mb-2">Maximum Distance</h3>
                      <p>{user.preferences.max_distance} km</p>
                    </div>
                    
                    {/* Connected Accounts */}
                    <div>
                      <h3 className="text-lg font-medium mb-2">Connected Accounts</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <FiInstagram className="text-pink-500 mr-2" />
                          <span className="text-gray-600">Instagram</span>
                          <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded">
                            Not Connected
                          </span>
                        </div>
                        <div className="flex items-center">
                          <FiVideo className="text-black mr-2" />
                          <span className="text-gray-600">TikTok</span>
                          <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded">
                            Not Connected
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Saved Places Tab */}
              {activeTab === 'saved' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Saved Places</h2>
                    <Link href="/saved" className="text-primary hover:underline">
                      View All
                    </Link>
                  </div>
                  
                  <div className="text-center py-8">
                    <FiHeart className="mx-auto text-4xl text-gray-300 mb-2" />
                    <p className="text-gray-500">
                      You have {user.saved_locations.length} saved places.
                    </p>
                    <Link href="/saved" className="btn-primary mt-4 inline-block">
                      View Saved Places
                    </Link>
                  </div>
                </div>
              )}
              
              {/* Subscription Tab */}
              {activeTab === 'subscription' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Your Subscription</h2>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Current Plan</h3>
                        <p className="text-lg font-bold capitalize">{user.subscription_tier}</p>
                      </div>
                      
                      {user.subscription_tier === 'free' && (
                        <Link href="/subscription" className="btn-primary">
                          Upgrade to Premium
                        </Link>
                      )}
                      
                      {user.subscription_tier === 'premium' && (
                        <button className="btn-outline text-red-600 border-red-600 hover:bg-red-50">
                          Cancel Subscription
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {user.subscription_tier === 'free' && (
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-primary text-white p-4">
                        <h3 className="text-lg font-bold">Premium Benefits</h3>
                      </div>
                      <div className="p-4">
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <FiCheck className="text-accent mr-2" />
                            Advanced filtering options
                          </li>
                          <li className="flex items-center">
                            <FiCheck className="text-accent mr-2" />
                            Personalized vibe matching
                          </li>
                          <li className="flex items-center">
                            <FiCheck className="text-accent mr-2" />
                            No advertisements
                          </li>
                          <li className="flex items-center">
                            <FiCheck className="text-accent mr-2" />
                            Unlimited saved places
                          </li>
                        </ul>
                        
                        <div className="mt-4">
                          <Link href="/subscription" className="btn-primary w-full">
                            Upgrade for $5/month
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {user.subscription_tier === 'premium' && (
                    <div>
                      <h3 className="text-lg font-medium mb-2">Payment Method</h3>
                      <div className="flex items-center p-3 border rounded-md">
                        <FiCreditCard className="text-gray-400 mr-3" />
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-gray-500">Expires 12/25</p>
                        </div>
                        <button className="ml-auto text-primary hover:underline">
                          Update
                        </button>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-2">Billing History</h3>
                        <div className="border rounded-md overflow-hidden">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Status
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  Aug 1, 2023
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  $5.00
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Paid
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  Jul 1, 2023
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  $5.00
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Paid
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Account Tab */}
              {activeTab === 'account' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Account Settings</h2>
                  
                  <div className="space-y-6">
                    {/* Profile Information */}
                    <div>
                      <h3 className="text-lg font-medium mb-2">Profile Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Profile Picture
                          </label>
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 mr-4">
                              {user.avatar_url ? (
                                <Image 
                                  src={user.avatar_url} 
                                  alt={user.name} 
                                  width={48} 
                                  height={48} 
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-primary text-white">
                                  {user.name.charAt(0).toUpperCase()}
                                </div>
                              )}
                            </div>
                            <button className="btn-outline py-1 text-sm">
                              Change
                            </button>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            value={user.name}
                            className="input"
                            readOnly
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            value={user.email}
                            className="input"
                            readOnly
                          />
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <button className="btn-primary">
                          Update Profile
                        </button>
                      </div>
                    </div>
                    
                    {/* Password */}
                    <div className="pt-6 border-t">
                      <h3 className="text-lg font-medium mb-2">Password</h3>
                      <button className="btn-outline">
                        Change Password
                      </button>
                    </div>
                    
                    {/* Delete Account */}
                    <div className="pt-6 border-t">
                      <h3 className="text-lg font-medium mb-2">Delete Account</h3>
                      <p className="text-gray-600 mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <button className="text-red-600 hover:text-red-800 font-medium">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

