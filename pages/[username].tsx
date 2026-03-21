import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function UserTipPage() {
  const router = useRouter();
  const { username } = router.query;
  
  // Mock data - later connect to your backend/blockchain
  const [profile, setProfile] = useState({
    username: username || 'creator',
    displayName: 'Content Creator',
    bio: 'Building cool stuff on Base 🔵',
    avatar: '🎨',
    category: 'Creator',
    walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    goal: {
      title: 'New laptop for development',
      target: 0.5,
      current: 0.23,
      description: 'Help me upgrade my setup to create better content!'
    },
    socials: {
      twitter: 'yourusername',
      github: 'yourusername',
    }
  });

  const [tipAmount, setTipAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  
  const [recentTips, setRecentTips] = useState([
    { 
      from: '0x1234...5678', 
      amount: 0.05, 
      message: 'Great work! Keep building 🚀', 
      timestamp: Date.now() - 86400000,
      txHash: '0xabc...'
    },
    { 
      from: '0xabcd...efgh', 
      amount: 0.1, 
      message: 'Love your content!', 
      timestamp: Date.now() - 172800000,
      txHash: '0xdef...'
    },
    { 
      from: '0x9876...4321', 
      amount: 0.08, 
      message: 'This helped me so much, thank you! 💙', 
      timestamp: Date.now() - 259200000,
      txHash: '0xghi...'
    }
  ]);

  const progress = Math.min((profile.goal.current / profile.goal.target) * 100, 100);

  const handleConnectWallet = async () => {
    // Add wallet connection logic
    setIsConnected(true);
    alert('Wallet connected!');
  };

  const handleTip = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first!');
      return;
    }
    if (!tipAmount || parseFloat(tipAmount) <= 0) {
      alert('Please enter a valid tip amount!');
      return;
    }
    
    // Add actual tip sending logic here
    alert(`Sending ${tipAmount} ETH to ${profile.displayName}\nMessage: "${message}"`);
  };

  return (
    <>
      <Head>
        <title>{profile.displayName} - Tip on Base</title>
        <meta name="description" content={`Support ${profile.displayName}: ${profile.bio}`} />
        <meta property="og:title" content={`${profile.displayName} - Tip on Base`} />
        <meta property="og:description" content={profile.bio} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              🫙 Base Tip Jar
            </div>
            {!isConnected ? (
              <button
                onClick={handleConnectWallet}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Connect Wallet
              </button>
            ) : (
              <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium">
                ✓ Connected
              </div>
            )}
          </div>
        </header>

        <div className="max-w-5xl mx-auto py-8 px-4">
          
          {/* Profile Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 border border-gray-100">
            <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
              <div className="text-7xl">{profile.avatar}</div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{profile.displayName}</h1>
                <p className="text-gray-600 text-lg mb-3">@{profile.username}</p>
                <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {profile.category}
                </span>
              </div>
            </div>
            
            <p className="text-gray-700 text-lg mb-6">{profile.bio}</p>
            
            {/* Socials */}
            {(profile.socials.twitter || profile.socials.github) && (
              <div className="flex gap-4 pt-4 border-t">
                {profile.socials.twitter && (
                  <a 
                    href={`https://twitter.com/${profile.socials.twitter}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition"
                  >
                    <span>🐦</span>
                    <span>Twitter</span>
                  </a>
                )}
                {profile.socials.github && (
                  <a 
                    href={`https://github.com/${profile.socials.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition"
                  >
                    <span>💻</span>
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            
            {/* Goal Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-3xl">🎯</span>
                <h2 className="text-2xl font-bold">Current Goal</h2>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{profile.goal.title}</h3>
              <p className="text-gray-600 mb-6">{profile.goal.description}</p>
              
              <div className="mb-3 flex justify-between text-sm font-medium">
                <span className="text-blue-600">{profile.goal.current} ETH raised</span>
                <span className="text-gray-500">{profile.goal.target} ETH goal</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden mb-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-8 rounded-full transition-all duration-700 flex items-center justify-end pr-3 text-white text-sm font-bold"
                  style={{ width: `${progress}%` }}
                >
                  {progress > 20 && `${Math.round(progress)}%`}
                </div>
              </div>
              
              {progress < 100 ? (
                <p className="text-sm text-gray-500">
                  ${((profile.goal.target - profile.goal.current) * 3000).toFixed(0)} to go!
                </p>
              ) : (
                <p className="text-sm text-green-600 font-semibold">🎉 Goal reached!</p>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-3xl">📊</span>
                <h2 className="text-2xl font-bold">Stats</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-gray-900">{recentTips.length}</div>
                  <div className="text-gray-600">Total Tips Received</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">
                    {recentTips.reduce((sum, tip) => sum + tip.amount, 0).toFixed(3)} ETH
                  </div>
                  <div className="text-gray-600">Total Amount</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600">
                    {new Set(recentTips.map(t => t.from)).size}
                  </div>
                  <div className="text-gray-600">Unique Supporters</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tip Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-3xl">💸</span>
              <h2 className="text-2xl font-bold">Send a Tip</h2>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Amount (ETH)
              </label>
              <input
                type="number"
                step="0.001"
                min="0"
                value={tipAmount}
                onChange={(e) => setTipAmount(e.target.value)}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition"
                placeholder="0.01"
              />
              
              {/* Quick amount buttons */}
              <div className="grid grid-cols-4 gap-3 mt-4">
                {[
                  { label: 'Coffee ☕', amount: 0.01 },
                  { label: 'Lunch 🍕', amount: 0.05 },
                  { label: 'Dinner 🍱', amount: 0.1 },
                  { label: 'Generous 🎁', amount: 0.5 }
                ].map(preset => (
                  <button
                    key={preset.amount}
                    onClick={() => setTipAmount(preset.amount.toString())}
                    className="px-4 py-3 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-indigo-50 border border-gray-200 rounded-xl text-sm font-medium transition-all hover:scale-105 hover:border-blue-300"
                  >
                    <div className="font-semibold">{preset.label}</div>
                    <div className="text-xs text-gray-600">{preset.amount} ETH</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Message (Optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                rows={4}
                placeholder="Leave an encouraging message... 💙"
                maxLength={280}
              />
              <div className="flex justify-between mt-2">
                <p className="text-sm text-gray-500">Your message will be public</p>
                <p className="text-sm text-gray-500">{message.length}/280</p>
              </div>
            </div>

            <button
              onClick={handleTip}
              disabled={!isConnected}
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold py-5 px-6 rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg shadow-lg"
            >
              {isConnected ? '🚀 Send Tip' : '🔒 Connect Wallet to Tip'}
            </button>
          </div>

          {/* Recent Tips */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-3xl">💬</span>
              <h2 className="text-2xl font-bold">Recent Support</h2>
            </div>
            
            {recentTips.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <div className="text-6xl mb-4">🫙</div>
                <p>No tips yet. Be the first to support!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentTips.map((tip, index) => (
                  <div 
                    key={index} 
                    className="border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-transparent pl-6 pr-4 py-4 rounded-r-xl hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="font-mono text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
                        {tip.from}
                      </span>
                      <span className="font-bold text-xl text-blue-600">{tip.amount} ETH</span>
                    </div>
                    {tip.message && (
                      <p className="text-gray-700 text-lg mb-2">{tip.message}</p>
                    )}
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>{new Date(tip.timestamp).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</span>
                      <a 
                        href={`https://basescan.org/tx/${tip.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition"
                      >
                        View on BaseScan →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <footer className="bg-white border-t mt-12 py-8">
          <div className="max-w-5xl mx-auto px-4 text-center text-gray-600">
            <p>Powered by <span className="font-semibold text-blue-600">Base</span> 🔵</p>
            <p className="text-sm mt-2">Built with 💙 on Base blockchain</p>
          </div>
        </footer>

      </div>
    </>
  );
}
