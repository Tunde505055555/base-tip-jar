# 🫙 Base Tip Jar

A **real** Mini App for the [Base](https://base.org) ecosystem — built with **OnchainKit** and **Next.js**. Users connect their wallet and send actual ETH tips on Base Mainnet with a personal message.

> ⚡ Real onchain transactions · 💙 Built on Base · 🔵 Powered by OnchainKit

---

## ✨ What Makes This Real

| Feature | Implementation |
|---|---|
| Wallet connection | `@coinbase/onchainkit` `<ConnectWallet />` |
| Real ETH transfers | `<Transaction />` with `calls` prop on Base Mainnet |
| Transaction feedback | `<TransactionToast />` + lifecycle status |
| Identity display | `<Avatar />`, `<Name />`, `<EthBalance />` |
| Chain | **Base Mainnet** (`chainId: 8453`) |

---

## 🚀 Getting Started

### 1. Clone & install
```bash
git clone https://github.com/YOUR_USERNAME/base-tip-jar.git
cd base-tip-jar
npm install
```

### 2. Set up environment variables
```bash
cp .env.local.example .env.local
```

Fill in your Alchemy RPC URL:
```
NEXT_PUBLIC_ALCHEMY_RPC=https://base-mainnet.g.alchemy.com/v2/YOUR_KEY
```

### 3. Run locally
```bash
npm run dev
```

---

## 🛠 Tech Stack

- **Next.js 14** — React framework
- **OnchainKit** — Base's official component library
- **wagmi v2** — React hooks for Ethereum
- **viem** — TypeScript Ethereum utilities
- **Base Mainnet** — Ethereum L2 by Coinbase

---

## 📁 Project Structure
```
base-tip-jar/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── providers.tsx
│   └── globals.css
├── components/
│   └── TipJar.tsx
├── .env.local.example
└── package.json
```

---

Made with 💙 on [Base](https://base.org)
