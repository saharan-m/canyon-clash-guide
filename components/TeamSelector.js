'use client';

import Link from 'next/link';

export default function TeamSelector({ teams }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.values(teams).map((team) => (
        <Link
          key={team.id}
          href={`/team/${team.id}`}
          className="bg-gray-800 rounded-xl p-6 hover:scale-105 transition-transform duration-200 border-2 hover:shadow-2xl cursor-pointer"
          style={{ borderColor: team.color }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-12 h-12 rounded-full shadow-md"
              style={{ backgroundColor: team.color }}
            />
            <h2 className="text-2xl font-bold text-white">
              {team.name}
            </h2>
          </div>

          {team.members.length > 0 && (
            <div className="mb-4">
              <p className="text-gray-400 text-sm mb-2">Team Members:</p>
              <div className="flex flex-wrap gap-2">
                {team.members.slice(0, 3).map((member, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm"
                  >
                    {member}
                  </span>
                ))}
                {team.members.length > 3 && (
                  <span className="text-gray-400 text-sm">
                    +{team.members.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {team.path.length > 0 ? (
            <p className="text-gray-300 font-semibold">
              📍 {team.path.length} objectives →
            </p>
          ) : (
            <p className="text-gray-500 italic">No path assigned yet</p>
          )}
        </Link>
      ))}
    </div>
  );
}