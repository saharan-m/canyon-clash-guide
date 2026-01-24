'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function CanyonMap({ team, fortLocations }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative bg-slate-900/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-5 border border-slate-700/50 shadow-2xl">
      {/* Map Header */}
      <div className="mb-3 sm:mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div 
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: team.color }}
          ></div>
          <span className="text-xs sm:text-sm text-muted font-semibold uppercase tracking-wider">
            {team.name} Path
          </span>
        </div>
        <div className="text-xs text-muted">
          {team.path.length} objectives
        </div>
      </div>
      
      <div className="relative">
      {/* Map container with fixed aspect ratio */}
      <div className="relative w-full" style={{ paddingBottom: '66.67%' }}>
        <div className="absolute inset-0 bg-slate-800/80 rounded-lg overflow-hidden border-2 border-slate-700/70 shadow-inner">
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
              
              {/* Gradient definition for path depth */}
              <linearGradient id={`pathGradient-${team.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={team.color} stopOpacity="1" />
                <stop offset="100%" stopColor={team.color} stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Draw connecting lines between forts */}
            {team.path.map((step, idx) => {
              if (idx === team.path.length - 1) return null;
              
              const currentFort = fortLocations[step.fort];
              const nextFort = fortLocations[team.path[idx + 1].fort];
              
              if (!currentFort || !nextFort) return null;

              return (
                <g key={idx}>
                  {/* Enhanced Glow background line */}
                  <line
                    x1={currentFort.x}
                    y1={currentFort.y}
                    x2={nextFort.x}
                    y2={nextFort.y}
                    stroke={team.color}
                    strokeWidth="20"
                    opacity="0.25"
                    filter={`url(#glow-${team.id})`}
                  />
                  
                  {/* Main animated line - More visible and professional */}
                  <line
                    x1={currentFort.x}
                    y1={currentFort.y}
                    x2={nextFort.x}
                    y2={nextFort.y}
                    stroke={team.color}
                    strokeWidth="8"
                    strokeDasharray="20,10"
                    opacity="0.95"
                    strokeLinecap="round"
                    markerEnd={`url(#arrow-${team.id})`}
                  >
                    <animate 
                      attributeName="stroke-dashoffset" 
                      from="0" 
                      to="30" 
                      dur="1.8s" 
                      repeatCount="indefinite"
                    />
                  </line>
                  
                  {/* Gradient overlay for depth */}
                  <line
                    x1={currentFort.x}
                    y1={currentFort.y}
                    x2={nextFort.x}
                    y2={nextFort.y}
                    stroke={`url(#pathGradient-${team.id})`}
                    strokeWidth="4"
                    opacity="0.7"
                    strokeLinecap="round"
                  />
                </g>
              );
            })}
            
            {/* Draw fort markers - Enhanced */}
            {team.path.map((step, idx) => {
              const fort = fortLocations[step.fort];
              if (!fort) return null;

              const isStart = idx === 0;
              const isEnd = idx === team.path.length - 1;
              const isCritical = step.fort.includes('9') || step.fort.includes('13') || step.fort.includes('19');

              return (
                <g key={`fort-${step.fort}`}>
                  {/* Outer glow ring - Enhanced */}
                  <circle
                    cx={fort.x}
                    cy={fort.y}
                    r={isStart || isEnd ? "26" : "20"}
                    fill={team.color}
                    opacity="0.3"
                    filter={`url(#glow-${team.id})`}
                  />
                  
                  {/* Pulsing ring for active forts */}
                  <circle
                    cx={fort.x}
                    cy={fort.y}
                    r={isStart || isEnd ? "24" : "18"}
                    fill="none"
                    stroke={team.color}
                    strokeWidth="2"
                    opacity="0.5"
                  >
                    <animate
                      attributeName="r"
                      values={`${isStart || isEnd ? "24" : "18"};${isStart || isEnd ? "28" : "22"};${isStart || isEnd ? "24" : "18"}`}
                      dur="2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.5;0.2;0.5"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  
                  {/* Main fort circle - Enhanced with gradient effect */}
                  <circle
                    cx={fort.x}
                    cy={fort.y}
                    r={isStart || isEnd ? "20" : "16"}
                    fill={isStart ? "#10B981" : isEnd ? "#EF4444" : team.color}
                    stroke="#ffffff"
                    strokeWidth="3"
                    opacity="0.98"
                    filter={`url(#glow-${team.id})`}
                  />
                  
                  {/* Inner highlight */}
                  <circle
                    cx={fort.x}
                    cy={fort.y}
                    r={isStart || isEnd ? "12" : "10"}
                    fill="rgba(255, 255, 255, 0.3)"
                  />
                  
                  {/* Order number - Enhanced */}
                  <text
                    x={fort.x}
                    y={fort.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#ffffff"
                    fontSize="18"
                    fontWeight="900"
                    stroke="#000000"
                    strokeWidth="1"
                    style={{ textShadow: '0 0 4px rgba(0,0,0,0.5)' }}
                  >
                    {step.order}
                  </text>
                  
                  {/* Fort label - Enhanced */}
                  <text
                    x={fort.x}
                    y={fort.y + (isStart || isEnd ? "38" : "32")}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="15"
                    fontWeight="700"
                    stroke="#000000"
                    strokeWidth="2.5"
                    style={{ textShadow: '0 0 6px rgba(0,0,0,0.8)' }}
                  >
                    {step.fort}
                  </text>
                  
                  {/* Critical indicator - Enhanced */}
                  {isCritical && (
                    <>
                      <circle
                        cx={fort.x}
                        cy={fort.y}
                        r={isStart || isEnd ? "26" : "22"}
                        fill="none"
                        stroke="#FCD34D"
                        strokeWidth="3"
                        strokeDasharray="5,3"
                        opacity="0.9"
                      />
                      <circle
                        cx={fort.x}
                        cy={fort.y}
                        r={isStart || isEnd ? "26" : "22"}
                        fill="none"
                        stroke="#FCD34D"
                        strokeWidth="1"
                        opacity="0.5"
                      >
                        <animate
                          attributeName="r"
                          values={`${isStart || isEnd ? "26" : "22"};${isStart || isEnd ? "30" : "26"};${isStart || isEnd ? "26" : "22"}`}
                          dur="1.5s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Fallback message */}
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center text-white text-center pointer-events-none">
              <div className="bg-black/60 p-6 rounded-lg">
                <p className="text-lg font-bold mb-2">⚠️ Map Image Not Found</p>
                <p className="text-sm mb-3">Make sure <code className="bg-slate-800 px-2 py-1 rounded">woscanyon.jpg</code> exists in <code className="bg-slate-800 px-2 py-1 rounded">/public</code> folder</p>
                <p className="text-xs text-body">Showing path overlay on blue background</p>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>

      {/* Enhanced Map Legend */}
      <div className="mt-4 sm:mt-6 grid grid-cols-3 gap-2 sm:gap-3">
        <div className="card p-2 sm:p-3 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: team.color }}></div>
            <span className="text-white font-semibold text-xs sm:text-sm">Path</span>
          </div>
          <p className="text-muted text-xs">{team.path.length} forts</p>
        </div>
        
        <div className="card p-2 sm:p-3 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="w-3 h-3 bg-green-400 rounded"></div>
            <span className="text-white font-semibold text-xs sm:text-sm">Start</span>
          </div>
          <p className="text-muted text-xs font-mono">{team.path[0]?.fort}</p>
        </div>
        
        <div className="card p-2 sm:p-3 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-white font-semibold text-xs sm:text-sm">Target</span>
          </div>
          <p className="text-muted text-xs font-mono">{team.path[team.path.length - 1]?.fort}</p>
        </div>
      </div>

      <p className="text-muted text-xs sm:text-sm mt-3 sm:mt-4 text-center font-medium">
        Follow numbered forts in order. Animated lines show your attack/defense path.
      </p>
    </div>
  );
}