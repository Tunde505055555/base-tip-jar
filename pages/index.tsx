import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Base Tip Jar - Accept Tips on Base Blockchain</title>
        <meta name="description" content="Create your tip jar, set goals, and accept crypto tips on Base with minimal fees" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        
        {/* Hero Section */}
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-5xl mx-auto text-center">
            
            <div className="text-8xl mb-8 animate-bounce">🫙</div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Base Tip Jar
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-700 mb-4">
              Accept crypto tips with <span className="font-bold text-blue-600">&lt;$0.01</span> fees
            </p>
            
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Create your tip jar, set goals, and get supported by your community on Base blockchain
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link 
                href="/create"
                className="px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xl font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-xl"
              >
                🚀 Create Your Tip Jar
              </Link>
              <Link 
                href="/browse"
                className="px-10 py-5 bg-white text-gray-800 text-xl font-bold rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-xl border-2 border-gray-200"
              >
                🔍 Browse Creators
              </Link>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-2">Ultra Low Fees</h3>
                <p className="text-gray-600">Pay &lt;$0.01 per transaction on Base L2</p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-2">Set Goals</h3>
                <p className="text-gray-600">Show your supporters what you're working towards</p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="text-5xl mb-4">💬</div>
                <h3 className="text-xl font-bold mb-2">Custom Messages</h3>
                <p className="text-gray-600">Receive encouraging messages with every tip</p>
              </div>

            </div>

          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white py-20">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-12">Built on Base</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div>
                <div className="text-5xl font-bold text-blue-600 mb-2">1000+</div>
                <div className="text-gray-600 text-lg">Tip Jars Created</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-indigo-600 mb-2">50 ETH</div>
                <div className="text-gray-600 text-lg">Total Tips Sent</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-purple-600 mb-2">5000+</div>
                <div className="text-gray-600 text-lg">Happy Supporters</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 px-4">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to start receiving tips?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Create your tip jar in less than 2 minutes
            </p>
            <Link 
              href="/create"
              className="inline-block px-10 py-5 bg-white text-blue-600 text-xl font-bold rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
            >
              Get Started Free 🚀
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-xl mb-4">Base Tip Jar</h3>
                <p className="text-gray-400">Crypto tipping made simple on Base blockchain</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <div className="space-y-2">
                  <Link href="/create" className="block text-gray-400 hover:text-white transition">
                    Create Tip Jar
                  </Link>
                  <Link href="/browse" className="block text-gray-400 hover:text-white transition">
                    Browse Creators
                  </Link>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <div className="space-y-2">
                  <a href="https://twitter.com/base" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white transition">
                    Twitter
                  </a>
                  <a href="https://base.org" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white transition">
                    Base.org
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
              <p>Built with 💙 on Base blockchain</p>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
