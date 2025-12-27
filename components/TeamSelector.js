'use client';

import Link from 'next/link';
import TeamIcon from './TeamIcon';

export default function TeamSelector({ teams }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      {Object.values(teams).map((team, index) => (
        <Link
          key={team.id}
          href={`/team/${team.id}`}
          className="card p-4 sm:p-5 hover:scale-[1.02] transition-all duration-300 ease-out hover:shadow-xl active:scale-[0.98] group relative overflow-hidden"
        >
          {/* Colored accent bar with glow */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-200 group-hover:w-1.5 group-hover:shadow-lg"
            style={{ 
              backgroundColor: team.color,
              boxShadow: `0 0 10px ${team.color}40`
            }}
          />
          
          <div className="flex items-start gap-3 sm:gap-4 pl-2">
            {/* Team Icon - SVG based */}
            <div
              className="team-indicator w-12 h-12 sm:w-14 sm:h-14 shadow-lg flex-shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl"
              style={{ 
                backgroundColor: team.color,
                boxShadow: `0 0 20px ${team.color}40`
              }}
            >
              <TeamIcon team={team} size={28} className="text-white" />
            </div>
            
            {/* Team Info */}
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-1.5 sm:mb-2 group-hover:text-blue-400 transition-colors">
                {team.name}
              </h2>
              
              <div className="space-y-1.5">
                {team.path.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs sm:text-sm text-muted">Path:</span>
                    <span className="text-xs sm:text-sm text-body font-semibold">
                      {team.path[0]?.fort} → {team.path[team.path.length - 1]?.fort}
                    </span>
                    <span className="text-xs text-muted">({team.path.length})</span>
                  </div>
                )}
                
                {team.members.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm text-muted">{team.members.length} members</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Arrow Indicator */}
            <div className="text-slate-500 group-hover:text-blue-400 transition-colors flex-shrink-0 mt-1">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}