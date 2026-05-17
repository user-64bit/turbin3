import { Connection, Keypair } from "@solana/web3.js";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from "@solana/spl-token";
import { readFileSync } from "fs";

const secret = JSON.parse(readFileSync("wallet.json", "utf-8"));
const keypair = Keypair.fromSecretKey(new Uint8Array(secret));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const DECIMALS = 6;

console.log("Creating the SPL token mint...");
const mint = await createMint(
  connection,
  keypair,
  keypair.publicKey,
  keypair.publicKey,
  DECIMALS
);
console.log("Mint address:", mint.toBase58());


console.log("Creating the associated token account...");
const ata = await getOrCreateAssociatedTokenAccount(
  connection,
  keypair,
  mint,
  keypair.publicKey
);
console.log("Token account:", ata.address.toBase58());


const amount = 1000;
console.log(`Minting ${amount} tokens...`);
await mintTo(
  connection,
  keypair,
  mint,
  ata.address,
  keypair.publicKey,
  amount * 10 ** DECIMALS
);

console.log("Done! Minted", amount, "tokens.");
console.log(
  "View the mint:",
  `https://explorer.solana.com/address/${mint.toBase58()}?cluster=devnet`
);
