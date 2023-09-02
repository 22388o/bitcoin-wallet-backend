"use strict";
// const ECPairFactory = require("ecpair");
import { ECPairFactory } from "ecpair";
// const ecc = require("tiny-secp256k1");
import * as ecc from "tiny-secp256k1";
import * as bitcoin from "bitcoinjs-lib";
// const bitcoin = require("bitcoinjs-lib");
import { BIP32Factory } from "bip32";
// const BIP32Factory = require("bip32");
import * as bip39 from "bip39";
// const bip39 = require("bip39");

const bip32 = BIP32Factory(ecc);

const ecpair = ECPairFactory(ecc);
const MAINNET = bitcoin.networks.bitcoin;

export const generateAddress = (req, res) => {
  const mnemonic =
    "input kind sister rabbit lawsuit risk struggle humble cruise borrow glad screen";
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const node = bip32.fromSeed(seed);
  const strng = node.toBase58();
  const restored = bip32.fromBase58(strng);

  const address = getAddress(node);
  const test = getAddress(restored);

  res.send(address);
};

function getAddress(node) {
  return bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    MAINNET,
  }).address;
}
