import {
  generateRsaKeyPair,
  rsaEncrypt,
  rsaDecrypt,

  generatePwdKey,
  generateUserKey,
  generateChannelKey,
  generateIv,
  aesEncrypt,
  aesDecrypt,

  sha256
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
  if (message.iv && channelKey) {
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
  // Подумал. Похоже, цифровая подпись не нужна. Вместо нее будем шифровать.
  return generateRsaKeyPair();
}

function encryptUserKey(userKey, pwdKey, iv) {
  return aesEncrypt(userKey, pwdKey, iv);
}

function decryptUserKey(userKey, pwdKey, iv) {
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

function generateEmailPassHash(email, password) {
  return sha256(email + ':' + password);
}

function step1_genKeyPair() {
  return generateRsaKeyPair();
}

function step1_genBody(userKey, keyPair) {
  const iv = generateIv();
  return {
    iv,
    _privKey: aesEncrypt(keyPair.privKey, userKey, iv)
  }
}

function step1_genInvitation({ id, user_id, _priv_key }, keyPair) {
  return JSON.stringify({ id, pubKey: keyPair.pubKey });
}

function step2_genBody(inviteStr, userKey) {
  const iv = generateIv();
  const { id, pubkey } = JSON.parse(inviteStr);
  const connectionKey = generateAesKey();
  return {
    id,
    _accept_key: rsaEncrypt(connectionKey, pubkey),
    _own_key: aesEncrypt(connectionKey, userKey, iv),
    iv
  }
}

function step3_genBody({ id, user_id, friend_id, _contact_key, _priv_key, iv }, userKey) {
  const newIv = generateIv();
  const privKey = aesDecrypt(_priv_key, userKey, iv);
  const contact_key = rsaDecrypt(_contact_key, privKey);

  return {
    id,
    _contact_key: aesEncrypt(contact_key, userKey),
    iv: newIv
  }
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

  step1_genKeyPair,
  step1_genBody,
  step1_genInvitation,
  step2_genBody,
  step3_genBody,

  generateEmailPassHash
}
