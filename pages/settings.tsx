import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  
  const [formData, setFormData] = useState({
    displayName: 'Your Name',
    bio: 'Building cool stuff on Base 🔵',
    avatar: '🎨',
    category: 'Creator',
    goalTitle: 'New laptop for development',
    goalAmount: '0.5',
    goalDescription: 'Help me upgrade my setup!',
    twitter: 'yourhandle',
    github: 'yourusername'
  });

  const categories = ['Creator', 'Builder', 'Artist', 'Educator', 'Friend', 'Other'];
  const avatarOptions = ['🎨', '👨‍💻', '👩‍💻', '🎭', '🎸', '📹', '✍️', '🎮', '💰', '🧙‍♂️', '🚀', '💙', '⚡', '🔥', '✨', '🌟'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Save logic here
    console.log('Saving settings:', formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <>
      <Head>
        <title>Settings - Base Tip Jar</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              🫙 Base Tip Jar
            </Link>
            <Link href="/yourname" className="text-blue-600 hover:text-blue-700 font-medium">
              View My Page →
            </Link>
          </div>
        </header>

        <div className="max-w-4xl mx-auto py-12 px-4">
          
          <h1 className="text-4xl font-bold mb-8">⚙️ Settings</h1>

          {saved && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl mb-6 flex items-center gap-3">
              <span className="text-2xl">✓</span>
              <span className="font-medium">Settings saved successfully!</span>
            </div>
          )}
          
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            
            <form onSubmit={handleSave} className="space-y-8">
              
              {/* Profile */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Profile</h2>
                
                <div className="space-y-6">
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={3}
                      maxLength={160}
                    />
                    <p className="text-gray-500 text-sm mt-1">{formData.bio.length}/160</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Avatar
                    </label>
                    <div className="grid grid-cols-8 gap-3">
                      {avatarOptions.map(emoji => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, avatar: emoji }));
                            setSaved(false);
                          }}
                          className={`text-4xl p-3 rounded-xl border-2 transition-all hover:scale-110 ${
                            formData.avatar === emoji 
                              ? 'border-blue-500 bg-blue-50 scale-110' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                </div>
              </div>

              {/* Goal */}
              <div className="pt-8 border-t">
                <h2 className="text-2xl font-bold mb-6">Current Goal</h2>
                
                <div className="space-y-6">
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Goal Title
                    </label>
                    <input
                      type="text"
                      name="goalTitle"
                      value={formData.goalTitle}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Goal Amount (ETH)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      name="goalAmount"
                      value={formData.goalAmount}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {formData.goalAmount && (
                      <p className="text-gray-500 text-sm mt-1">
                        ≈ ${(parseFloat(formData.goalAmount) * 3000).toFixed(0)} USD
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Goal Description
                    </label>
                    <textarea
                      name="goalDescription"
                      value={formData.goalDescription}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={2}
                      maxLength={200}
                    />
                    <p className="text-gray-500 text-sm mt-1">{formData.goalDescription.length}/200</p>
                  </div>

                </div>
              </div>

              {/* Social */}
              <div className="pt-8 border-t">
                <h2 className="text-2xl font-bold mb-6">Social Links</h2>
                
                <div className="space-y-6">
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Twitter/X
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">@</span>
                      <input
                        type="text"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleChange}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      GitHub
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">github.com/</span>
                      <input
                        type="text"
                        name="github"
                        value={formData.github}
                        onChange={handleChange}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* Save Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02]"
                >
                  💾 Save Changes
                </button>
              </div>

            </form>

          </div>

        </div>
      </div>
    </>
  );
}
