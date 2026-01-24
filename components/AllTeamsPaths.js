'use client';

import Link from 'next/link';
import TeamIcon from './TeamIcon';

export default function AllTeamsPaths({ teams }) {
  const activeteams = Object.values(teams).filter(team => team.path.length > 0);

  return (
    <div className="space-y-4">
      {activeteams.length === 0 ? (
        <div className="card-dark p-8 text-center border-2 border-dashed border-slate-600">
          <p className="text-muted text-base font-semibold">No active teams with paths assigned yet</p>
        </div>
      ) : (
        activeteams.map((team, index) => (
          <Link
            key={team.id}
            href={`/team/${team.id}`}
            className="block group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="card-glow p-5 md:p-6 transition-all duration-300 hover:-translate-y-1">
              <div className="grid md:grid-cols-4 gap-4 md:gap-6">
                {/* Team Header */}
                <div className="md:col-span-1">
                  <div className="flex items-center gap-3">
                    <div
                      className="team-indicator w-14 h-14 md:w-16 md:h-16 rounded-xl shadow-2xl flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex items-center justify-center"
                      style={{ 
                        backgroundColor: team.color,
                        boxShadow: `0 0 30px ${team.color}, 0 20px 40px ${team.color}30`
                      }}
                    >
                      <TeamIcon team={team} size={32} className="text-white" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                        {team.name}
                      </h3>
                      {team.members.length > 0 && (
                        <p className="text-muted text-xs md:text-sm mt-0.5 font-semibold">
                          👥 {team.members.length} commanders
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Path Summary */}
                <div className="md:col-span-2">
                  <h4 className="text-xs font-bold text-muted mb-2 md:mb-3 uppercase tracking-wider">Battle Path</h4>
                  <div className="flex flex-wrap gap-2">
                    {team.path.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 group/path"
                      >
                        <div
                          className="w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg group-hover/path:shadow-xl transition-all group-hover/path:scale-110"
                          style={{ 
                            backgroundColor: team.color,
                            boxShadow: `0 0 15px ${team.color}`
                          }}
                        >
                          {step.order}
                        </div>
                        <span className="text-white font-bold text-xs md:text-sm group-hover/path:text-blue-400 transition-colors">
                          {step.fort}
                        </span>
                        {idx < team.path.length - 1 && (
                          <span className="text-subtle font-bold text-sm md:text-base animate-pulse">→</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="md:col-span-1">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="glass-light rounded-lg p-3 text-center border border-blue-400/20 group-hover:border-blue-400/50 transition-colors">
                      <p className="text-muted text-xs font-bold mb-1 uppercase">Forts</p>
                      <p className="text-xl md:text-2xl font-black text-blue-400">{team.path.length}</p>
                    </div>
                    <div className="glass-light rounded-lg p-3 text-center border border-blue-400/20 group-hover:border-blue-400/50 transition-colors">
                      <p className="text-muted text-xs font-bold mb-1 uppercase">Members</p>
                      <p className="text-xl md:text-2xl font-black text-green-400">{team.members.length}</p>
                    </div>
                    <div className="glass-light rounded-lg p-2 md:p-3 col-span-2 text-center border border-blue-400/20 group-hover:border-blue-400/50 transition-colors">
                      <p className="text-muted text-xs font-bold mb-1 uppercase">Objective</p>
                      <p className="text-white text-xs md:text-sm font-bold truncate">{team.path[0]?.fort} → {team.path[team.path.length - 1]?.fort}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Members - Compact */}
              {team.members.length > 0 && (
                <div className="mt-4 md:mt-6 pt-4 border-t border-slate-700/50">
                  <p className="text-muted text-xs font-bold mb-2 uppercase tracking-wider">👥 Team Commanders</p>
                  <div className="flex flex-wrap gap-1.5">
                    {team.members.map((member, idx) => (
                      <div
                        key={idx}
                        className="glass-light text-body px-2.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold border border-blue-400/20 group-hover:border-blue-400/40 transition-colors transform group-hover:scale-105"
                      >
                        {member}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Instructions Preview - Compact */}
              {team.instructions.length > 0 && (
                <div className="mt-4 md:mt-6 pt-4 border-t border-slate-700/50">
                  <p className="text-muted text-xs font-bold mb-2 uppercase tracking-wider">Quick Strategy</p>
                  <div className="space-y-2">
                    {team.instructions.slice(0, 2).map((instruction, idx) => (
                      <div key={idx} className="flex items-start gap-2 group/instruction">
                        <span 
                          className="flex-shrink-0 w-5 h-5 rounded-lg flex items-center justify-center text-white text-xs font-bold mt-0.5 transform group-hover/instruction:scale-110 transition-transform"
                          style={{ backgroundColor: team.color }}
                        >
                          {idx + 1}
                        </span>
                        <p className="text-body text-xs md:text-sm leading-relaxed group-hover/instruction:text-slate-200 transition-colors">{instruction}</p>
                      </div>
                    ))}
                    {team.instructions.length > 2 && (
                      <p className="text-subtle text-xs italic ml-7">
                        + {team.instructions.length - 2} more strategic objectives...
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* CTA - Compact */}
              <div className="mt-4 md:mt-6 pt-4 border-t border-slate-700/50 flex items-center justify-between">
                <p className="text-blue-400 font-bold text-xs md:text-sm group-hover:text-blue-300 transition-colors flex items-center gap-1.5">
                  View Full Strategy
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </p>
                <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}