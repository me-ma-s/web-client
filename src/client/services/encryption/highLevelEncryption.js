import {
  generateRsaKeyPair,
  rsaEncrypt,
  rsaDecrypt,

  generatePwdKey,
  generateUserKey,
  generateChannelKey,
  generateIv,
  aesEncrypt,
  aesDecrypt
} from './lowLevelEncryption';

function encryptMsg(message, channelKey) {
  if (channelKey) {
    message.iv = generateIv();
    message._text = aesEncrypt(message.text, channelKey, message.iv);
  } else {
    message._text = message.text;
  }
  delete message.text;
  return message;
}

function decryptMsg(message, channelKey) {
  if (message.iv) {
    message.text = aesDecrypt(message._text, channelKey, message.iv);
  } else {
    message.text = message._text;
  }
  delete message._text;
  return message;
}

function generateAsymKeyPair() {
  return generateRsaKeyPair();
}

function generateSignKeyPair() {
  // TODO: подумать над цифровой подписью
  return generateRsaKeyPair();
}

function encryptUserKey(userKey, pwdKey, iv) {
  // TODO: подумать над iv
  if (!iv) throw Error('iv undefined')
  return aesEncrypt(userKey, pwdKey, iv);
}

function decryptUserKey(userKey, pwdKey, iv) {
  if (!iv) throw Error('iv undefined')
  return aesDecrypt(userKey, pwdKey, iv);
}

function encryptChannelKey(channelKey, pubKey) {
  return rsaEncrypt(channelKey, pubKey);
}

function decryptChannelKey(channelKey, privKey) {
  return rsaDecrypt(channelKey, privKey);
}

function encryptKeyPair(keypair, userKey) {
  throw Error('Функция еще не реализована');
}

function decryptKeyPair(keypair, userKey) {
  throw Error('Функция еще не реализована');
}


export {
  generatePwdKey,
  generateUserKey,
  generateChannelKey,
  generateAsymKeyPair,
  generateSignKeyPair,

  encryptMsg,
  decryptMsg,

  encryptUserKey,
  decryptUserKey,
  encryptChannelKey,
  decryptChannelKey,
  encryptKeyPair,
  decryptKeyPair,
}
