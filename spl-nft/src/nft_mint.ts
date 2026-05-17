import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createGenericFile,
  generateSigner,
  keypairIdentity,
} from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { create, ruleSet } from "@metaplex-foundation/mpl-core";
import { readFileSync } from "fs";

const umi = createUmi("https://api.devnet.solana.com").use(irysUploader());

const secret = JSON.parse(readFileSync("wallet.json", "utf-8"));
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secret));
umi.use(keypairIdentity(keypair));

console.log("Wallet:", umi.identity.publicKey);

console.log("Uploading image to Irys...");
const imageBytes = readFileSync("assets/gojo.png");
const imageFile = createGenericFile(new Uint8Array(imageBytes), "gojo.png", {
  contentType: "image/png",
});
const [imageUri] = await umi.uploader.upload([imageFile]);
console.log("Image URI:", imageUri);

console.log("Uploading metadata to Irys...");
const metadataUri = await umi.uploader.uploadJson({
  name: "Gojo Satoru",
  description: "JJK",
  image: imageUri,
  attributes: [{ trait_type: "JJK", value: "JJK" }],
});
console.log("Metadata URI:", metadataUri);

const asset = generateSigner(umi);
console.log("Minting Core NFT:", asset.publicKey);

await create(umi, {
  asset,
  name: "Gojo Satoru",
  uri: metadataUri,
  plugins: [
    {
      type: "Royalties",
      basisPoints: 500, // 5% royalty
      creators: [{ address: umi.identity.publicKey, percentage: 100 }],
      ruleSet: ruleSet("None"),
    },
  ],
}).sendAndConfirm(umi);

console.log("NFT minted successfully!");
console.log(
  "View it:",
  `https://explorer.solana.com/address/${asset.publicKey}?cluster=devnet`
);
