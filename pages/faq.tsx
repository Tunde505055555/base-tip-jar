import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "What is Base Tip Jar?",
      a: "Base Tip Jar is a platform that lets you accept cryptocurrency tips with minimal fees using Base blockchain. Create your tip jar, set goals, and receive support from your community."
    },
    {
      q: "How much do transactions cost?",
      a: "Transactions on Base typically cost less than $0.01! This is because Base is a Layer 2 solution built on Ethereum, making it extremely affordable compared to Ethereum mainnet."
    },
    {
      q: "What wallets can I use?",
      a: "You can use any Web3 wallet that supports Base network, including MetaMask, Coinbase Wallet, Rainbow, and more. Just make sure your wallet is connected to Base network."
    },
    {
      q: "How do I create a tip jar?",
      a: "Click 'Create Your Tip Jar', fill in your profile information, set your wallet address, and optionally add a goal. Your tip jar will be live immediately with a shareable link!"
    },
    {
      q: "Can I set multiple goals?",
      a: "Currently, you can set one active goal at a time. Once you reach your goal, you can update it to a new one in your settings."
    },
    {
      q: "How do I withdraw my tips?",
      a: "Tips are sent directly to your wallet address, so you have immediate access to your funds. No withdrawal needed - you already own your tips!"
    },
    {
      q: "Are tips refundable?",
      a: "No, blockchain transactions are final and cannot be reversed. Make sure you're sending to the correct address before confirming."
    },
    {
      q: "Can I customize my tip jar page?",
      a: "Yes! You can customize your display name, bio, avatar, category, goal, and social links in the settings page."
    },
    {
      q: "Is there a minimum tip amount?",
      a: "While there's no enforced minimum, we recommend tipping at least 0.001 ETH to make the transaction worthwhile after gas fees."
    },
    {
      q: "How do I get my tip jar featured?",
      a: "Be active in the Base community, share your tip jar on social media, tag @base, and provide value to your supporters. Popular tip jars may get featured!"
    }
  ];

  return (
    <>
      <Head>
        <title>FAQ - Base Tip Jar</title>
        <meta name="description" content="Frequently asked questions about Base Tip Jar" />
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
            <h1 className="text-5xl font-bold mb-4">❓ FAQ</h1>
            <p className="text-xl text-gray-600">Everything you need to know</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 last:border-0 pb-4 last:pb-0"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full text-left flex justify-between items-start gap-4 py-2"
                  >
                    <h3 className="font-bold text-lg text-gray-900 flex-1">
                      {faq.q}
                    </h3>
                    <span className="text-2xl text-blue-600 flex-shrink-0">
                      {openIndex === index ? '−' : '+'}
                    </span>
                  </button>
                  {openIndex === index && (
                    <p className="text-gray-600 mt-3 pl-0 leading-relaxed">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="mb-6 text-blue-100">Join our community or reach out on Twitter</p>
            <div className="flex gap-4 justify-center">
              
                href="https://discord.com/invite/buildonbase"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition"
              >
                Join Discord
              </a>
              
                href="https://twitter.com/base"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition"
              >
                Follow on Twitter
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
