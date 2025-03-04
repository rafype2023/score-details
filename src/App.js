import React, { useState, useEffect } from 'react';

const App = () => {
  const [scoresData, setScoresData] = useState({ scores: [], standings: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch('https://nba-playoff-predictor.onrender.com/api/scores');
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Server responded with ${response.status}: ${errorText}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Debug log
        setScoresData(data); // Should be { scores: [], standings: [] }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(`Failed to fetch scores: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchScores();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;
  if (!scoresData.scores || scoresData.scores.length === 0) {
    return <div className="text-center py-8">No scores available yet.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">NBA Playoff Prediction Scores</h1>
        {scoresData.scores.map((entry, index) => (
          <div key={index} className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">{entry.user}: {entry.score} Points</h2>

            {/* First Round */}
            <h3 className="text-xl font-medium text-gray-600 mb-2">First Round (1 point for winner, 1 for games)</h3>
            <table className="w-full border-collapse mb-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Key</th>
                  <th className="border p-2">Prediction</th>
                  <th className="border p-2">Result</th>
                  <th className="border p-2">Winner Match</th>
                  <th className="border p-2">Games Match</th>
                  <th className="border p-2">Points</th>
                </tr>
              </thead>
              <tbody>
                {entry.details.firstRound.map((match, i) => (
                  <tr key={i} className="text-center">
                    <td className="border p-2">{match.key}</td>
                    <td className="border p-2">{match.prediction.winner} {match.prediction.games}</td>
                    <td className="border p-2">{match.result.winner} {match.result.games}</td>
                    <td className="border p-2">{match.winnerMatch ? 'Yes' : 'No'}</td>
                    <td className="border p-2">{match.gamesMatch ? 'Yes' : 'No'}</td>
                    <td className="border p-2">{match.points}</td>
                  </tr>
                ))}
                <tr className="font-bold bg-gray-100">
                  <td className="border p-2" colSpan="3">Total</td>
                  <td className="border p-2">{entry.details.firstRound.filter(m => m.winnerMatch).length} winners</td>
                  <td className="border p-2">{entry.details.firstRound.filter(m => m.gamesMatch).length} games</td>
                  <td className="border p-2">{entry.details.firstRound.reduce((sum, m) => sum + m.points, 0)}</td>
                </tr>
              </tbody>
            </table>

            {/* Semifinals */}
            <h3 className="text-xl font-medium text-gray-600 mb-2">Semifinals (2 points for winner, 1 for games)</h3>
            <table className="w-full border-collapse mb-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Key</th>
                  <th className="border p-2">Prediction</th>
                  <th className="border p-2">Result</th>
                  <th className="border p-2">Winner Match</th>
                  <th className="border p-2">Games Match</th>
                  <th className="border p-2">Points</th>
                </tr>
              </thead>
              <tbody>
                {entry.details.semifinals.map((match, i) => (
                  <tr key={i} className="text-center">
                    <td className="border p-2">{match.key}</td>
                    <td className="border p-2">{match.prediction.winner} {match.prediction.games}</td>
                    <td className="border p-2">{match.result.winner} {match.result.games}</td>
                    <td className="border p-2">{match.winnerMatch ? 'Yes' : 'No'}</td>
                    <td className="border p-2">{match.gamesMatch ? 'Yes' : 'No'}</td>
                    <td className="border p-2">{match.points}</td>
                  </tr>
                ))}
                <tr className="font-bold bg-gray-100">
                  <td className="border p-2" colSpan="3">Total</td>
                  <td className="border p-2">{entry.details.semifinals.filter(m => m.winnerMatch).length} winners</td>
                  <td className="border p-2">{entry.details.semifinals.filter(m => m.gamesMatch).length} games</td>
                  <td className="border p-2">{entry.details.semifinals.reduce((sum, m) => sum + m.points, 0)}</td>
                </tr>
              </tbody>
            </table>

            {/* Conference Finals */}
            <h3 className="text-xl font-medium text-gray-600 mb-2">Conference Finals (3 points for winner, 1 for games)</h3>
            <table className="w-full border-collapse mb-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Key</th>
                  <th className="border p-2">Prediction</th>
                  <th className="border p-2">Result</th>
                  <th className="border p-2">Winner Match</th>
                  <th className="border p-2">Games Match</th>
                  <th className="border p-2">Points</th>
                </tr>
              </thead>
              <tbody>
                {entry.details.conferenceFinals.map((match, i) => (
                  <tr key={i} className="text-center">
                    <td className="border p-2">{match.key}</td>
                    <td className="border p-2">{match.prediction.winner} {match.prediction.games}</td>
                    <td className="border p-2">{match.result.winner} {match.result.games}</td>
                    <td className="border p-2">{match.winnerMatch ? 'Yes' : 'No'}</td>
                    <td className="border p-2">{match.gamesMatch ? 'Yes' : 'No'}</td>
                    <td className="border p-2">{match.points}</td>
                  </tr>
                ))}
                <tr className="font-bold bg-gray-100">
                  <td className="border p-2" colSpan="3">Total</td>
                  <td className="border p-2">{entry.details.conferenceFinals.filter(m => m.winnerMatch).length} winners</td>
                  <td className="border p-2">{entry.details.conferenceFinals.filter(m => m.gamesMatch).length} games</td>
                  <td className="border p-2">{entry.details.conferenceFinals.reduce((sum, m) => sum + m.points, 0)}</td>
                </tr>
              </tbody>
            </table>

            {/* Finals */}
            <h3 className="text-xl font-medium text-gray-600 mb-2">Finals (4 points for winner, 1 for games, 1 for MVP)</h3>
            <table className="w-full border-collapse mb-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Key</th>
                  <th className="border p-2">Prediction</th>
                  <th className="border p-2">Result</th>
                  <th className="border p-2">Winner Match</th>
                  <th className="border p-2">Games Match</th>
                  <th className="border p-2">MVP Match</th>
                  <th className="border p-2">Points</th>
                </tr>
              </thead>
              <tbody>
                {entry.details.finals.map((match, i) => (
                  <tr key={i} className="text-center">
                    <td className="border p-2">{match.key}</td>
                    <td className="border p-2">{match.prediction.winner} {match.prediction.games}, {match.prediction.mvp}</td>
                    <td className="border p-2">{match.result.winner} {match.result.games}, {match.result.mvp}</td>
                    <td className="border p-2">{match.winnerMatch ? 'Yes' : 'No'}</td>
                    <td className="border p-2">{match.gamesMatch ? 'Yes' : 'No'}</td>
                    <td className="border p-2">{match.mvpMatch ? 'Yes' : 'No'}</td>
                    <td className="border p-2">{match.points}</td>
                  </tr>
                ))}
                <tr className="font-bold bg-gray-100">
                  <td className="border p-2" colSpan="3">Total</td>
                  <td className="border p-2">{entry.details.finals.filter(m => m.winnerMatch).length}</td>
                  <td className="border p-2">{entry.details.finals.filter(m => m.gamesMatch).length}</td>
                  <td className="border p-2">{entry.details.finals.filter(m => m.mvpMatch).length}</td>
                  <td className="border p-2">{entry.details.finals.reduce((sum, m) => sum + m.points, 0)}</td>
                </tr>
              </tbody>
            </table>

            <p className="text-lg font-semibold text-gray-700">Total Expected Score: {entry.score} points</p>
          </div>
        ))}

        {/* Standings Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Standings</h2>
          {scoresData.standings.length > 0 ? (
            <ol className="list-decimal pl-6 space-y-2 max-w-md mx-auto">
              {scoresData.standings.map((entry, index) => (
                <li key={index} className="text-gray-600 text-lg">
                  {entry.name}: {entry.points} points
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-center text-gray-600">No standings available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;