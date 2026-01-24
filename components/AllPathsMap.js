'use client';

import { useState } from 'react';
import TeamIcon from './TeamIcon';

export default function AllPathsMap({ teams, fortLocations }) {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [imageError, setImageError] = useState(false);

  const activeteams = Object.values(teams).filter(team => team.path.length > 0);

  return (
    <div className="relative bg-slate-900 rounded-lg p-2 sm:p-3 md:p-4">
      {/* Map container with fixed aspect ratio */}
      <div className="relative w-full" style={{ paddingBottom: '66.67%' }}>
        <div className="absolute inset-0 bg-slate-700 rounded-lg overflow-hidden border border-slate-600 sm:border-2">
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
                      {/* Enhanced Glow line */}
                      <line
                        x1={currentFort.x}
                        y1={currentFort.y}
                        x2={nextFort.x}
                        y2={nextFort.y}
                        stroke={team.color}
                        strokeWidth="14"
                        opacity="0.25"
                        filter={`url(#glow-${team.id})`}
                      />
                      
                      {/* Main animated line - More visible */}
                      <line
                        x1={currentFort.x}
                        y1={currentFort.y}
                        x2={nextFort.x}
                        y2={nextFort.y}
                        stroke={team.color}
                        strokeWidth="5"
                        strokeDasharray="15,10"
                        opacity={selectedTeam === null || selectedTeam === team.id ? "0.95" : "0.3"}
                        markerEnd={`url(#arrow-${team.id})`}
                        className="transition-opacity duration-300"
                      >
                        <animate 
                          attributeName="stroke-dashoffset" 
                          from="0" 
                          to="25" 
                          dur="1.5s" 
                          repeatCount="indefinite"
                        />
                      </line>
                      
                      {/* Highlight line for selected team */}
                      {selectedTeam === team.id && (
                        <line
                          x1={currentFort.x}
                          y1={currentFort.y}
                          x2={nextFort.x}
                          y2={nextFort.y}
                          stroke={team.color}
                          strokeWidth="2"
                          opacity="1"
                          strokeDasharray="none"
                        />
                      )}
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
                      className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-white font-bold text-[10px] sm:text-xs border sm:border md:border-2 border-white flex-shrink-0"
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

        </div>
      </div>

      {/* Team Filter Controls - Professional Design */}
      <div className="mt-3 sm:mt-4">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-600/50 to-transparent hidden sm:block"></div>
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-white whitespace-nowrap">Filter Teams</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-600/50 to-transparent hidden sm:block"></div>
          </div>
          {selectedTeam && (
            <button
              onClick={() => setSelectedTeam(null)}
              className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 font-semibold transition-colors px-3 py-1.5 rounded-lg hover:bg-blue-400/10 border border-blue-400/20"
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* Mobile: Horizontal Scrollable Pills */}
        <div className="md:hidden overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
          <div className="flex gap-2 min-w-max">
            <button
              onClick={() => setSelectedTeam(null)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full border-2 transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                selectedTeam === null
                  ? 'bg-slate-700 border-blue-500/50 shadow-lg'
                  : 'bg-slate-800/60 border-slate-600/50 hover:bg-slate-700/60'
              }`}
            >
              <span className="text-white font-semibold text-xs">All Teams</span>
            </button>
            {activeteams.map((team) => (
              <button
                key={team.id}
                onClick={() => setSelectedTeam(selectedTeam === team.id ? null : team.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full border-2 transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                  selectedTeam === team.id
                    ? 'bg-slate-700 shadow-lg scale-105'
                    : selectedTeam === null
                    ? 'bg-slate-800/60 hover:bg-slate-700/60'
                    : 'bg-slate-900/40 opacity-60'
                }`}
                style={{
                  borderColor: selectedTeam === team.id ? team.color : team.color + '40'
                }}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ 
                    backgroundColor: team.color,
                    boxShadow: selectedTeam === team.id ? `0 0 12px ${team.color}` : 'none'
                  }}
                >
                  <TeamIcon team={team} size={16} className="text-white" />
                </div>
                <span className="text-white font-semibold text-xs">{team.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Desktop: Professional Grid Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          <button
            onClick={() => setSelectedTeam(null)}
            className={`p-4 rounded-xl border-2 transition-all duration-200 text-left group ${
              selectedTeam === null
                ? 'bg-slate-700/80 border-blue-500/50 shadow-lg'
                : 'bg-slate-800/60 border-slate-600/50 hover:bg-slate-700/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-blue-500/30">
                <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-sm">All Teams</p>
                <p className="text-muted text-xs">View all paths</p>
              </div>
            </div>
          </button>
          {activeteams.map((team) => (
            <button
              key={team.id}
              onClick={() => setSelectedTeam(selectedTeam === team.id ? null : team.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 text-left group ${
                selectedTeam === team.id
                  ? 'bg-slate-700/80 shadow-lg border-opacity-100'
                  : selectedTeam === null
                  ? 'bg-slate-800/60 border-opacity-50 hover:bg-slate-700/60'
                  : 'bg-slate-900/40 opacity-50 border-opacity-30'
              }`}
              style={{
                borderColor: selectedTeam === team.id ? team.color : team.color + '40'
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                  style={{ 
                    backgroundColor: team.color,
                    boxShadow: selectedTeam === team.id ? `0 0 20px ${team.color}50` : 'none'
                  }}
                >
                  <TeamIcon team={team} size={28} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm truncate">{team.name}</p>
                  <p className="text-muted text-xs">
                    {team.path.length} objectives • {team.members.length} members
                  </p>
                </div>
                {selectedTeam === team.id && (
                  <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Team Details */}
      {selectedTeam && (
        <div className="mt-4 card p-4 md:p-6">
          {(() => {
            const team = activeteams.find(t => t.id === selectedTeam);
            if (!team) return null;

            return (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ 
                      backgroundColor: team.color,
                      boxShadow: `0 0 20px ${team.color}`
                    }}
                  >
                    <TeamIcon team={team} size={28} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white">{team.name}</h2>
                    <p className="text-muted text-sm">
                      {team.members.length} members • {team.path.length} objectives
                    </p>
                  </div>
                </div>

                {/* Path Chain */}
                <div className="mb-4">
                  <p className="text-muted text-xs md:text-sm font-semibold mb-2 uppercase tracking-wider">Path Chain</p>
                  <div className="flex flex-wrap gap-2">
                    {team.path.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2"
                      >
                        <div
                          className="team-indicator w-8 h-8 text-white text-xs font-bold"
                          style={{ backgroundColor: team.color }}
                        >
                          {step.order}
                        </div>
                        <span className="text-white font-semibold text-sm">
                          {step.fort}
                        </span>
                        {idx < team.path.length - 1 && (
                          <span className="text-subtle font-bold">→</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
                {team.instructions.length > 0 && (
                  <div>
                    <p className="text-muted text-xs md:text-sm font-semibold mb-2 uppercase tracking-wider">Strategy</p>
                    <div className="space-y-1.5">
                      {team.instructions.map((instruction, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span 
                            className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5"
                            style={{ backgroundColor: team.color }}
                          >
                            {idx + 1}
                          </span>
                          <p className="text-body text-xs md:text-sm">{instruction}</p>
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
      <p className="text-muted text-xs md:text-sm mt-3 text-center font-medium">
        💡 Click on team filters below to highlight individual paths. All paths are shown with animated lines and direction arrows.
      </p>
    </div>
  );
}
