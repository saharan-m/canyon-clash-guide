import { teams } from '@/data/teams';
import { fortLocations } from '@/data/fortLocations';
import Link from 'next/link';
import CanyonMap from '@/components/CanyonMap';
import PathHighlight from '@/components/PathHighlight';
import Instructions from '@/components/Instructions';
import TeamIcon from '@/components/TeamIcon';
import ThemeToggle from '@/components/ThemeToggle';

export default async function TeamPage({ params }) {
  // Await the params in Next.js 14+
  const { teamId } = await params;
  const team = teams[teamId];

  if (!team) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="heading-2 mb-4">❌ Team Not Found</h1>
          <p className="text-muted mb-4">Team ID: {teamId}</p>
          <p className="text-muted mb-8">The team you're looking for doesn't exist.</p>
          <Link href="/" className="btn-primary">
            ← Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-animated-gradient relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/90 to-slate-800"></div>
        <div className="absolute inset-0 bg-animated-gradient opacity-20"></div>
        
        {/* Team Color Orb - Optimized */}
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 bg-opacity-10 rounded-full blur-2xl orb-float"
          style={{ backgroundColor: `${team.color}20` }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-56 h-56 sm:w-72 sm:h-72 bg-opacity-10 rounded-full blur-2xl orb-drift animation-delay-200"
          style={{ backgroundColor: `${team.color}15` }}
        ></div>
        
        {/* Sparkle Effects - Reduced for performance */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`team-sparkle-${i}`}
            className="absolute sparkle"
            style={{
              left: `${25 + (i * 25)}%`,
              top: `${25 + (i % 2) * 30}%`,
              width: '3px',
              height: '3px',
              background: team.color,
              opacity: 0.5,
              borderRadius: '50%',
              boxShadow: `0 0 4px ${team.color}80`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${3 + (i % 2) * 0.5}s`
            }}
          />
        ))}
        
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03] mesh-animate"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Team Color Radial Gradients */}
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `radial-gradient(circle at 30% 40%, ${team.color}15 0%, transparent 50%)`
          }}
        ></div>
        <div 
          className="absolute bottom-0 right-0 w-full h-full"
          style={{
            background: `radial-gradient(circle at 70% 60%, ${team.color}10 0%, transparent 50%)`
          }}
        ></div>
        
        {/* Floating Particles - Reduced for performance */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute particle"
            style={{
              left: `${15 + i * 15}%`,
              width: `${2 + (i % 2)}px`,
              height: `${2 + (i % 2)}px`,
              background: team.color,
              opacity: 0.2 + (i % 3) * 0.1,
              borderRadius: '50%',
              boxShadow: `0 0 ${3 + (i % 2)}px ${team.color}80`,
              animationDelay: `${i * 2.5}s`,
              animationDuration: `${12 + (i % 3) * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
        <ThemeToggle />
      </div>
      
      <div className="relative z-10 p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-6 sm:mb-8 text-muted hover:text-white transition-all duration-300 ease-out font-semibold text-sm sm:text-base group"
        >
          <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Teams
        </Link>

        {/* Team Header - Enhanced */}
        <div className="card p-5 sm:p-6 md:p-8 mb-6 sm:mb-8 relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 right-0 h-1"
            style={{ background: `linear-gradient(90deg, ${team.color}, ${team.color}80, transparent)` }}
          />
          <div className="flex flex-row items-center gap-3 sm:gap-4 md:gap-6">
            {/* Team Icon - Left side on all screen sizes */}
            <div
              className="team-indicator w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 shadow-xl flex-shrink-0 flex items-center justify-center rounded-lg transition-all-smooth hover:scale-110 hover:rotate-6 hover:shadow-2xl"
              style={{ backgroundColor: team.color }}
            >
              <TeamIcon team={team} size={20} className="text-white w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3">
                {team.name}
              </h1>
              
              {/* Team Members - Prominently Displayed */}
              {team.members.length > 0 && (
                <div className="mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: team.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-sm sm:text-base font-semibold text-white">Team Members</span>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {team.members.map((member, idx) => (
                      <div 
                        key={idx} 
                        className="badge text-xs sm:text-sm font-medium px-3 py-1.5"
                        style={{ 
                          backgroundColor: `${team.color}20`,
                          borderColor: `${team.color}40`,
                          color: '#ffffff'
                        }}
                      >
                        {member}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                {team.path.length > 0 && (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <span className="text-muted text-sm sm:text-base">{team.path.length} objectives</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {team.path.length > 0 && (
              <div className="card-glow p-4 sm:p-5 md:p-6">
                <div className="flex items-center gap-3 mb-4 sm:mb-6 pb-3 border-b border-slate-700/50">
                  <div className="w-1 h-6 rounded-full" style={{ background: `linear-gradient(180deg, ${team.color}, ${team.color}80)` }}></div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Your Path on the Map</h2>
                </div>
                <CanyonMap team={team} fortLocations={fortLocations} />
              </div>
            )}

            {team.path.length > 0 && <PathHighlight team={team} />}

            {team.instructions.length > 0 && <Instructions team={team} />}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {team.path.length > 0 && (
              <div className="card p-4 sm:p-5 md:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 border-b border-slate-700/50 pb-2">Quick Stats</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted text-sm">Total Objectives</span>
                    <span className="text-white font-bold text-lg">{team.path.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted text-sm">Start Point</span>
                    <span className="text-white font-semibold">{team.path[0]?.fort}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted text-sm">End Point</span>
                    <span className="text-white font-semibold">{team.path[team.path.length - 1]?.fort}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {team.path.length === 0 && team.instructions.length === 0 && (
          <div className="card p-6 sm:p-8 text-center">
            <p className="text-muted text-sm sm:text-base md:text-lg">
              No path or instructions assigned yet for this team.
            </p>
          </div>
        )}
        </div>
      </div>
    </main>
  );
}