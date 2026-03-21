import { useState } from 'react';

export default function ShareButton({ username, displayName }) {
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const url = `https://base-tip-jar-u7d3.vercel.app/${username}`;
  const text = `Support ${displayName} on Base Tip Jar! 🫙`;

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      '_blank'
    );
  };

  const shareFarcaster = () => {
    window.open(
      `https://warpcast.com/~/compose?text=${encodeURIComponent(text + ' ' + url)}`,
      '_blank'
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg"
      >
        📤 Share
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-20 overflow-hidden">
            <button
              onClick={copyLink}
              className="w-full px-6 py-4 text-left hover:bg-gray-50 transition flex items-center gap-3 border-b"
            >
              <span className="text-2xl">{copied ? '✓' : '🔗'}</span>
              <div>
                <div className="font-semibold">
                  {copied ? 'Link Copied!' : 'Copy Link'}
                </div>
                <div className="text-xs text-gray-500">Share anywhere</div>
              </div>
            </button>

            <button
              onClick={shareTwitter}
              className="w-full px-6 py-4 text-left hover:bg-gray-50 transition flex items-center gap-3 border-b"
            >
              <span className="text-2xl">🐦</span>
              <div>
                <div className="font-semibold">Share on Twitter</div>
                <div className="text-xs text-gray-500">Post to your followers</div>
              </div>
            </button>

            <button
              onClick={shareFarcaster}
              className="w-full px-6 py-4 text-left hover:bg-gray-50 transition flex items-center gap-3"
            >
              <span className="text-2xl">🟣</span>
              <div>
                <div className="font-semibold">Share on Farcaster</div>
                <div className="text-xs text-gray-500">Cast to the protocol</div>
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
