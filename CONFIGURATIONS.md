# Connecting MetaMask to Anvil (Local Dev)

## 1. Add Anvil Network to MetaMask
### Manual Configuration:

```shell
Network Name: Anvil Localhost
RPC URL: http://127.0.0.1:8545
Chain ID: 31337 (default Anvil chainId)
Currency Symbol: ETH
```

## 2. Import Test Accounts
Use the private keys displayed when starting Anvil:

# Anvil startup output shows test accounts:
```shell
Accounts:
[0] 0xf39Fd... (10000 ETH)
Private Key: 0xac0974...
```

**Steps:**

1. In MetaMask:
   - Click account icon → "Import Account"
   - Paste a private key from Anvil's output

## 3. Troubleshooting

- Chain ID Errors: Ensure MetaMask shows 31337 (Anvil's default)
- Reset Account: In MetaMask → Settings → Advanced → "Reset Account" if TXs stall
- Gas Fees: Use anvil --block-base-fee-per-gas 0 for zero gas costs during dev
