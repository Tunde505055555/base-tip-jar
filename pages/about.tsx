import Head from 'next/head';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About - Base Tip Jar</title>
        <meta name="description" content="Learn about Base Tip Jar and our mission" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        
        <header className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              🫙 Base Tip Jar
            </Link>
          </div>
        </header>

        <div className="max-w-4xl mx-auto py-12 px-4">
          
          <div className="text-center mb-12">
            <div className="text-7xl mb-6">🫙</div>
            <h1 className="text-5xl font-bold mb-4">About Base Tip Jar</h1>
            <p className="text-xl text-gray-600">Making crypto tipping simple and affordable</p>
          </div>

          <div className="space-y-8">
            
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Base Tip Jar exists to make it easy for creators, builders, and anyone doing great work to receive support from their community. Traditional payment platforms charge high fees and create friction. Crypto can be complicated and expensive on mainnet. We solve both problems by leveraging Base's ultra-low fees to make tipping as simple as it should be.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold mb-4">Why Base?</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Base is a Layer 2 blockchain built by Coinbase that makes transactions:
              </p>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">⚡</span>
                  <span><strong>Fast:</strong> Transactions confirm in seconds</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">💰</span>
                  <span><strong>Cheap:</strong> Fees typically under $0.01</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🔒</span>
                  <span><strong>Secure:</strong> Backed by Ethereum's security</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🌐</span>
                  <span><strong>Accessible:</strong> Works with popular wallets like MetaMask and Coinbase Wallet</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Create Your Tip Jar</h3>
                    <p className="text-gray-700">Set up your profile, choose a goal, and get your unique shareable link.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-2xl font-bold text-indigo-600">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Share Your Link</h3>
                    <p className="text-gray-700">Post your tip jar on Twitter, in your bio, or anywhere your community hangs out.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl font-bold text-purple-600">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Receive Tips</h3>
                    <p className="text-gray-700">Supporters send you tips directly to your wallet. Tips arrive instantly and are yours to keep.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-2xl font-bold text-pink-600">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Track Your Progress</h3>
                    <p className="text-gray-700">Watch your goal progress, see who's supporting you, and thank your community.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold mb-4">Who Is This For?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <div className="text-3xl mb-2">🎨</div>
                  <h3 className="font-bold mb-2">Creators</h3>
                  <p className="text-gray-700 text-sm">Content creators, artists, writers, and anyone building an audience</p>
                </div>
                <div className="p-4 bg-indigo-50 rounded-xl">
                  <div className="text-3xl mb-2">👨‍💻</div>
                  <h3 className="font-bold mb-2">Builders</h3>
                  <p className="text-gray-700 text-sm">Developers, designers, and makers shipping cool projects</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl">
                  <div className="text-3xl mb-2">📚</div>
                  <h3 className="font-bold mb-2">Educators</h3>
                  <p className="text-gray-700 text-sm">Teachers sharing knowledge and helping others learn</p>
                </div>
                <div className="p-4 bg-pink-50 rounded-xl">
                  <div className="text-3xl mb-2">💙</div>
                  <h3 className="font-bold mb-2">Anyone</h3>
                  <p className="text-gray-700 text-sm">If you do valuable work, you deserve to be supported</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-blue-100 mb-6">
                Create your tip jar in less than 2 minutes
              </p>
              <Link href="/create" className="inline-block">
                <button className="px-10 py-5 bg-white text-blue-600 text-xl font-bold rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
                  Create Your Tip Jar 🚀
                </button>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
