import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function BrowsePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Creators', 'Builders', 'Artists', 'Educators', 'Friends'];
  
  // Mock creators data
  const creators = [
    {
      username: 'cryptoartist',
      displayName: 'Crypto Artist',
      bio: 'Creating NFT art on Base',
      avatar: '🎨',
      category: 'Artists',
      totalTips: 2.5,
      supporters: 45
    },
    {
      username: 'webbuilder',
      displayName: 'Web3 Builder',
      bio: 'Building dApps and tools',
      avatar: '👨‍💻',
      category: 'Builders',
      totalTips: 5.2,
      supporters: 89
    },
    {
      username: 'contentking',
      displayName: 'Content King',
      bio: 'Teaching Web3 to everyone',
      avatar: '📹',
      category: 'Creators',
      totalTips: 3.8,
      supporters: 67
    },
    {
      username: 'defi_guru',
      displayName: 'DeFi Guru',
      bio: 'Sharing DeFi strategies',
      avatar: '💰',
      category: 'Educators',
      totalTips: 4.1,
      supporters: 112
    },
    {
      username: 'nftcollector',
      displayName: 'NFT Collector',
      bio: 'Curating amazing NFTs',
      avatar: '🖼️',
      category: 'Artists',
      totalTips: 1.9,
      supporters: 34
    },
    {
      username: 'smartcontractdev',
      displayName: 'Smart Contract Dev',
      bio: 'Solidity wizard',
      avatar: '🧙‍♂️',
      category: 'Builders',
      totalTips: 6.7,
      supporters: 156
    }
  ];

  const filteredCreators = selectedCategory === 'All' 
    ? creators 
    : creators.filter(c => c.category === selectedCategory);

  return (
    <>
      <Head>
        <title>Browse Creators - Base Tip Jar</title>
        <meta name="description" content="Discover and support amazing creators on Base" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              🫙 Base Tip Jar
            </Link>
          </div>
        </header>

        <div className="max-w-7xl mx-auto py-12 px-4">
          
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Discover Creators
            </h1>
            <p className="text-xl text-gray-600">
              Support amazing people building on Base
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Creators Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCreators.map(creator => (
              <Link 
                href={`/${creator.username}`} 
                key={creator.username}
                className="block"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 border border-gray-100 hover:scale-105 transform cursor-pointer">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-5xl">{creator.avatar}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-gray-900 mb-1">
                        {creator.displayName}
                      </h3>
                      <p className="text-gray-600 text-sm">@{creator.username}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{creator.bio}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <div className="text-sm text-gray-500">Total Tips</div>
                      <div className="font-bold text-blue-600">{creator.totalTips} ETH</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Supporters</div>
                      <div className="font-bold text-indigo-600">{creator.supporters}</div>
                    </div>
                  </div>
                  
                  <span className="inline-block mt-4 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {creator.category}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {filteredCreators.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl text-gray-500">No creators found in this category</p>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
