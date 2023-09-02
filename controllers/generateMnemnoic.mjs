("use strict");
import bip39 from "bip39";

export const generateMnemonic = (req, res) => {
  try {
    const mnemonic = bip39.generateMnemonic();

    res.send(mnemonic);
  } catch (error) {
    res.send(error);
  }
};
