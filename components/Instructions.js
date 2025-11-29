'use client';

export default function Instructions({ team }) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6">
        ⚔️ Battle Instructions
      </h2>
      <ul className="space-y-3">
        {team.instructions.map((instruction, idx) => (
          <li
            key={idx}
            className="flex items-start gap-3 text-gray-300 bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors"
          >
            <span
              className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-white"
              style={{ backgroundColor: team.color }}
            >
              {idx + 1}
            </span>
            <span className="text-lg leading-relaxed">{instruction}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}