'use client';

export default function PathHighlight({ team }) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6">
        📍 Objective Path
      </h2>
      <div className="space-y-4">
        {team.path.map((step, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-md"
              style={{ backgroundColor: team.color }}
            >
              {step.order}
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-white">
                {step.fort}
              </h3>
              {step.fort === 'I24' && (
                <p className="text-yellow-400 text-sm mt-1 font-semibold">
                  ⚡ Critical: 60,000 oil per minute
                </p>
              )}
              {step.fort === 'S24' && (
                <p className="text-yellow-400 text-sm mt-1 font-semibold">
                  ⚡ Critical: High reward zone
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}