import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function CreatePage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    username: '',
    displayName: '',
    bio: '',
    avatar: '🎨',
    category: 'Creator',
    walletAddress: '',
    goalTitle: '',
    goalAmount: '',
    goalDescription: '',
    twitter: '',
    github: ''
  });

  const [errors, setErrors] = useState({});

  const categories = ['Creator', 'Builder', 'Artist', 'Educator', 'Friend', 'Other'];
  
  const avatarOptions = ['🎨', '👨‍💻', '👩‍💻', '🎭', '🎸', '📹', '✍️', '🎮', '💰', '🧙‍♂️', '🚀', '💙', '⚡', '🔥', '✨', '🌟'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username || formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, - and _';
    }
    if (!formData.displayName) {
      newErrors.displayName = 'Display name is required';
    }
    if (!formData.bio || formData.bio.length < 10) {
      newErrors.bio = 'Bio must be at least 10 characters';
    }
    if (!formData.walletAddress || !formData.walletAddress.startsWith('0x')) {
      newErrors.walletAddress = 'Please enter a valid wallet address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Here you would save to your backend/blockchain
    console.log('Creating tip jar with data:', formData);
    
    alert(`🎉 Tip jar created!\n\nYour page: base-tip-jar.app/${formData.username}`);
    
    // Redirect to their new page
    router.push(`/${formData.username}`);
  };

  return (
    <>
      <Head>
        <title>Create Your Tip Jar - Base Tip Jar</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              🫙 Create Your Tip Jar
            </h1>
          </div>
        </header>

        <div className="max-w-4xl mx-auto py-12 px-4">
          
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Basic Info */}
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span>👤</span> Basic Info
                </h2>
                
                <div className="space-y-6">
                  
                  {/* Username */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Username *
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">base-tip-jar.app/</span>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={`flex-1 px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.username ? 'border-red-300' : 'border-gray-200'
                        }`}
                        placeholder="yourname"
                      />
                    </div>
                    {errors.username && (
                      <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                    )}
                    <p className="text-gray-500 text-sm mt-1">Choose a unique username for your tip jar</p>
                  </div>

                  {/* Display Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Display Name *
                    </label>
                    <input
                      type="text"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.displayName ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder="Your Name"
                    />
                    {errors.displayName && (
                      <p className="text-red-500 text-sm mt-1">{errors.displayName}</p>
                    )}
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Bio *
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                        errors.bio ? 'border-red-300' : 'border-gray-200'
                      }`}
                      rows={3}
                      placeholder="Tell people what you do..."
                      maxLength={160}
                    />
                    {errors.bio && (
                      <p className="text-red-500 text-sm mt-1">{errors.bio}</p>
                    )}
                    <p className="text-gray-500 text-sm mt-1">{formData.bio.length}/160</p>
                  </div>

                  {/* Avatar */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Choose Your Avatar
                    </label>
                    <div className="grid grid-cols-8 gap-3">
                      {avatarOptions.map(emoji => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, avatar: emoji }))}
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

                  {/* Category */}
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

              {/* Wallet */}
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span>💰</span> Wallet Address
                </h2>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Base Wallet Address *
                  </label>
                  <input
                    type="text"
                    name="walletAddress"
                    value={formData.walletAddress}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm ${
                      errors.walletAddress ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="0x..."
                  />
                  {errors.walletAddress && (
                    <p className="text-red-500 text-sm mt-1">{errors.walletAddress}</p>
                  )}
                  <p className="text-gray-500 text-sm mt-1">This is where you'll receive tips</p>
                </div>
              </div>

              {/* Goal (Optional) */}
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span>🎯</span> Set a Goal <span className="text-sm font-normal text-gray-500">(Optional)</span>
                </h2>
                
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
                      placeholder="New laptop for development"
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
                      placeholder="0.5"
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
                      placeholder="Why do you need this?"
                      maxLength={200}
                    />
                    <p className="text-gray-500 text-sm mt-1">{formData.goalDescription.length}/200</p>
                  </div>

                </div>
              </div>

              {/* Social Links (Optional) */}
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span>🔗</span> Social Links <span className="text-sm font-normal text-gray-500">(Optional)</span>
                </h2>
                
                <div className="space-y-6">
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Twitter/X Username
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">@</span>
                      <input
                        type="text"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleChange}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="yourhandle"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      GitHub Username
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">github.com/</span>
                      <input
                        type="text"
                        name="github"
                        value={formData.github}
                        onChange={handleChange}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="yourusername"
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* Submit */}
              <div className="pt-6 border-t">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold py-5 px-6 rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] text-lg shadow-lg"
                >
                  🚀 Create My Tip Jar
                </button>
                <p className="text-center text-gray-500 text-sm mt-4">
                  You can edit this information anytime later
                </p>
              </div>

            </form>

          </div>

        </div>
      </div>
    </>
  );
}
