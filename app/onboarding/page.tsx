'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppHeader from '@/components/ui/AppHeader';
import VibeTag from '@/components/ui/VibeTag';
import { FiArrowRight, FiCheck, FiInstagram, FiVideo } from 'react-icons/fi';

// Mock vibe options
const VIBE_OPTIONS = [
  'chill', 'energetic', 'romantic', 'cozy', 'elegant', 'trendy', 'artsy', 
  'hipster', 'family-friendly', 'foodie', 'outdoor', 'live-music', 'quiet', 
  'bustling', 'historic', 'modern', 'sporty', 'pet-friendly', 'scenic', 'late-night'
];

// Mock category options
const CATEGORY_OPTIONS = [
  { id: 'restaurants', label: 'Restaurants' },
  { id: 'cafes', label: 'Cafés' },
  { id: 'bars', label: 'Bars' },
  { id: 'clubs', label: 'Nightclubs' },
  { id: 'parks', label: 'Parks' },
  { id: 'museums', label: 'Museums' },
  { id: 'galleries', label: 'Art Galleries' },
  { id: 'shops', label: 'Shopping' },
  { id: 'markets', label: 'Markets' },
  { id: 'theaters', label: 'Theaters' },
  { id: 'fitness', label: 'Fitness' },
  { id: 'outdoors', label: 'Outdoor Activities' },
  { id: 'events', label: 'Events' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxDistance, setMaxDistance] = useState(10);
  const [connectInstagram, setConnectInstagram] = useState(false);
  const [connectTikTok, setConnectTikTok] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleVibeToggle = (vibe: string) => {
    if (selectedVibes.includes(vibe)) {
      setSelectedVibes(selectedVibes.filter(v => v !== vibe));
    } else {
      setSelectedVibes([...selectedVibes, vibe]);
    }
  };
  
  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleComplete = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, this would save the user preferences to the backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to home page
      router.push('/');
    } catch (error) {
      console.error('Error saving preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const canProceed = () => {
    if (step === 1) {
      return selectedVibes.length > 0;
    } else if (step === 2) {
      return selectedCategories.length > 0;
    } else {
      return true;
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      
      <main className="flex-1 container-fluid py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > 1 ? <FiCheck /> : 1}
                </div>
                <div className={`h-1 w-12 ${
                  step > 1 ? 'bg-primary' : 'bg-gray-200'
                }`}></div>
              </div>
              
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > 2 ? <FiCheck /> : 2}
                </div>
                <div className={`h-1 w-12 ${
                  step > 2 ? 'bg-primary' : 'bg-gray-200'
                }`}></div>
              </div>
              
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                3
              </div>
            </div>
            
            <div className="flex justify-between mt-2 text-sm">
              <span className={step >= 1 ? 'text-primary font-medium' : 'text-gray-500'}>
                Vibes
              </span>
              <span className={step >= 2 ? 'text-primary font-medium' : 'text-gray-500'}>
                Categories
              </span>
              <span className={step >= 3 ? 'text-primary font-medium' : 'text-gray-500'}>
                Connect
              </span>
            </div>
          </div>
          
          {/* Step 1: Vibes */}
          {step === 1 && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h1 className="text-2xl font-bold mb-2">What vibes are you into?</h1>
              <p className="text-gray-600 mb-6">
                Select the vibes you enjoy to help us personalize your recommendations.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {VIBE_OPTIONS.map(vibe => (
                  <VibeTag
                    key={vibe}
                    tag={vibe}
                    onClick={handleVibeToggle}
                    selected={selectedVibes.includes(vibe)}
                  />
                ))}
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`btn-primary flex items-center ${
                    !canProceed() ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Next
                  <FiArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          )}
          
          {/* Step 2: Categories */}
          {step === 2 && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h1 className="text-2xl font-bold mb-2">What categories interest you?</h1>
              <p className="text-gray-600 mb-6">
                Select the types of places you'd like to discover.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                {CATEGORY_OPTIONS.map(category => (
                  <div
                    key={category.id}
                    onClick={() => handleCategoryToggle(category.id)}
                    className={`p-3 border rounded-md cursor-pointer transition-colors ${
                      selectedCategories.includes(category.id)
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${category.id}`}
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => {}}
                        className="mr-2"
                      />
                      <label htmlFor={`category-${category.id}`} className="cursor-pointer">
                        {category.label}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mb-8">
                <h2 className="text-lg font-medium mb-2">Maximum distance</h2>
                <p className="text-gray-600 mb-3">
                  How far are you willing to travel for recommendations?
                </p>
                
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>1 km</span>
                  <span>{maxDistance} km</span>
                  <span>50 km</span>
                </div>
              </div>
              
              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="btn-outline"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`btn-primary flex items-center ${
                    !canProceed() ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Next
                  <FiArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          )}
          
          {/* Step 3: Connect Social */}
          {step === 3 && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h1 className="text-2xl font-bold mb-2">Connect your social accounts</h1>
              <p className="text-gray-600 mb-6">
                Connect your social media accounts for more personalized recommendations.
                This step is optional but recommended.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className={`p-4 border rounded-lg ${
                  connectInstagram ? 'border-primary bg-primary/5' : 'border-gray-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FiInstagram className="text-2xl mr-3 text-pink-500" />
                      <div>
                        <h3 className="font-medium">Instagram</h3>
                        <p className="text-sm text-gray-500">
                          Connect to analyze your liked content
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setConnectInstagram(!connectInstagram)}
                      className={`px-4 py-2 rounded-md ${
                        connectInstagram
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {connectInstagram ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                </div>
                
                <div className={`p-4 border rounded-lg ${
                  connectTikTok ? 'border-primary bg-primary/5' : 'border-gray-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FiVideo className="text-2xl mr-3 text-black" />
                      <div>
                        <h3 className="font-medium">TikTok</h3>
                        <p className="text-sm text-gray-500">
                          Connect to analyze your favorite videos
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setConnectTikTok(!connectTikTok)}
                      className={`px-4 py-2 rounded-md ${
                        connectTikTok
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {connectTikTok ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="btn-outline"
                >
                  Back
                </button>
                <button
                  onClick={handleComplete}
                  disabled={isLoading}
                  className="btn-primary"
                >
                  {isLoading ? 'Saving...' : 'Complete Setup'}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

