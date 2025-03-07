/* eslint-disable new-cap */
import CryptoJS from 'crypto-js';

const decryptCFBMode = (key: string, data: string) => {
  if (!data) return;

  // Decrypt AES CFB Mode
  const Base64Data = CryptoJS.enc.Base64.parse(data);

  const iv = new CryptoJS.lib.WordArray.init(Base64Data.words.slice(0, 4));
  const encrypted = new CryptoJS.lib.WordArray.init(Base64Data.words.slice(4), Base64Data.sigBytes - 16);
  const cipher = CryptoJS.lib.CipherParams.create({ciphertext: encrypted});

  const decrypted = CryptoJS.AES.decrypt(cipher, CryptoJS.enc.Utf8.parse(key), {
    iv: iv,
    mode: CryptoJS.mode.CFB,
    padding: CryptoJS.pad.NoPadding,
  });

  return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
};

export {
  decryptCFBMode,
};
