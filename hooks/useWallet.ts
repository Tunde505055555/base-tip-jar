import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export function useWallet() {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [chainId, setChainId] = useState<number | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  // Base Mainnet Chain ID
  const BASE_CHAIN_ID = 8453;

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window as any;
      if (!ethereum) return;

      const accounts = await ethereum.request({ method: 'eth_accounts' });
      
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
        
        const provider = new ethers.BrowserProvider(ethereum);
        setProvider(provider);
        
        const network = await provider.getNetwork();
        setChainId(Number(network.chainId));
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window as any;
      
      if (!ethereum) {
        alert('Please install MetaMask or Coinbase Wallet!');
        return;
      }

      const accounts = await ethereum.request({ 
        method: 'eth_requestAccounts' 
      });

      setAccount(accounts[0]);
      setIsConnected(true);

      const provider = new ethers.BrowserProvider(ethereum);
      setProvider(provider);

      const network = await provider.getNetwork();
      setChainId(Number(network.chainId));

      // Check if on Base network
      if (Number(network.chainId) !== BASE_CHAIN_ID) {
        await switchToBase();
      }

    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet. Please try again.');
    }
  };

  const switchToBase = async () => {
    try {
      const { ethereum } = window as any;
      
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x2105' }], // Base mainnet (8453 in hex)
      });
      
      setChainId(BASE_CHAIN_ID);
      
    } catch (error: any) {
      // Chain not added to wallet
      if (error.code === 4902) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x2105',
              chainName: 'Base',
              nativeCurrency: {
                name: 'Ethereum',
                symbol: 'ETH',
                decimals: 18
              },
              rpcUrls: ['https://mainnet.base.org'],
              blockExplorerUrls: ['https://basescan.org']
            }]
          });
          setChainId(BASE_CHAIN_ID);
        } catch (addError) {
          console.error('Error adding Base network:', addError);
        }
      }
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setIsConnected(false);
    setChainId(null);
    setProvider(null);
  };

  const sendTip = async (toAddress: string, amount: string, message?: string) => {
    try {
      if (!provider || !account) {
        throw new Error('Wallet not connected');
      }

      if (chainId !== BASE_CHAIN_ID) {
        await switchToBase();
      }

      const signer = await provider.getSigner();
      
      const tx = await signer.sendTransaction({
        to: toAddress,
        value: ethers.parseEther(amount),
      });

      console.log('Transaction sent:', tx.hash);
      console.log('Message:', message || 'No message');

      const receipt = await tx.wait();
      console.log('Transaction confirmed:', receipt);

      return {
        success: true,
        txHash: tx.hash,
      };

    } catch (error: any) {
      console.error('Error sending tip:', error);
      return {
        success: false,
        error: error.message || 'Failed to send tip'
      };
    }
  };

  return {
    account,
    isConnected,
    chainId,
    isOnBase: chainId === BASE_CHAIN_ID,
    connectWallet,
    disconnectWallet,
    switchToBase,
    sendTip,
  };
}
