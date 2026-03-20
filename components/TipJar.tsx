'use client';

import { useCallback, useState, useEffect } from 'react';
import { useAccount, usePublicClient } from 'wagmi';
import { parseEther, isAddress, formatEther } from 'viem';
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

const CONTRACT_ADDRESS = '0x6B2D3D1766e7A8a26d524802D3B701fc271BF3EA' as `0x${string}`;

const CONTRACT_ABI = [
  {
    name: 'sendTip',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'message', type: 'string' },
    ],
    outputs: [],
  },
  {
    name: 'getRecentTips',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'count', type: 'uint256' }],
    outputs: [{
      name: '',
      type: 'tuple[]',
      components: [
        { name: 'sender', type: 'address' },
        { name: 'recipient', type: 'address' },
        { name: 'amount', type: 'uint256' },
        { name: 'message', type: 'string' },
        { name: 'timestamp', type: 'uint256' },
      ],
    }],
  },
  {
    name: 'getTotalTipped',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'getTipCount',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
] as const;

const EMOJIS = ['🦄','🚀','⚡','🔥','💎','🌊','🎯','👾'];

const shortAddr = (addr: string) => addr.slice(0,6) + '...' + addr.slice(-4);

const timeAgo = (timestamp: bigint) => {
  const diff = Math.floor(Date.now() / 1000) - Number(timestamp);
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  return `${Math.floor(diff / 86400)} days ago`;
};

const PRESET_AMOUNTS = [
  { label: '☕ Tiny', eth: '0.0001' },
  { label: '🙌 Nice', eth: '0.001' },
  { label: '🔥 Fire', eth: '0.005' },
  { label: '👑 King', eth: '0.01' },
];

export default function TipJar() {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const [selectedAmount, setSelectedAmount] = useState('0.001');
  const [customAmount, setCustomAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [tips, setTips] = useState<any[]>([]);
  const [totalEth, setTotalEth] = useState('0.0000');
  const [tipCount, setTipCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const finalAmount = customAmount || selectedAmount;
  const recipientValid = recipient && isAddress(recipient);

  const fetchData = useCallback(async () => {
    if (!publicClient) return;
    try {
      const [total, count, recentTips] = await Promise.all([
        publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'getTotalTipped',
        }),
        publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'getTipCount',
        }),
        publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'getRecentTips',
          args: [BigInt(5)],
        }),
      ]);

      setTotalEth(parseFloat(formatEther(total as bigint)).toFixed(4));
      setTipCount(Number(count));
      setTips([...(recentTips as any[])].reverse());
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, [publicClient]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const buildCalls = useCallback(async () => {
    if (!recipient || !isAddress(recipient)) return [];
    return [{
      to: CONTRACT_ADDRESS,
      value: parseEther(finalAmount || '0.001'),
      data: `0x${Buffer.from('sendTip(address,string)').toString('hex')}` as `0x${string}`,
    }];
  }, [recipient, finalAmount]);

  const handleStatus = useCallback((status: LifecycleStatus) => {
    if (status.statusName === 'success') {
      setTimeout(() => fetchData(), 3000);
      setMessage('');
      setRecipient('');
    }
  }, [fetchData]);

  return (
    <div style={{ background: '#050A18', minHeight: '100vh', color: '#E8EEFF', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ maxWidth: '520px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0,82,255,0.1)', border: '1px solid rgba(0,82,255,0.2)', borderRadius: '100px', padding: '6px 16px', marginBottom: '16px', fontSize: '0.75rem', color: '#3b82f6', letterSpacing: '1.5px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3b82f6', display: 'inline-block' }} />
            BUILT ON BASE · MAINNET
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
            Base <span style={{ color: '#3b82f6' }}>Tip Jar</span> 🫙
          </h1>
          <p style={{ color: '#6B7EAA', marginTop: '8px' }}>
            Send real ETH tips onchain. Powered by OnchainKit.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1px', background: 'rgba(0,82,255,0.2)', borderRadius: '16px', overflow: 'hidden', marginBottom: '24px' }}>
          {[
            { val: loading ? '...' : totalEth, label: 'ETH Tipped' },
            { val: loading ? '...' : tipCount, label: 'Total Tips' },
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
          <Wallet>
            <ConnectWallet>
              <div style={{ background: '#0052FF', color: '#fff', padding: '14px 24px', borderRadius: '12px', fontWeight: 700, fontSize: '1rem', textAlign: 'center', width: '100%', cursor: 'pointer' }}>
                🔵 Connect Wallet
              </div>
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
            <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: '#3b82f6', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                {address && shortAddr(address)}
              </span>
              <span style={{ background: 'rgba(0,229,160,0.1)', color: '#00E5A0', border: '1px solid rgba(0,229,160,0.3)', borderRadius: '100px', padding: '4px 12px', fontSize: '0.75rem' }}>
                ● Connected
              </span>
            </div>
          )}
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ color: '#6B7EAA', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px' }}>// Recent Tips</div>
            <div style={{ color: '#00E5A0', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00E5A0', display: 'inline-block' }} />
              LIVE
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '20px', color: '#6B7EAA' }}>Loading onchain data...</div>
          ) : tips.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px', color: '#6B7EAA' }}>No tips yet — be the first! 🫙</div>
          ) : (
            tips.map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', padding: '12px 0', borderBottom: i < tips.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(0,82,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                  {EMOJIS[i % EMOJIS.length]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ color: '#3b82f6', fontSize: '0.75rem', fontFamily: 'monospace' }}>{shortAddr(tip.sender)}</span>
                    <span style={{ color: '#00E5A0', fontWeight: 700, fontSize: '0.85rem' }}>+{parseFloat(formatEther(tip.amount)).toFixed(4)} ETH</span>
                  </div>
                  <div style={{ color: '#6B7EAA', fontSize: '0.8rem' }}>{tip.message || 'Sent a tip! 💙'}</div>
                  <div style={{ color: 'rgba(107,126,170,0.5)', fontSize: '0.7rem', marginTop: '4px' }}>{timeAgo(tip.timestamp)} · Base Mainnet</div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
