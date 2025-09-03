'use client';

import { useMemo } from 'react';

interface MapPinProps {
  variant?: 'active' | 'inactive';
  trendScore?: number;
  onClick?: () => void;
}

export default function MapPin({
  variant = 'inactive',
  trendScore,
  onClick,
}: MapPinProps) {
  // Determine color based on trend score
  const pinColor = useMemo(() => {
    if (variant === 'active') {
      return '#4078F2'; // primary color
    }
    
    if (trendScore) {
      if (trendScore >= 90) {
        return '#4BD8A2'; // accent color
      } else if (trendScore >= 70) {
        return '#4078F2'; // primary color
      } else if (trendScore >= 50) {
        return '#F59E0B'; // amber-500
      } else {
        return '#6B7280'; // gray-500
      }
    }
    
    return '#6B7280'; // default gray
  }, [variant, trendScore]);
  
  // Determine size based on variant
  const size = variant === 'active' ? 40 : 32;
  
  return (
    <div
      className={`map-pin ${onClick ? 'cursor-pointer' : ''} ${
        variant === 'active' ? 'z-10' : ''
      }`}
      onClick={onClick}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 0C9.373 0 4 5.373 4 12c0 7.019 7.671 14.425 11.122 17.944C15.583 30.309 16 32 16 32s0.417-1.691 0.878-2.056C20.329 26.425 28 19.019 28 12 28 5.373 22.627 0 16 0z"
          fill={pinColor}
        />
        <circle cx="16" cy="12" r="6" fill="white" />
        {trendScore && variant === 'active' && (
          <text
            x="16"
            y="14"
            textAnchor="middle"
            dominantBaseline="middle"
            fill={pinColor}
            fontSize="8"
            fontWeight="bold"
          >
            {trendScore}
          </text>
        )}
      </svg>
    </div>
  );
}

