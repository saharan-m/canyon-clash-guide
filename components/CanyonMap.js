'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function CanyonMap({ team, fortLocations }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative bg-gray-900 rounded-lg p-4">
      {/* Map container with fixed aspect ratio */}
      <div className="relative w-full" style={{ paddingBottom: '66.67%' }}>
        <div className="absolute inset-0 bg-gray-700 rounded-lg overflow-hidden border-2 border-gray-600">
          {/* Try different image sources */}
          {!imageError && (
            <>
              {/* Method 1: Standard img tag with public folder */}
              <img
                src="/woscanyon.jpg"
                alt="Canyon Clash Map"
                className="absolute inset-0 w-full h-full object-cover"
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  console.log('Image failed to load, trying fallback...');
                  setImageError(true);
                }}
              />
            </>
          )}

          {/* Fallback: Canvas-based background if image fails */}
          {imageError && (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-900 via-blue-700 to-blue-600">
              <div className="w-full h-full relative">
                {/* Simple background pattern */}
                <svg className="w-full h-full opacity-30" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                      <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="1200" height="800" fill="url(#grid)" />
                </svg>
              </div>
            </div>
          )}

          {/* SVG overlay for paths and connections */}
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{ zIndex: 10 }}
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Glow effect for paths */}
              <filter id={`glow-${team.id}`}>
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              
              {/* Arrow marker */}
              <marker
                id={`arrow-${team.id}`}
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M0,0 L0,6 L9,3 z" fill={team.color} />
              </marker>
            </defs>

            {/* Draw connecting lines between forts */}
            {team.path.map((step, idx) => {
              if (idx === team.path.length - 1) return null;
              
              const currentFort = fortLocations[step.fort];
              const nextFort = fortLocations[team.path[idx + 1].fort];
              
              if (!currentFort || !nextFort) return null;

              return (
                <g key={idx}>
                  {/* Glow background line */}
                  <line
                    x1={currentFort.x}
                    y1={currentFort.y}
                    x2={nextFort.x}
                    y2={nextFort.y}
                    stroke={team.color}
                    strokeWidth="12"
                    opacity="0.2"
                    filter={`url(#glow-${team.id})`}
                  />
                  
                  {/* Main animated line */}
                  <line
                    x1={currentFort.x}
                    y1={currentFort.y}
                    x2={nextFort.x}
                    y2={nextFort.y}
                    stroke={team.color}
                    strokeWidth="5"
                    strokeDasharray="15,10"
                    opacity="0.95"
                    markerEnd={`url(#arrow-${team.id})`}
                  >
                    <animate 
                      attributeName="stroke-dashoffset" 
                      from="0" 
                      to="25" 
                      dur="1.5s" 
                      repeatCount="indefinite"
                    />
                  </line>
                </g>
              );
            })}
          </svg>

          {/* Fort markers with numbers */}
          {team.path.map((step, idx) => {
            const fort = fortLocations[step.fort];
            if (!fort) return null;

            return (
              <div
                key={idx}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                  left: `${(fort.x / 1200) * 100}%`,
                  top: `${(fort.y / 800) * 100}%`,
                  zIndex: 20
                }}
              >
                {/* Fort number circle */}
                <div
                  className="relative animate-pulse"
                  style={{
                    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.8))'
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-lg border-4 border-white flex-shrink-0"
                    style={{ 
                      backgroundColor: team.color,
                      boxShadow: `0 0 25px ${team.color}, inset 0 0 10px rgba(0,0,0,0.3)`
                    }}
                  >
                    {step.order}
                  </div>
                  
                  {/* Fort label */}
                  <div 
                    className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-95 text-white px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap border-2 border-white"
                    style={{
                      boxShadow: '0 4px 12px rgba(0,0,0,0.9)'
                    }}
                  >
                    {step.fort}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Fallback message */}
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center text-white text-center pointer-events-none">
              <div className="bg-black bg-opacity-60 p-6 rounded-lg">
                <p className="text-lg font-bold mb-2">⚠️ Map Image Not Found</p>
                <p className="text-sm mb-3">Make sure <code className="bg-gray-800 px-2 py-1 rounded">woscanyon.jpg</code> exists in <code className="bg-gray-800 px-2 py-1 rounded">/public</code> folder</p>
                <p className="text-xs text-gray-300">Showing path overlay on blue background</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Map Legend */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: team.color }}></div>
            <span className="text-white font-semibold text-sm">Path</span>
          </div>
          <p className="text-gray-400 text-xs">{team.path.length} forts</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 bg-green-400 rounded"></div>
            <span className="text-white font-semibold text-sm">Start</span>
          </div>
          <p className="text-gray-400 text-xs">{team.path[0]?.fort}</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-white font-semibold text-sm">Target</span>
          </div>
          <p className="text-gray-400 text-xs">{team.path[team.path.length - 1]?.fort}</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-white font-semibold text-sm">Route</span>
          </div>
          <p className="text-gray-400 text-xs">Animated line</p>
        </div>
      </div>

      <p className="text-gray-400 text-sm mt-4 text-center font-medium">
        📍 Follow numbered forts in order. Animated lines show your attack/defense path.
      </p>

      {/* Debug info */}
      <div className="mt-4 bg-gray-900 rounded-lg p-3 border border-gray-700">
        <p className="text-xs text-gray-500 font-mono">
          📁 Image: /woscanyon.jpg | 🗺️ Forts: {team.path.length} | 🎨 Color: {team.color}
        </p>
      </div>
    </div>
  );
}