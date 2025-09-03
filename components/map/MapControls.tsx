'use client';

import { useState } from 'react';
import { FiFilter, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import VibeTag from '../ui/VibeTag';
import { RecommendationFilters } from '@/types';

interface MapControlsProps {
  filters: RecommendationFilters;
  onFilterChange: (filters: RecommendationFilters) => void;
  vibeOptions: string[];
  categoryOptions: string[];
}

export default function MapControls({
  filters,
  onFilterChange,
  vibeOptions,
  categoryOptions,
}: MapControlsProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('vibes');

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const handleVibeToggle = (vibe: string) => {
    const currentVibes = filters.vibes || [];
    const newVibes = currentVibes.includes(vibe)
      ? currentVibes.filter(v => v !== vibe)
      : [...currentVibes, vibe];
    
    onFilterChange({
      ...filters,
      vibes: newVibes,
    });
  };

  const handleCategoryToggle = (category: string) => {
    const currentCategories = filters.categories || [];
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category];
    
    onFilterChange({
      ...filters,
      categories: newCategories,
    });
  };

  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      distance: parseInt(e.target.value, 10),
    });
  };

  const handlePriceToggle = (price: number) => {
    const currentPrices = filters.price_level || [];
    const newPrices = currentPrices.includes(price)
      ? currentPrices.filter(p => p !== price)
      : [...currentPrices, price];
    
    onFilterChange({
      ...filters,
      price_level: newPrices,
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      sort_by: e.target.value as 'trending' | 'distance' | 'rating',
    });
  };

  const clearFilters = () => {
    onFilterChange({
      sort_by: 'trending',
    });
  };

  // Count active filters
  const activeFilterCount = 
    (filters.vibes?.length || 0) + 
    (filters.categories?.length || 0) + 
    (filters.price_level?.length || 0) + 
    (filters.distance ? 1 : 0);

  return (
    <div className="relative z-10">
      {/* Filter Toggle Button */}
      <button
        onClick={toggleFilter}
        className="fixed bottom-4 right-4 bg-primary text-white rounded-full p-3 shadow-lg flex items-center"
        aria-label="Toggle filters"
      >
        {isFilterOpen ? <FiX className="text-lg" /> : (
          <>
            <FiFilter className="text-lg mr-2" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="ml-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </>
        )}
      </button>

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="fixed bottom-16 right-4 bg-white rounded-lg shadow-xl p-4 w-80 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Filters</h3>
            <button
              onClick={clearFilters}
              className="text-primary text-sm hover:underline"
            >
              Clear All
            </button>
          </div>

          {/* Sort By */}
          <div className="mb-4">
            <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              id="sort-by"
              value={filters.sort_by || 'trending'}
              onChange={handleSortChange}
              className="input"
            >
              <option value="trending">Trending</option>
              <option value="distance">Distance</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          {/* Vibes Section */}
          <div className="mb-4 border-t pt-3">
            <button
              onClick={() => toggleSection('vibes')}
              className="flex justify-between items-center w-full text-left"
            >
              <h4 className="text-md font-medium">Vibes</h4>
              {expandedSection === 'vibes' ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            
            {expandedSection === 'vibes' && (
              <div className="mt-2 flex flex-wrap">
                {vibeOptions.map(vibe => (
                  <VibeTag
                    key={vibe}
                    tag={vibe}
                    onClick={handleVibeToggle}
                    selected={(filters.vibes || []).includes(vibe)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Categories Section */}
          <div className="mb-4 border-t pt-3">
            <button
              onClick={() => toggleSection('categories')}
              className="flex justify-between items-center w-full text-left"
            >
              <h4 className="text-md font-medium">Categories</h4>
              {expandedSection === 'categories' ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            
            {expandedSection === 'categories' && (
              <div className="mt-2 grid grid-cols-2 gap-2">
                {categoryOptions.map(category => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category}`}
                      checked={(filters.categories || []).includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className="mr-2"
                    />
                    <label htmlFor={`category-${category}`} className="text-sm">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Distance Section */}
          <div className="mb-4 border-t pt-3">
            <button
              onClick={() => toggleSection('distance')}
              className="flex justify-between items-center w-full text-left"
            >
              <h4 className="text-md font-medium">Distance</h4>
              {expandedSection === 'distance' ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            
            {expandedSection === 'distance' && (
              <div className="mt-2">
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={filters.distance || 10}
                  onChange={handleDistanceChange}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>1 km</span>
                  <span>{filters.distance || 10} km</span>
                  <span>50 km</span>
                </div>
              </div>
            )}
          </div>

          {/* Price Section */}
          <div className="mb-4 border-t pt-3">
            <button
              onClick={() => toggleSection('price')}
              className="flex justify-between items-center w-full text-left"
            >
              <h4 className="text-md font-medium">Price Level</h4>
              {expandedSection === 'price' ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            
            {expandedSection === 'price' && (
              <div className="mt-2 flex space-x-2">
                {[1, 2, 3, 4].map(price => (
                  <button
                    key={price}
                    onClick={() => handlePriceToggle(price)}
                    className={`flex-1 py-2 border rounded-md ${
                      (filters.price_level || []).includes(price)
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {'$'.repeat(price)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Apply Button */}
          <button
            onClick={toggleFilter}
            className="w-full btn-primary"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
}

