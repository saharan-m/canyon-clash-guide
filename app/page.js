import { fortLocations } from '@/data/fortLocations';
import TeamSelector from '@/components/TeamSelector';
import AllPathsMap from '@/components/AllPathsMap';
import Link from 'next/link';
import { teams } from '@/data/teams';
import ThemeToggle from '@/components/ThemeToggle';


export default function Home() {
  return (
    <main className="min-h-screen bg-animated-gradient relative overflow-hidden">
      {/* Designer Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Base Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/80 to-slate-900"></div>
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-animated-gradient opacity-30"></div>
        
        {/* Floating Orbs - Optimized (reduced count) */}
        <div className="absolute top-20 left-10 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-blue-500/15 rounded-full blur-2xl orb-float"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-purple-500/15 rounded-full blur-2xl orb-drift animation-delay-200"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-indigo-500/8 rounded-full blur-2xl orb-float animation-delay-400"></div>
        
        {/* Pulsing Rings */}
        <div className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-0 border-2 border-blue-500/20 rounded-full pulse-ring"></div>
          <div className="absolute inset-0 border-2 border-purple-500/20 rounded-full pulse-ring animation-delay-200"></div>
        </div>
        
        {/* Animated Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.04] mesh-animate"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Light Rays */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent light-ray"></div>
          <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent light-ray animation-delay-200"></div>
          <div className="absolute top-0 left-3/4 w-1 h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent light-ray animation-delay-400"></div>
        </div>
        
               {/* Floating Particles - Reduced count for performance */}
               {Array.from({ length: 8 }).map((_, i) => (
                 <div
                   key={`particle-${i}`}
                   className="absolute particle"
                   style={{
                     left: `${10 + i * 12}%`,
                     width: `${2 + (i % 3)}px`,
                     height: `${2 + (i % 3)}px`,
                     background: `rgba(59, 130, 246, ${0.2 + (i % 3) * 0.1})`,
                     borderRadius: '50%',
                     boxShadow: `0 0 ${3 + (i % 2)}px rgba(59, 130, 246, 0.3)`,
                     animationDelay: `${i * 2}s`,
                     animationDuration: `${12 + (i % 4) * 2}s`
                   }}
                 />
               ))}
        
        {/* Rotating Gradient Orbs with Glow */}
        <div className="absolute top-1/3 right-1/4 w-32 h-32 sm:w-40 sm:h-40 rotate-slow">
          <div className="w-full h-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur-2xl glow-pulse"></div>
        </div>
        <div className="absolute bottom-1/3 left-1/4 w-28 h-28 sm:w-36 sm:h-36 rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }}>
          <div className="w-full h-full bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20 rounded-full blur-2xl glow-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>
        
               {/* Sparkle Effects - Reduced count */}
               {Array.from({ length: 4 }).map((_, i) => (
                 <div
                   key={`sparkle-${i}`}
                   className="absolute sparkle"
                   style={{
                     left: `${20 + (i * 20)}%`,
                     top: `${20 + (i % 2) * 40}%`,
                     width: '3px',
                     height: '3px',
                     background: `rgba(59, 130, 246, 0.6)`,
                     borderRadius: '50%',
                     boxShadow: `0 0 4px rgba(59, 130, 246, 0.4)`,
                     animationDelay: `${i * 0.5}s`,
                     animationDuration: `${2.5 + (i % 2) * 0.5}s`
                   }}
                 />
               ))}
        
        {/* Radial Gradient Overlays */}
        <div className="absolute top-0 left-0 w-full h-full" style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)'
        }}></div>
        <div className="absolute bottom-0 right-0 w-full h-full" style={{
          background: 'radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)'
        }}></div>
        <div className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2" style={{
          background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.05) 0%, transparent 60%)'
        }}></div>
      </div>

      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Content */}
      <div className="relative z-10 p-2 sm:p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section - Ultra Compact Mobile */}
          <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12 animate-slideInDown px-1">
            <div className="inline-block mb-2 sm:mb-3 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full glass-light border border-blue-400/30">
              <p className="text-blue-500 dark:text-blue-300 text-[9px] sm:text-xs md:text-sm font-semibold" aria-label="Whiteout Survival Event">Whiteout Survival Event</p>
            </div>
            <h1 className="heading-1 mb-2 sm:mb-3 md:mb-4 leading-tight px-1 font-display">
              <span className="block">Canyon Clash</span>
              <span className="gradient-text block">Battle Guide</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-body mb-1 sm:mb-2 max-w-2xl mx-auto px-1 font-medium">
              Strategize with your team, visualize all paths, and dominate the battlefield
            </p>
            <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-muted max-w-xl mx-auto px-1">
              Interactive team navigator for coordinated assault on the Citadel
            </p>
          </div>

          {/* Navigation Buttons - Professional Design */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8 lg:mb-12 justify-center px-1">
            <Link
              href="#select-team"
              className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 w-full sm:w-auto text-center overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400"
              aria-label="Select Team"
            >
              <span className="relative z-10 flex items-center gap-2">
                {/* SVG icon for team selection */}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-sm sm:text-base">Select Team</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            <Link
              href="#all-paths-map"
              className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 w-full sm:w-auto text-center overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label="Battle Map"
            >
              <span className="relative z-10 flex items-center gap-2">
                {/* SVG icon for map */}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span className="text-sm sm:text-base">Battle Map</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          </div>

          {/* Main Content Grid - Stack on Mobile, Side by Side on Desktop */}
          <div className="grid lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-4 sm:mb-6 md:mb-8 lg:mb-12">
            {/* Select Team Section - Left Side */}
            <div id="select-team" className="scroll-mt-8">
              <div className="mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-1.5 md:mb-2">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                  <h2 className="heading-3 whitespace-nowrap">Your Team</h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                </div>
                <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-muted text-center">
                  Choose your team to view detailed strategy
              </p>
            </div>
              <TeamSelector teams={teams} />
            </div>

            {/* Battle Phases - Right Side */}
            <div>
              <div className="mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-1.5 md:mb-2">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
                  <h2 className="heading-3 whitespace-nowrap">Battle Phases</h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
                </div>
                <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-muted text-center">
                  Understand each phase to coordinate your assault
                </p>
              </div>

                     <div className="space-y-2 sm:space-y-3 md:space-y-4">
                       {/* Phase 1 */}
                       <div className="card-glow p-3 sm:p-4 md:p-5 lg:p-6 group">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 md:mb-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                      {/* Target SVG icon */}
                      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Target">
                        <circle cx="12" cy="12" r="9" strokeWidth="2" />
                        <circle cx="12" cy="12" r="5" strokeWidth="2" />
                        <circle cx="12" cy="12" r="2" strokeWidth="2" fill="currentColor" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-blue-400 truncate">Phase 1</h3>
                      <p className="text-[10px] sm:text-xs md:text-sm text-body font-semibold">Seize & Conquer (17 min)</p>
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs md:text-sm text-muted leading-relaxed">
                    Control all buildings on your island. Defend bridges and prepare for the next phase.
                  </p>
                </div>

                       {/* Phase 2 */}
                       <div className="card-glow p-3 sm:p-4 md:p-5 lg:p-6 group">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 md:mb-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                      {/* Shield SVG icon */}
                      <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Shield">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3l8 4v5c0 5.25-3.5 9.75-8 11-4.5-1.25-8-5.75-8-11V7l8-4z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-green-400 truncate">Phase 2</h3>
                      <p className="text-[10px] sm:text-xs md:text-sm text-body font-semibold">Fortress Occupation (20 min)</p>
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs md:text-sm text-muted leading-relaxed">
                    Secure the high-value "24" buildings. These provide massive points and resources.
                </p>
              </div>

                       {/* Phase 3 */}
                       <div className="card-glow p-3 sm:p-4 md:p-5 lg:p-6 group">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 md:mb-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                      {/* Crown SVG icon */}
                      <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Crown">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19h14M5 19l2-7 5 5 5-5 2 7M5 19h14" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-purple-400 truncate">Phase 3</h3>
                      <p className="text-[10px] sm:text-xs md:text-sm text-body font-semibold">Citadel Onslaught (20 min)</p>
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs md:text-sm text-muted leading-relaxed">
                    Launch the final assault on the Citadel. Victory belongs to those who hold it longest.
                  </p>
                </div>
              </div>
            </div>
          </div>

                 {/* All Paths Interactive Map */}
                 <div id="all-paths-map" className="section-compact scroll-mt-8">
            <div className="mb-3 sm:mb-4 md:mb-5 lg:mb-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-1.5 md:mb-2">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
                <h2 className="heading-3 whitespace-nowrap">Battle Map</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
              </div>
              <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-muted text-center">
                Real-time visualization of all team paths and strategies
              </p>
            </div>
            <AllPathsMap teams={teams} fortLocations={fortLocations} />
          </div>

          {/* Footer - Ultra Compact Mobile */}
          <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-12 xl:mt-16 pt-4 sm:pt-6 md:pt-8 border-t border-slate-700/50 text-center px-1">
            <p className="text-muted text-[10px] sm:text-xs md:text-sm lg:text-base mb-1 sm:mb-2">
                💡 Each team has a unique strategy - coordination is key
              </p>
            <p className="text-subtle text-[9px] sm:text-[10px] md:text-xs lg:text-sm">
              Canyon Clash • Whiteout Survival • Event Guide v1.0
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
