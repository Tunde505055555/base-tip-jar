'use client';

import { useCallback, useState } from 'react';
import { useAccount } from 'wagmi';
import { parseEther, isAddress } from 'viem';
import { base } from 'wagmi/chains';
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
  { avatar: '🦄', sender: '0x3f4a...b8e2', amount: '0.005', msg: 'Keep building! 🙌', time: '2 min ago' },
  { avatar: '🚀', sender: 'builder.eth', amount: '0.001', msg: 'Love this mini app! 💙', time: '11 min ago' },
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
  const recipientValid = recipient && isAddress(recipient);

  const buildCalls = useCallback(async () => {
    if (!recipient || !isAddress(recipient)) return [];
    return [{
      to: recipient as `0x${string}`,
      value: parseEther(finalAmount || '0.001'),
      data: '0x' as `0x${string}`,
    }];
  }, [recipient, finalAmount]);

  const handleStatus = useCallback((status: LifecycleStatus) => {
    if (status.statusName === 'success') {
      const emojis = ['🦄','🚀','⚡','🔥','💎','🌊'];
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      const short = address ? address.slice(0,6) + '...' + address.slice(-4) : '0x????';
      setTips(prev => [{
        avatar: emoji,
        sender: short,
        amount: finalAmount,
        msg: message || 'Sent a tip on Base! 💙',
        time: 'Just now',
      }, ...prev]);
      setTotalEth(prev => parseFloat((prev + parseFloat(finalAmount)).toFixed(4)));
      setTipCount(prev => prev + 1);
      setMessage('');
      setRecipient('');
    }
  }, [address, finalAmount, message]);

  return (
    <div style={{ background: '#050A18', minHeight: '100vh', color: '#E8EEFF', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ maxWidth: '520px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
            Base <span style={{ color: '#3b82f6' }}>Tip Jar</span> 🫙
          </h1>
          <p style={{ color: '#6B7EAA', marginTop: '8px' }}>
            Send real ETH tips onchain. Powered by OnchainKit.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1px', background: 'rgba(0,82,255,0.2)', borderRadius: '16px', overflow: 'hidden', marginBottom: '24px' }}>
          {[
            { val: totalEth.toFixed(4), label: 'ETH Tipped' },
            { val: tipCount, label: 'Total Tips' },
            { val: '<$0.01', label: 'Avg Fee' },
          ].map(s => (
            <div key={s.label} style={{ background: '#0C1428', padding: '16px', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{s.val}</div>
              <div style={{ color: '#6B7EAA', fontSize: '0.7rem', marginTop: '4px', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0C1428', border: '1px solid rgba(0,82,255,0.2)', borderRadius: '20px', padding: '24px', marginBottom: '16px' }}>
          <div style={{ color: '#6B7EAA', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>// Your Wallet</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Wallet>
              <ConnectWallet>
                <Avatar className="h-5 w-5" />
                <Name />
              </ConnectWallet>
              <WalletDropdown>
                <Identity hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
            {isConnected && (
              <span style={{ background: 'rgba(0,229,160,0.1)', color: '#00E5A0', border: '1px solid rgba(0,229,160,0.3)', borderRadius: '100px', padding: '4px 12px', fontSize: '0.75rem' }}>
                ● Connected
              </span>
            )}
          </div>
        </div>

        <div style={{ background: '#0C1428', border: '1px solid rgba(0,82,255,0.2)', borderRadius: '20px', padding: '24px', marginBottom: '16px' }}>
          <div style={{ color: '#6B7EAA', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>// Select Amount</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px' }}>
            {PRESET_AMOUNTS.map(p => (
              <button key={p.eth} onClick={() => { setSelectedAmount(p.eth); setCustomAmount(''); }}
                style={{
                  background: selectedAmount === p.eth && !customAmount ? '#0052FF' : 'rgba(0,82,255,0.06)',
                  border: `1px solid ${selectedAmount === p.eth && !customAmount ? '#0052FF' : 'rgba(0,82,255,0.2)'}`,
                  borderRadius: '12px', padding: '12px 6px', color: '#E8EEFF', cursor: 'pointer', textAlign: 'center',
                }}>
                <div>{p.label.split(' ')[0]}</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>{p.eth} ETH</div>
              </button>
            ))}
          </div>

          <input type="number" placeholder="Custom amount..." value={customAmount}
            onChange={e => setCustomAmount(e.target.value)}
            style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(0,82,255,0.2)', borderRadius: '12px', padding: '12px 16px', color: '#E8EEFF', marginBottom: '16px', boxSizing: 'border-box' }} />

          <div style={{ color: '#6B7EAA', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>// Recipient Address</div>
          <input placeholder="0x... wallet address on Base" value={recipient}
            onChange={e => setRecipient(e.target.value)}
            style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: `1px solid ${recipient && !recipientValid ? '#ef4444' : 'rgba(0,82,255,0.2)'}`, borderRadius: '12px', padding: '12px 16px', color: '#E8EEFF', marginBottom: '16px', boxSizing: 'border-box', fontFamily: 'monospace', fontSize: '0.8rem' }} />

          <div style={{ color: '#6B7EAA', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>// Message</div>
          <textarea placeholder="Say something kind... 👋" value={message}
            onChange={e => setMessage(e.target.value)} rows={3}
            style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(0,82,255,0.2)', borderRadius: '12px', padding: '12px 16px', color: '#E8EEFF', marginBottom: '20px', boxSizing: 'border-box', resize: 'none' }} />

          {isConnected ? (
            recipientValid ? (
              <Transaction chainId={base.id} calls={buildCalls} onStatus={handleStatus}>
                <TransactionButton text={`⚡ Send ${finalAmount} ETH on Base`}
                  className="ock-button" />
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
              <button disabled style={{ width: '100%', background: '#0052FF', border: 'none', borderRadius: '14px', padding: '16px', color: '#fff', fontWeight: 700, opacity: 0.4, cursor: 'not-allowed' }}>
                ⚡ Enter a valid address to send
              </button>
            )
          ) : (
            <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(0,82,255,0.06)', borderRadius: '12px', color: '#6B7EAA' }}>
              👆 Connect your wallet above to send a tip
            </div>
          )}
        </div>

        <div style={{ background: '#0C1428', border: '1px solid rgba(0,82,255,0.2)', borderRadius: '20px', padding: '24px' }}>
          <div style={{ color: '#6B7EAA', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>// Recent Tips</div>
          {tips.map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', padding: '12px 0', borderBottom: i < tips.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(0,82,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                {tip.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ color: '#3b82f6', fontSize: '0.75rem', fontFamily: 'monospace' }}>{tip.sender}</span>
                  <span style={{ color: '#00E5A0', fontWeight: 700, fontSize: '0.85rem' }}>+{tip.amount} ETH</span>
                </div>
                <div style={{ color: '#6B7EAA', fontSize: '0.8rem' }}>{tip.msg}</div>
                <div style={{ color: 'rgba(107,126,170,0.5)', fontSize: '0.7rem', marginTop: '4px' }}>{tip.time} · Base Mainnet</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
