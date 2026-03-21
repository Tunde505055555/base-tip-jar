import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('7d');
  
  // Mock data
  const stats = {
    totalTips: 2.45,
    totalTippers: 23,
    thisWeek: 0.68,
    goalProgress: 49, // percentage
    avgTip: 0.106,
    recentTips: [
      { from: '0x1234...5678', amount: 0.15, message: 'Love your work! 🚀', time: '2 hours ago' },
      { from: '0xabcd...efgh', amount: 0.05, message: 'Keep building!', time: '5 hours ago' },
      { from: '0x9876...4321', amount: 0.2, message: 'Amazing content 💙', time: '1 day ago' },
      { from: '0xdef0...1234', amount: 0.08, message: '', time: '2 days ago' },
      { from: '0x5678...90ab', amount: 0.1, message: 'This helped me so much!', time: '3 days ago' }
    ],
    weeklyData: [
      { day: 'Mon', amount: 0.05 },
      { day: 'Tue', amount: 0.12 },
      { day: 'Wed', amount: 0.08 },
      { day: 'Thu', amount: 0.15 },
      { day: 'Fri', amount: 0.18 },
      { day: 'Sat', amount: 0.06 },
      { day: 'Sun', amount: 0.04 }
    ]
  };

  const maxAmount = Math.max(...stats.weeklyData.map(d => d.amount));

  return (
    <>
      <Head>
        <title>Dashboard - Base Tip Jar</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                🫙 Base Tip Jar
              </Link>
              <div className="flex gap-3">
                <Link href="/settings" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium">
                  Settings
                </Link>
                <Link href="/yourname" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                  View My Page
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto py-8 px-4">
          
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">📊 Dashboard</h1>
            <p className="text-gray-600">Track your tips and engagement</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">💰</span>
                <span className="text-sm font-medium text-gray-500">Total Tips</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{stats.totalTips} ETH</div>
              <div className="text-sm text-gray-500 mt-1">≈ ${(stats.totalTips * 3000).toFixed(0)}</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">👥</span>
                <span className="text-sm font-medium text-gray-500">Total Supporters</span>
              </div>
              <div className="text-3xl font-bold text-blue-600">{stats.totalTippers}</div>
              <div className="text-sm text-gray-500 mt-1">Unique tippers</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">📈</span>
                <span className="text-sm font-medium text-gray-500">This Week</span>
              </div>
              <div className="text-3xl font-bold text-indigo-600">{stats.thisWeek} ETH</div>
              <div className="text-sm text-green-600 mt-1">+23% from last week</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">💎</span>
                <span className="text-sm font-medium text-gray-500">Average Tip</span>
              </div>
              <div className="text-3xl font-bold text-purple-600">{stats.avgTip} ETH</div>
              <div className="text-sm text-gray-500 mt-1">≈ ${(stats.avgTip * 3000).toFixed(0)}</div>
            </div>

          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            
            {/* Chart */}
            <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Tips Over Time</h2>
                <div className="flex gap-2">
                  {['7d', '30d', 'All'].map(range => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        timeRange === range
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Simple Bar Chart */}
              <div className="flex items-end justify-between gap-2 h-64">
                {stats.weeklyData.map((data, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-gray-100 rounded-t-lg flex items-end" style={{ height: '200px' }}>
                      <div
                        className="w-full bg-gradient-to-t from-blue-600 to-indigo-600 rounded-t-lg transition-all hover:from-blue-700 hover:to-indigo-700 cursor-pointer relative group"
                        style={{ height: `${(data.amount / maxAmount) * 100}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                          {data.amount} ETH
                        </div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-600">{data.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Goal Progress */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold mb-6">🎯 Current Goal</h2>
              
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">New laptop for development</h3>
                <p className="text-sm text-gray-600">Help me upgrade my setup!</p>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span>0.245 ETH</span>
                  <span className="text-gray-500">0.5 ETH</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold transition-all"
                    style={{ width: `${stats.goalProgress}%` }}
                  >
                    {stats.goalProgress}%
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="text-sm text-blue-800 font-medium mb-1">
                  Almost halfway there! 🎉
                </div>
                <div className="text-xs text-blue-600">
                  ${((0.5 - 0.245) * 3000).toFixed(0)} to go
                </div>
              </div>

              <Link href="/settings" className="block mt-6">
                <button className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition">
                  Update Goal
                </button>
              </Link>
            </div>

          </div>

          {/* Recent Tips */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">💬 Recent Tips</h2>
            
            <div className="space-y-4">
              {stats.recentTips.map((tip, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between p-4 bg-gradient-to-r from-blue-50 to-transparent rounded-xl hover:shadow-md transition border-l-4 border-blue-500"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
                        {tip.from}
                      </span>
                      <span className="text-xs text-gray-400">{tip.time}</span>
                    </div>
                    {tip.message && (
                      <p className="text-gray-700">{tip.message}</p>
                    )}
                  </div>
                  <div className="text-right ml-4">
                    <div className="font-bold text-xl text-blue-600">{tip.amount} ETH</div>
                    <div className="text-xs text-gray-500">≈ ${(tip.amount * 3000).toFixed(0)}</div>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/yourname" className="block mt-6">
              <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition">
                View All Tips
              </button>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
