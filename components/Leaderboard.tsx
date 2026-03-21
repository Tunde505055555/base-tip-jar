export default function Leaderboard({ tips }) {
  // Group tips by sender and sum amounts
  const topSupporters = Object.values(
    tips.reduce((acc, tip) => {
      if (!acc[tip.from]) {
        acc[tip.from] = {
          address: tip.from,
          totalAmount: 0,
          tipCount: 0
        };
      }
      acc[tip.from].totalAmount += tip.amount;
      acc[tip.from].tipCount += 1;
      return acc;
    }, {})
  )
    .sort((a, b) => b.totalAmount - a.totalAmount)
    .slice(0, 10);

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-3xl">🏆</span>
        <h2 className="text-2xl font-bold">Top Supporters</h2>
      </div>

      {topSupporters.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p>No supporters yet!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {topSupporters.map((supporter, index) => (
            <div
              key={supporter.address}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-transparent rounded-xl hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl w-10 text-center">
                  {index < 3 ? medals[index] : `#${index + 1}`}
                </div>
                <div>
                  <div className="font-mono text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
                    {supporter.address}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {supporter.tipCount} {supporter.tipCount === 1 ? 'tip' : 'tips'}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-xl text-blue-600">
                  {supporter.totalAmount.toFixed(3)} ETH
                </div>
                <div className="text-xs text-gray-500">
                  ≈ ${(supporter.totalAmount * 3000).toFixed(0)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
