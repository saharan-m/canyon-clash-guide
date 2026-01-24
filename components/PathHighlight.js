'use client';

export default function PathHighlight({ team }) {
  return (
    <div className="card p-4 sm:p-5 md:p-6 mb-6 sm:mb-8">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 border-b border-slate-700/50 pb-2">Objective Path</h2>
      
      {/* Path Visualization */}
      <div className="relative overflow-x-auto pb-4">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-max">
          {team.path.map((step, idx) => {
            const isLast = idx === team.path.length - 1;
            const isCritical = step.fort === 'I24' || step.fort === 'S24';
            
            return (
              <div key={idx} className="flex items-center gap-2 sm:gap-3 md:gap-4 group">
                {/* Path Node */}
                <div className="relative flex flex-col items-center">
                  <div
                    className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base md:text-lg shadow-lg transition-all duration-300 ease-out group-hover:scale-110 group-hover:shadow-xl"
                    style={{ 
                      backgroundColor: team.color,
                      boxShadow: isCritical 
                        ? `0 0 20px ${team.color}, 0 0 30px ${team.color}80`
                        : `0 0 15px ${team.color}`
                    }}
                  >
                    {step.order}
                    {isCritical && (
                      <span className="absolute -top-1 -right-1 text-yellow-400 text-xs sm:text-sm animate-pulse">
                        ⚡
                      </span>
                    )}
                  </div>
                  
                  {/* Fort Label */}
                  <div className="mt-2 text-center">
                    <div className="text-white font-bold text-xs sm:text-sm md:text-base whitespace-nowrap">
                      {step.fort}
                    </div>
                    {isCritical && (
                      <div className="text-yellow-400 text-[10px] sm:text-xs mt-0.5 font-semibold whitespace-nowrap">
                        {step.fort === 'I24' ? '60k oil/min' : 'High Value'}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Connecting Arrow */}
                {!isLast && (
                  <div className="flex items-center">
                    <svg 
                      className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 text-slate-500 group-hover:text-slate-400 transition-colors"
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M13 7l5 5m0 0l-5 5m5-5H6" 
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Connecting Line Background (for visual flow) */}
        <div 
          className="absolute top-6 sm:top-7 md:top-8 left-0 right-0 h-0.5 sm:h-1 opacity-20 pointer-events-none"
          style={{
            background: `linear-gradient(to right, ${team.color}40, ${team.color}20, ${team.color}40)`
          }}
        />
      </div>
      
      {/* Path Summary */}
      <div className="mt-4 sm:mt-6 pt-4 border-t border-slate-700/50">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted">
          <span className="font-semibold">Path:</span>
          <span className="text-white font-bold">{team.path[0]?.fort}</span>
          {team.path.map((step, idx) => {
            if (idx === 0) return null;
            return (
              <span key={idx} className="flex items-center gap-1">
                <span className="text-slate-500">→</span>
                <span className="text-white font-semibold">{step.fort}</span>
              </span>
            );
          })}
          <span className="text-slate-500">({team.path.length} objectives)</span>
        </div>
      </div>
    </div>
  );
}