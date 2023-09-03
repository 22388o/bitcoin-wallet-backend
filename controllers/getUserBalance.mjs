"use strict";
// const ECPairFactory = require("ecpair");
// import { ECPairFactory } from "ecpair";
// const ecc = require("tiny-secp256k1");
import * as ecc from "tiny-secp256k1";
import * as bitcoin from "bitcoinjs-lib";
// const bitcoin = require("bitcoinjs-lib");
import { BIP32Factory } from "bip32";
// const BIP32Factory = require("bip32");
import * as bip39 from "bip39";
// const bip39 = require("bip39");
import mempoolJS from "@mempool/mempool.js";

const bip32 = BIP32Factory(ecc);

// const ecpair = ECPairFactory(ecc);
const MAINNET = bitcoin.networks.bitcoin;

export const getUserBalance = async (req, res) => {
  const data = req.body;
  try {
    const mnemonic = data.mnemonic;
    const numAddresses = data.numAddresses;

    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const root = bip32.fromSeed(seed);
    const derivationPath = "m/44'/0'/0'/0";

    let addressesInformation = [];

    for (let i = 0; i < numAddresses; i++) {
      const child = root.derivePath(`${derivationPath}/${i}`);

      const address = bitcoin.payments.p2pkh({
        pubkey: child.publicKey,
      }).address;

      const {
        bitcoin: { addresses },
      } = mempoolJS({
        hostname: "mempool.space",
      });

      const myAddress = await addresses.getAddress({ address });

      addressesInformation.push(myAddress);
    }

    res.send(JSON.stringify(addressesInformation));
  } catch {
    res.send(JSON.stringify("ERROR"));
  }
};
