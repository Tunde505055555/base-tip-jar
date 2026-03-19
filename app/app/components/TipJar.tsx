'use client';

import { useCallback, useState } from 'react';
import { useAccount } from 'wagmi';
import { parseEther, isAddress } from 'viem';
import { base } from 'wagmi/chains';

// OnchainKit — Wallet
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
  Avatar,
  Name,
  Address,
  Identity,
  EthBalance,
} from '@coinbase/onchainkit/identity';

// OnchainKit — Transaction
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusLabel,
  TransactionStatusAction,
  TransactionToast,
  TransactionToastIcon,
  TransactionToastLabel,
  TransactionToastAction,
} from '@coinbase/onchainkit/transaction';
import type { LifecycleStatus } from '@coinbase/onchainkit/transaction';

const PRESET_AMOUNTS = [
  { label: '☕ Tiny', eth: '0.0001' },
  { label: '🙌 Nice', eth: '0.001' },
  { label: '🔥 Fire', eth: '0.005' },
  { label: '👑 King', eth: '0.01' },
];

const RECENT_TIPS = [
  { avatar: '🦄', sender: '0x3f4a...b8e2', amount: '0.005', msg: 'Keep building! The ecosystem needs more devs like you 🙌', time: '2 min ago' },
  { avatar: '🚀', sender: 'builder.eth', amount: '0.001', msg: 'Love this mini app! Onchain tipping FTW 💙', time: '11 min ago' },
  { avatar: '⚡', sender: '0x9a1c...ff34', amount: '0.01', msg: 'Based. Absolutely based.', time: '34 min ago' },
];

