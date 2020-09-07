import {
  generateRsaKeyPair,
  rsaEncrypt,
  rsaDecrypt,

  generatePwdKey,
  generateUserKey,
  generateChannelKey,
  aesEncrypt,
  aesDecrypt
} from './lowLevelEncryption'

function encryptMsg(message, channelKey) {
  message.iv = forge.random.getBytesSync(32);
  message._text = aesEncrypt(message.text, channelKey, message.iv)
  delete message.text
  return message
}

function decryptMsg(message, channelKey) {
  message.text = aesDecrypt(message._text, channelKey, message.iv)
  delete message._text
  return message
}

function generateAsymKeyPair() {
  return generateRsaKeyPair()
}

function generateSignKeyPair() {
  // TODO: подумать над цифровой подписью
  return generateRsaKeyPair()
}

function encryptUserKey(userKey, pwdKey) {
  // TODO: подумать над iv
  return aesEncrypt(userKey, pwdKey)
}

function decryptUserKey(userKey, pwdKey) {
  return aesDecrypt(userKey, pwdKey)
}

function encryptChannelKey(channelKey, pubKey) {
  return rsaEncrypt(channelKey, pubKey)
}

function decryptChannelKey(channelKey, privKey) {
  return rsaDecrypt(channelKey, privKey)
}

// TODO: понять, нужна ли эта функция
function encryptSubchannelKey(childChannelKey, parantChannelKey) {
  return aesEncrypt(childChannelKey, parantChannelKey)
}

// TODO: понять, нужна ли эта функция
function decryptSubchannelKey(childChannelKey, parantChannelKey) {
  return aesDecrypt(childChannelKey, parantChannelKey)
}

function encryptKeyPair(keypair, userKey) {
  throw Error('Функция еще не реализована')
}

function decryptKeyPair(keypair, userKey) {
  throw Error('Функция еще не реализована')
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
  encryptSubchannelKey,
  decryptSubchannelKey,
  encryptKeyPair,
  decryptKeyPair,
}