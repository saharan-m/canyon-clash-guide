'use client';

import Link from 'next/link';

export default function AllTeamsPaths({ teams }) {
  const activeteams = Object.values(teams).filter(team => team.path.length > 0);

  return (
    <div className="space-y-6">
      {activeteams.length === 0 ? (
        <div className="card-dark p-12 text-center border-2 border-dashed border-gray-600">
          <p className="text-gray-400 text-xl font-semibold">No active teams with paths assigned yet</p>
        </div>
      ) : (
        activeteams.map((team, index) => (
          <Link
            key={team.id}
            href={`/team/${team.id}`}
            className="block group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="card-glow p-8 transition-all duration-300 hover:-translate-y-2">
              <div className="grid md:grid-cols-4 gap-8">
                {/* Team Header */}
                <div className="md:col-span-1">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-20 h-20 rounded-xl shadow-2xl flex-shrink-0 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                      style={{ 
                        backgroundColor: team.color,
                        boxShadow: `0 0 30px ${team.color}, 0 20px 40px ${team.color}30`
                      }}
                    >
                      <span className="text-3xl">⚔️</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {team.name}
                      </h3>
                      {team.members.length > 0 && (
                        <p className="text-gray-400 text-sm mt-1 font-semibold">
                          👥 {team.members.length} commanders
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Path Summary */}
                <div className="md:col-span-2">
                  <h4 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">📍 Battle Path</h4>
                  <div className="flex flex-wrap gap-3">
                    {team.path.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 group/path"
                      >
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg group-hover/path:shadow-xl transition-all group-hover/path:scale-110"
                          style={{ 
                            backgroundColor: team.color,
                            boxShadow: `0 0 15px ${team.color}`
                          }}
                        >
                          {step.order}
                        </div>
                        <span className="text-white font-bold text-sm group-hover/path:text-blue-400 transition-colors">
                          {step.fort}
                        </span>
                        {idx < team.path.length - 1 && (
                          <span className="text-gray-500 font-bold text-lg animate-pulse">→</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="md:col-span-1">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="glass-light rounded-lg p-4 text-center border border-blue-400/20 group-hover:border-blue-400/50 transition-colors">
                      <p className="text-gray-400 text-xs font-bold mb-2 uppercase">Forts</p>
                      <p className="text-3xl font-black text-blue-400">{team.path.length}</p>
                    </div>
                    <div className="glass-light rounded-lg p-4 text-center border border-blue-400/20 group-hover:border-blue-400/50 transition-colors">
                      <p className="text-gray-400 text-xs font-bold mb-2 uppercase">Members</p>
                      <p className="text-3xl font-black text-green-400">{team.members.length}</p>
                    </div>
                    <div className="glass-light rounded-lg p-4 col-span-2 text-center border border-blue-400/20 group-hover:border-blue-400/50 transition-colors">
                      <p className="text-gray-400 text-xs font-bold mb-2 uppercase">Objective</p>
                      <p className="text-white text-sm font-bold">{team.path[0]?.fort} → {team.path[team.path.length - 1]?.fort}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Members */}
              {team.members.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-700/50">
                  <p className="text-gray-400 text-xs font-bold mb-3 uppercase tracking-wider">👥 Team Commanders</p>
                  <div className="flex flex-wrap gap-2">
                    {team.members.map((member, idx) => (
                      <div
                        key={idx}
                        className="glass-light text-gray-300 px-4 py-2 rounded-lg text-sm font-semibold border border-blue-400/20 group-hover:border-blue-400/40 transition-colors transform group-hover:scale-105"
                      >
                        {member}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Instructions Preview */}
              {team.instructions.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-700/50">
                  <p className="text-gray-400 text-xs font-bold mb-4 uppercase tracking-wider">⚡ Quick Strategy</p>
                  <div className="space-y-3">
                    {team.instructions.slice(0, 2).map((instruction, idx) => (
                      <div key={idx} className="flex items-start gap-3 group/instruction">
                        <span 
                          className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-bold mt-0.5 transform group-hover/instruction:scale-110 transition-transform"
                          style={{ backgroundColor: team.color }}
                        >
                          {idx + 1}
                        </span>
                        <p className="text-gray-300 text-sm leading-relaxed group-hover/instruction:text-gray-200 transition-colors">{instruction}</p>
                      </div>
                    ))}
                    {team.instructions.length > 2 && (
                      <p className="text-gray-500 text-xs italic ml-8">
                        + {team.instructions.length - 2} more strategic objectives...
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="mt-8 pt-6 border-t border-gray-700/50 flex items-center justify-between">
                <p className="text-blue-400 font-bold text-sm group-hover:text-blue-300 transition-colors flex items-center gap-2">
                  View Full Strategy
                  <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                </p>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}