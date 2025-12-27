'use client';

export default function Instructions({ team }) {
  return (
    <div className="card p-4 sm:p-5 md:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 border-b border-slate-700/50 pb-2">Battle Instructions</h2>
      <ul className="space-y-2 sm:space-y-3">
        {team.instructions.map((instruction, idx) => (
          <li
            key={idx}
            className="flex items-start gap-2 sm:gap-3 text-body bg-slate-700 rounded-lg p-3 sm:p-4 hover:bg-slate-600 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg"
          >
            <span
              className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-white mt-0.5"
              style={{ backgroundColor: team.color }}
            >
              {idx + 1}
            </span>
            <span className="text-sm sm:text-base md:text-lg leading-relaxed">{instruction}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}