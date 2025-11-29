import { teams } from '@/data/teams';
import { fortLocations } from '@/data/fortLocations';
import Link from 'next/link';
import CanyonMap from '@/components/CanyonMap';
import PathHighlight from '@/components/PathHighlight';
import Instructions from '@/components/Instructions';

export default async function TeamPage({ params }) {
  // Await the params in Next.js 14+
  const { teamId } = await params;
  const team = teams[teamId];

  if (!team) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">❌ Team Not Found</h1>
          <p className="text-gray-400 mb-4">Team ID: {teamId}</p>
          <p className="text-gray-400 mb-8">The team you're looking for doesn't exist.</p>
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/"
          className="inline-block mb-6 text-gray-400 hover:text-white transition-colors font-semibold"
        >
          ← Back to Teams
        </Link>

        <div className="flex items-center gap-6 mb-8">
          <div
            className="w-16 h-16 rounded-full shadow-lg"
            style={{ backgroundColor: team.color }}
          />
          <div>
            <h1 className="text-4xl font-bold text-white">
              {team.name}
            </h1>
            {team.members.length > 0 && (
              <p className="text-gray-400 mt-2">
                👥 {team.members.length} members
              </p>
            )}
          </div>
        </div>

        {team.members.length > 0 && (
          <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">
              👥 Team Members
            </h2>
            <div className="flex flex-wrap gap-3">
              {team.members.map((member, idx) => (
                <div
                  key={idx}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                >
                  {member}
                </div>
              ))}
            </div>
          </div>
        )}

        {team.path.length > 0 && (
          <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">
              🗺️ Your Path on the Map
            </h2>
            <CanyonMap team={team} fortLocations={fortLocations} />
          </div>
        )}

        {team.path.length > 0 && (
          <PathHighlight team={team} />
        )}

        {team.instructions.length > 0 && (
          <Instructions team={team} />
        )}

        {team.path.length === 0 && team.instructions.length === 0 && (
          <div className="bg-gray-800 rounded-xl p-8 text-center border border-gray-700">
            <p className="text-gray-400 text-lg">
              ℹ️ No path or instructions assigned yet for this team.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}