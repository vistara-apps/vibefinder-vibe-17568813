'use client';

import { useMemo } from 'react';

// Define a mapping of vibe tags to their corresponding colors
const VIBE_COLORS: Record<string, string> = {
  'chill': 'bg-blue-100 text-blue-800',
  'energetic': 'bg-red-100 text-red-800',
  'romantic': 'bg-pink-100 text-pink-800',
  'cozy': 'bg-amber-100 text-amber-800',
  'elegant': 'bg-purple-100 text-purple-800',
  'trendy': 'bg-teal-100 text-teal-800',
  'artsy': 'bg-indigo-100 text-indigo-800',
  'hipster': 'bg-lime-100 text-lime-800',
  'family-friendly': 'bg-green-100 text-green-800',
  'foodie': 'bg-orange-100 text-orange-800',
  'outdoor': 'bg-emerald-100 text-emerald-800',
  'live-music': 'bg-violet-100 text-violet-800',
  'quiet': 'bg-slate-100 text-slate-800',
  'bustling': 'bg-rose-100 text-rose-800',
  'historic': 'bg-amber-100 text-amber-800',
  'modern': 'bg-sky-100 text-sky-800',
  'sporty': 'bg-green-100 text-green-800',
  'pet-friendly': 'bg-cyan-100 text-cyan-800',
  'scenic': 'bg-emerald-100 text-emerald-800',
  'late-night': 'bg-indigo-100 text-indigo-800',
};

interface VibeTagProps {
  tag: string;
  onClick?: (tag: string) => void;
  selected?: boolean;
}

export default function VibeTag({ tag, onClick, selected = false }: VibeTagProps) {
  // Determine the color based on the tag, or use a default color
  const colorClass = useMemo(() => {
    return VIBE_COLORS[tag.toLowerCase()] || 'bg-gray-100 text-gray-800';
  }, [tag]);
  
  // Add selected styling if the tag is selected
  const selectedClass = selected ? 'ring-2 ring-primary ring-offset-1' : '';
  
  return (
    <div 
      className={`vibe-tag ${colorClass} ${selectedClass} ${onClick ? 'cursor-pointer hover:opacity-80' : ''}`}
      onClick={() => onClick && onClick(tag)}
    >
      {tag}
    </div>
  );
}