export default function TipJar() {
  const { address, isConnected } = useAccount();
  const [selectedAmount, setSelectedAmount] = useState('0.001');
  const [customAmount, setCustomAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [tips, setTips] = useState(RECENT_TIPS);
  const [totalEth, setTotalEth] = useState(0.042);
  const [tipCount, setTipCount] = useState(7);

  const finalAmount = customAmount || selectedAmount;

  const buildCalls = useCallback(() => {
    if (!recipient || !isAddress(recipient)) return [];
    return [
      {
        to: recipient as `0x${string}`,
        value: parseEther(finalAmount || '0.001'),
        data: message
          ? (`0x${Buffer.from(message, 'utf8').toString('hex')}` as `0x${string}`)
          : '0x',
      },
    ];
  }, [recipient, finalAmount, message]);

  const handleStatus = useCallback(
    (status: LifecycleStatus) => {
      if (status.statusName === 'success') {
        const emojis = ['🦄', '🚀', '⚡', '🔥', '💎', '🌊'];
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        const short = address
          ? address.slice(0, 6) + '...' + address.slice(-4)
          : '0x????';
        setTips((prev) => [
          {
            avatar: emoji,
            sender: short,
            amount: finalAmount,
            msg: message || 'Sent a tip on Base! 💙',
            time: 'Just now',
          },
          ...prev,
        ]);
        setTotalEth((prev) => parseFloat((prev + parseFloat(finalAmount)).toFixed(4)));
        setTipCount((prev) => prev + 1);
        setMessage('');
        setRecipient('');
      }
    },
    [address, finalAmount, message]
  );

  const recipientValid = recipient && isAddress(recipient);

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: 'var(--dark)' }}>

      <div className="fixed inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,82,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,82,255,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="fixed top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,82,255,0.15), transparent 70%)', filter: 'blur(60px)', transform: 'translate(-30%, -30%)' }}
      />
      <div className="fixed bottom-0 right-0 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,229,160,0.1), transparent 70%)', filter: 'blur(60px)', transform: 'translate(30%, 30%)' }}
      />

      <div className="relative z-10 max-w-lg mx-auto px-4 py-10">

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-mono tracking-widest uppercase"
            style={{ background: 'rgba(0,82,255,0.1)', border: '1px solid var(--border)', color: '#3b82f6' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Built on Base · Mainnet
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight">
            Base <span className="text-blue-400">Tip Jar</span> 🫙
          </h1>
          <p className="mt-3 text-sm" style={{ color: 'var(--muted)' }}>
            Send real ETH tips onchain. Powered by OnchainKit.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-px rounded-2xl overflow-hidden mb-7"
          style={{ background: 'var(--border)', border: '1px solid var(--border)' }}>
          {[
            { val: totalEth.toFixed(4), label: 'ETH Tipped' },
            { val: tipCount, label: 'Total Tips' },
            { val: '<$0.01', label: 'Avg Fee' },
          ].map((s) => (
            <div key={s.label} className="text-center py-4" style={{ background: 'var(--card)' }}>
              <div className="font-mono font-bold text-lg">{s.val}</div>
              <div className="text-xs mt-1 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-6 mb-5" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
          <div className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--muted)' }}>// Your Wallet</div>
          <div className="flex items-center justify-between">
            <Wallet>
              <ConnectWallet className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3 rounded-xl transition-all">
                <Avatar className="h-5 w-5" />
                <Name />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>

            {isConnected && (
              <span className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(0,229,160,0.1)', color: 'var(--success)', border: '1px solid rgba(0,229,160,0.3)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Connected
              </span>
            )}
          </div>
        </div>

        <div className="rounded-2xl p-6 mb-5 relative overflow-hidden"
          style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(0,82,255,0.5), transparent)' }} />

          <div className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--muted)' }}>// Select amount</div>

          <div className="grid grid-cols-4 gap-2 mb-5">
            {PRESET_AMOUNTS.map((p) => (
              <button
                key={p.eth}
                onClick={() => { setSelectedAmount(p.eth); setCustomAmount(''); }}
                className="py-3 px-2 rounded-xl text-center transition-all text-sm font-mono"
                style={{
                  background: selectedAmount === p.eth && !customAmount ? 'var(--blue)' : 'rgba(0,82,255,0.06)',
                  border: `1px solid ${selectedAmount === p.eth && !customAmount ? 'var(--blue)' : 'var(--border)'}`,
                  color: selectedAmount === p.eth && !customAmount ? '#fff' : '#E8EEFF',
                  boxShadow: selectedAmount === p.eth && !customAmount ? '0 0 20px var(--blue-glow)' : 'none',
                }}
              >
                <div className="text-base">{p.label.split(' ')[0]}</div>
                <div className="text-xs mt-0.5 opacity-70">{p.eth} ETH</div>
              </button>
            ))}
          </div>

          <div className="relative mb-5">
            <input
              type="number"
              placeholder="Custom amount..."
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="w-full rounded-xl px-4 py-3 pr-16 font-mono text-sm outline-none transition-all"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border)',
                color: '#E8EEFF',
              }}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono px-2 py-1 rounded-md"
              style={{ background: 'rgba(0,82,255,0.12)', color: '#3b82f6' }}>ETH</span>
          </div>

          <div className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>// Recipient address</div>
          <input
            placeholder="0x... wallet address on Base"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full rounded-xl px-4 py-3 font-mono text-xs outline-none transition-all mb-5"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${recipient && !recipientValid ? '#ef4444' : 'var(--border)'}`,
              color: '#E8EEFF',
            }}
          />
          {recipient && !recipientValid && (
            <p className="text-xs text-red-400 -mt-3 mb-4 font-mono">⚠ Enter a valid 0x address</p>
          )}

          <div className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>// Message (stored onchain)</div>
          <textarea
            placeholder="Say something kind... 👋"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none transition-all mb-6"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--border)',
              color: '#E8EEFF',
              fontFamily: 'Syne, sans-serif',
            }}
          />

          {isConnected ? (
            recipientValid ? (
              <Transaction
                chainId={base.id}
                calls={buildCalls}
                onStatus={handleStatus}
              >
                <TransactionButton
                  text={`⚡ Send ${finalAmount} ETH on Base`}
                  className="w-full py-4 rounded-xl font-bold text-base transition-all"
                  style={{
                    background: 'var(--blue)',
                    color: '#fff',
                  }}
                />
                <TransactionStatus>
                  <TransactionStatusLabel />
                  <TransactionStatusAction />
                </TransactionStatus>
                <TransactionToast>
                  <TransactionToastIcon />
                  <TransactionToastLabel />
                  <TransactionToastAction />
                </TransactionToast>
              </Transaction>
            ) : (
              <button
                disabled
                className="w-full py-4 rounded-xl font-bold text-base opacity-40 cursor-not-allowed"
                style={{ background: 'var(--blue)', color: '#fff' }}
              >
                ⚡ Enter a valid address to send
              </button>
            )
          ) : (
            <div className="text-center py-4 rounded-xl text-sm font-mono"
              style={{ background: 'rgba(0,82,255,0.06)', border: '1px solid var(--border)', color: 'var(--muted)' }}>
              👆 Connect your wallet above to send a tip
            </div>
          )}

          <p className="text-center mt-3 text-xs font-mono flex items-center justify-center gap-2"
            style={{ color: 'var(--muted)' }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: 'var(--success)' }} />
            Base Mainnet · Fees &lt;$0.01 · ~2s finality
          </p>
        </div>

        <div className="rounded-2xl p-6" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
          <div className="flex items-center justify-between mb-5">
            <div className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--muted)' }}>// Recent tips</div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--success)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--success)' }} />
              Live
            </div>
          </div>

          <div className="space-y-0">
            {tips.map((tip, i) => (
              <div key={i} className="flex gap-4 py-4" style={{ borderBottom: i < tips.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: 'rgba(0,82,255,0.08)', border: '1px solid var(--border)' }}>
                  {tip.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs" style={{ color: '#3b82f6' }}>{tip.sender}</span>
                    <span className="font-mono text-sm font-bold" style={{ color: 'var(--success)' }}>+{tip.amount} ETH</span>
                  </div>
                  <p className="text-xs truncate" style={{ color: 'var(--muted)' }}>{tip.msg}</p>
                  <p className="text-xs mt-1 font-mono" style={{ color: 'rgba(107,126,170,0.5)' }}>{tip.time} · Base Mainnet</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
