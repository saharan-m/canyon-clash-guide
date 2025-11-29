'use client';

import { useState } from 'react';

export default function AllPathsMap({ teams, fortLocations }) {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [imageError, setImageError] = useState(false);

  const activeteams = Object.values(teams).filter(team => team.path.length > 0);

  return (
    <div className="relative bg-gray-900 rounded-lg p-4">
      {/* Map container with fixed aspect ratio */}
      <div className="relative w-full" style={{ paddingBottom: '66.67%' }}>
        <div className="absolute inset-0 bg-gray-700 rounded-lg overflow-hidden border-2 border-gray-600">
          {/* Map Image */}
          {!imageError && (
            <img
              src="/woscanyon.jpg"
              alt="Canyon Clash Map"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                console.log('Image failed to load');
                setImageError(true);
              }}
            />
          )}

          {/* Fallback background */}
          {imageError && (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-900 via-blue-700 to-blue-600">
              <svg className="w-full h-full opacity-30" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                    <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="1200" height="800" fill="url(#grid)" />
              </svg>
            </div>
          )}

          {/* SVG overlay for all paths */}
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{ zIndex: 10 }}
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Glow effects for each team */}
              {activeteams.map((team) => (
                <filter key={`glow-${team.id}`} id={`glow-${team.id}`}>
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              ))}

              {/* Arrow markers for each team */}
              {activeteams.map((team) => (
                <marker
                  key={`arrow-${team.id}`}
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
              ))}
            </defs>

            {/* Draw all team paths */}
            {activeteams.map((team) => (
              <g key={team.id} opacity={selectedTeam === null || selectedTeam === team.id ? 1 : 0.2} className="transition-opacity duration-300">
                {/* Lines connecting forts */}
                {team.path.map((step, idx) => {
                  if (idx === team.path.length - 1) return null;
                  
                  const currentFort = fortLocations[step.fort];
                  const nextFort = fortLocations[team.path[idx + 1].fort];
                  
                  if (!currentFort || !nextFort) return null;

                  return (
                    <g key={idx}>
                      {/* Glow line */}
                      <line
                        x1={currentFort.x}
                        y1={currentFort.y}
                        x2={nextFort.x}
                        y2={nextFort.y}
                        stroke={team.color}
                        strokeWidth="10"
                        opacity="0.15"
                        filter={`url(#glow-${team.id})`}
                      />
                      
                      {/* Main line with animation */}
                      <line
                        x1={currentFort.x}
                        y1={currentFort.y}
                        x2={nextFort.x}
                        y2={nextFort.y}
                        stroke={team.color}
                        strokeWidth="4"
                        strokeDasharray="12,8"
                        opacity="0.85"
                        markerEnd={`url(#arrow-${team.id})`}
                      >
                        <animate 
                          attributeName="stroke-dashoffset" 
                          from="0" 
                          to="20" 
                          dur="1.2s" 
                          repeatCount="indefinite"
                        />
                      </line>
                    </g>
                  );
                })}
              </g>
            ))}
          </svg>

          {/* Fort markers for all teams */}
          {activeteams.map((team) =>
            team.path.map((step, idx) => {
              const fort = fortLocations[step.fort];
              if (!fort) return null;

              const isSelected = selectedTeam === null || selectedTeam === team.id;

              return (
                <div
                  key={`${team.id}-${idx}`}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300"
                  style={{
                    left: `${(fort.x / 1200) * 100}%`,
                    top: `${(fort.y / 800) * 100}%`,
                    zIndex: 20,
                    opacity: isSelected ? 1 : 0.3,
                  }}
                >
                  <div
                    className="relative"
                    style={{
                      filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.8))'
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs border-2 border-white flex-shrink-0"
                      style={{ 
                        backgroundColor: team.color,
                        boxShadow: `0 0 12px ${team.color}, inset 0 0 4px rgba(0,0,0,0.3)`
                      }}
                    >
                      {step.order}
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* Legend overlay */}
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-80 rounded-lg p-3 pointer-events-auto z-30 max-w-xs">
            <p className="text-white text-xs font-bold mb-2">📍 Teams on Map:</p>
            <div className="flex flex-wrap gap-2">
              {activeteams.slice(0, 3).map((team) => (
                <div
                  key={team.id}
                  className="flex items-center gap-2 text-xs text-white bg-gray-800 px-2 py-1 rounded cursor-pointer hover:bg-gray-700 transition-colors"
                  onClick={() => setSelectedTeam(selectedTeam === team.id ? null : team.id)}
                  style={{
                    borderLeft: `3px solid ${team.color}`
                  }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: team.color }}
                  ></div>
                  <span className="font-semibold">{team.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Filter Controls */}
      <div className="mt-6 bg-gray-800 rounded-lg p-4 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">🎯 Filter Teams</h3>
          {selectedTeam && (
            <button
              onClick={() => setSelectedTeam(null)}
              className="text-sm text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              Show All
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {activeteams.map((team) => (
            <button
              key={team.id}
              onClick={() => setSelectedTeam(selectedTeam === team.id ? null : team.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                selectedTeam === team.id
                  ? 'bg-gray-700 shadow-lg'
                  : selectedTeam === null
                  ? 'bg-gray-700 hover:bg-gray-600'
                  : 'bg-gray-900 opacity-50'
              }`}
              style={{
                borderColor: selectedTeam === team.id ? team.color : team.color + '40'
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex-shrink-0"
                  style={{ 
                    backgroundColor: team.color,
                    boxShadow: selectedTeam === team.id ? `0 0 15px ${team.color}` : 'none'
                  }}
                />
                <div>
                  <p className="text-white font-bold text-sm">{team.name}</p>
                  <p className="text-gray-400 text-xs">
                    {team.path.length} forts • {team.members.length} members
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Team Details */}
      {selectedTeam && (
        <div className="mt-6 bg-gray-800 rounded-lg p-6 border border-gray-700">
          {(() => {
            const team = activeteams.find(t => t.id === selectedTeam);
            if (!team) return null;

            return (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-16 h-16 rounded-full"
                    style={{ 
                      backgroundColor: team.color,
                      boxShadow: `0 0 20px ${team.color}`
                    }}
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-white">{team.name}</h2>
                    <p className="text-gray-400">
                      {team.members.length} members • {team.path.length} objectives
                    </p>
                  </div>
                </div>

                {/* Path Chain */}
                <div className="mb-6">
                  <p className="text-gray-400 text-sm font-semibold mb-3">📍 Path Chain:</p>
                  <div className="flex flex-wrap gap-2">
                    {team.path.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2"
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ backgroundColor: team.color }}
                        >
                          {step.order}
                        </div>
                        <span className="text-white font-semibold text-sm">
                          {step.fort}
                        </span>
                        {idx < team.path.length - 1 && (
                          <span className="text-gray-500 font-bold">→</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
                {team.instructions.length > 0 && (
                  <div>
                    <p className="text-gray-400 text-sm font-semibold mb-3">⚔️ Strategy:</p>
                    <div className="space-y-2">
                      {team.instructions.map((instruction, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <span 
                            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5"
                            style={{ backgroundColor: team.color }}
                          >
                            {idx + 1}
                          </span>
                          <p className="text-gray-300 text-sm">{instruction}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* Info text */}
      <p className="text-gray-400 text-sm mt-4 text-center font-medium">
        💡 Click on team filters below to highlight individual paths. All paths are shown with animated lines and direction arrows.
      </p>
    </div>
  );
}
