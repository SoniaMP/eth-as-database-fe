# Companies CRM - Blockchain Integration

## Overview

A decentralized Customer Relationship Management (CRM) system for small companies, enabling users to perform CRUD (Create, Read, Update, Delete) operations on company records through blockchain technology. Authentication is handled via MetaMask wallet login, ensuring secure and verifiable transactions.

## Key Features

1. Wallet Authentication

- MetaMask Integration: Users must connect their Ethereum wallet (via MetaMask) to access the applicatio
- Web3 Identity: Wallet address serves as the user's unique identifier
- On-Chain Verification: All transactions are cryptographically signed

2. Company Management (CRUD Operations)

- Hashes sensitive data (like VAT numbers) before blockchain storage
- Emits transaction with company details
- Stores transaction hash for auditability

3. Read

- Fetches company data from both:
  - Smart contract storage (on-chain)
  - Local database (off-chain metadata)
- Verifies data integrity against blockchain records

## Workflow

1. User connects wallet via MetaMask
2. Application detects active chain (local/testnet/mainnet)
3. CRUD operations trigger MetaMask transaction prompts
4. Signed transactions are broadcast to the network
5. UI updates upon transaction confirmation

## 🚀 Prerequisites

- **Node.js** v22 or later.
- **npm** (bundled with Node.js) or **yarn**.
- **Metamask**

## Configure Metamask to work with Anvil

See more info in this [link](CONFIGURATIONS.md).

## Technical Stack

- **Frontend**: React/Vue with ethers.js/web3.js
- **Smart Contracts**: Solidity (Foundry/Hardhat)
- **Local Development**: Anvil local blockchain
- **Wallet Integration**: MetaMask API


## 📥 Installation

Clone this repository and install the dependencies:

```bash
git clone https://github.com/SoniaMP/eth-as-database-fe.git
cd folder-name
npm install
```

Run it in local environment using

```bash
npm start
npm dev
```
