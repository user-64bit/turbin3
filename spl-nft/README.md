# Assignment 2 (Pre-Builder): SPL & NFT

Turbin3 Pre-Builder assignment — mint an SPL token and an MPL Core NFT on
Solana devnet.

## What this does

- Mints my own SPL token (6 decimals, 1000 supply).
- Mints an NFT using **MPL Core**.
- Attaches the **Royalties** core plugin to the NFT (5% / 500 basis points).

## Tech stack

- TypeScript, run with [Bun](https://bun.sh)
- `@solana/web3.js` + `@solana/spl-token` — SPL token
- `@metaplex-foundation/umi` + `@metaplex-foundation/mpl-core` — Core NFT
- `@metaplex-foundation/umi-uploader-irys` — image/metadata upload to Irys

## Setup

```bash
bun install
```

## Create and fund a devnet wallet

The scripts read the wallet from `wallet.json` in this folder.

```bash
# generate a keypair
solana-keygen new --no-bip39-passphrase --outfile wallet.json

# point the Solana CLI at devnet + this wallet
solana config set --url devnet --keypair wallet.json

# fund it with devnet SOL
solana airdrop 2
```

If `solana airdrop` is rate-limited, fund the address shown by
`solana address` at https://faucet.solana.com (cluster: Devnet).

> `wallet.json` is gitignored — it holds a secret key and is never committed.

## Run the scripts

```bash
bun run spl   # create the SPL mint + token account, mint 1000 tokens
bun run nft   # upload image + metadata to Irys, mint the Core NFT
```

## Results (Solana devnet)

- **Wallet:** `ABG5mU1PzvKzWy4QfH2gFjE4iXjrdHBppwyrZtqtXwsk`
- **SPL token mint:** `DJsWuc7pCckqdgtxPPWJCxgZRmLSmJjvAYJScMuDPhrb`
  - https://explorer.solana.com/address/DJsWuc7pCckqdgtxPPWJCxgZRmLSmJjvAYJScMuDPhrb?cluster=devnet
- **MPL Core NFT asset:** `DrF4awPEZU1qWess9WaqpdtrQgG2yuYU7tZZss4SQKLe`
  - https://explorer.solana.com/address/DrF4awPEZU1qWess9WaqpdtrQgG2yuYU7tZZss4SQKLe?cluster=devnet
- **Core plugin used:** Royalties — 5% (500 basis points), creator 100%, ruleSet None
