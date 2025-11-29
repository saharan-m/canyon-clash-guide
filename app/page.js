import { fortLocations } from '@/data/fortLocations';
import TeamSelector from '@/components/TeamSelector';
import AllTeamsPaths from '@/components/AllTeamsPaths';
import AllPathsMap from '@/components/AllPathsMap';
import Link from 'next/link';
import { teams } from '@/data/teams';


export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/5 rounded-full filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-slideInDown">
            <div className="inline-block mb-6 px-4 py-2 rounded-full glass-light border border-blue-400/30">
              <p className="text-blue-300 text-sm font-semibold">🏜️ Whiteout Survival Event</p>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight">
              Canyon Clash
              <br />
              <span className="gradient-text">Battle Guide</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
              Strategize with your team, visualize all paths, and dominate the battlefield
            </p>
            
            <p className="text-gray-400 max-w-2xl mx-auto">
              Interactive team navigator with real-time path visualization for coordinated assault on the Citadel
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mb-16 flex-wrap justify-center animate-scaleIn">
            <Link
              href="#select-team"
              className="btn-primary group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                👥 Select Team
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            
            <Link
              href="#all-paths-map"
              className="btn-primary group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                🗺️ All Paths Map
              </span>
            </Link>
            
            <Link
              href="#all-paths"
              className="btn-primary group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                📊 Strategies
              </span>
            </Link>
          </div>

          {/* Select Team Section */}
          <div id="select-team" className="mb-24 scroll-mt-8 animate-slideInUp">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                👥 Your Team Awaits
              </h2>
              <p className="text-gray-300 text-lg">
                Choose your team to view detailed strategy and coordinate your assault
              </p>
            </div>
            <div className="transform transition-all duration-500 hover:scale-[1.01]">
              <TeamSelector teams={teams} />
            </div>
          </div>

          {/* All Paths Interactive Map */}
          <div id="all-paths-map" className="my-24 scroll-mt-8 animate-slideInUp animation-delay-200">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                🗺️ Battle Map
              </h2>
              <p className="text-gray-300 text-lg">
                Real-time visualization of all team paths and strategies on the canyon battlefield
              </p>
            </div>
            <div className="transform transition-all duration-500 hover:scale-[1.01]">
              <AllPathsMap teams={teams} fortLocations={fortLocations} />
            </div>
          </div>

          {/* Battle Phases */}
          <div className="my-24 animate-slideInUp animation-delay-400">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                ⚔️ Battle Phases
              </h2>
              <p className="text-gray-300 text-lg">
                Understand each phase to coordinate your team's assault perfectly
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Phase 1 */}
              <div className="card-glow p-8 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-400">Phase 1</h3>
                </div>
                <p className="text-gray-300 mb-3 font-semibold">Seize & Conquer (17 min)</p>
                <p className="text-gray-400 leading-relaxed">
                  Control all buildings on your island. Defend bridges and prepare for the next phase. Establish defensive positions.
                </p>
              </div>

              {/* Phase 2 */}
              <div className="card-glow p-8 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-2xl">💪</span>
                  </div>
                  <h3 className="text-2xl font-bold text-green-400">Phase 2</h3>
                </div>
                <p className="text-gray-300 mb-3 font-semibold">Fortress Occupation (20 min)</p>
                <p className="text-gray-400 leading-relaxed">
                  Secure the high-value "24" buildings. These provide massive points and resources for your alliance.
                </p>
              </div>

              {/* Phase 3 */}
              <div className="card-glow p-8 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-2xl">👑</span>
                  </div>
                  <h3 className="text-2xl font-bold text-purple-400">Phase 3</h3>
                </div>
                <p className="text-gray-300 mb-3 font-semibold">Citadel Onslaught (20 min)</p>
                <p className="text-gray-400 leading-relaxed">
                  Launch the final assault on the Citadel. Victory belongs to those who hold it longest.
                </p>
              </div>
            </div>
          </div>

          {/* Team Strategies Overview */}
          <div id="all-paths" className="scroll-mt-8 animate-slideInUp animation-delay-600">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                📊 Team Strategies
              </h2>
              <p className="text-gray-300 text-lg">
                Overview of all active teams and their coordinated battle plans
              </p>
            </div>
            <AllTeamsPaths teams={teams} />
          </div>

          {/* Footer */}
          <div className="mt-24 pt-12 border-t border-gray-700/50 text-center">
            <div className="mb-6">
              <p className="text-gray-400 text-lg mb-2">
                💡 Each team has a unique strategy - coordination is key
              </p>
              <p className="text-gray-500">
                Good luck commanders. May the best alliance claim victory! 🎮
              </p>
            </div>
            <p className="text-gray-600 text-sm">
              Canyon Clash • Whiteout Survival • Event Guide v1.0
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
