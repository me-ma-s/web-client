import forge from 'node-forge';
import hexyjs from 'hexyjs';

// TODO: Разобраться, что такое 'e'
// TODO: сделать генерацию ключей асинхронной
function generateRsaKeyPair() {
  const keyPair = forge.rsa.generateKeyPair({ bits: 2048, e: 0x10001 });
  const privKey = forge.pki.privateKeyToPem(keyPair.privateKey);
  const pubKey = forge.pki.publicKeyToPem(keyPair.publicKey);
  return { privKey, pubKey };
}

function rsaEncrypt(value, pubKey) {
  const pub = forge.pki.publicKeyFromPem(pubKey);
  return pub.encrypt(value);
}

function rsaDecrypt(value, privKey) {
  const priv = forge.pki.privateKeyFromPem(privKey);
  return priv.decrypt(value);
}

function generatePwdKey(login, password) {
  const numIterations = 10 * 1000;
  let pwdKey = forge.pkcs5.pbkdf2(password, login, numIterations, 32);
  return forge.util.bytesToHex(pwdKey);
}

function getIv() {
  return forge.util.bytesToHex(forge.random.getBytesSync(32));
}

function generateAesKey() {
  return forge.util.bytesToHex(forge.random.getBytesSync(32));
}


function generateUserKey() {
  return generateAesKey();
}

function generateChannelKey() {
  return generateAesKey();
}




// TODO: оптимизировать, не создавая 'cipher' каждый раз

function aesEncrypt(value, hexKey, hexIv) {
  const key = forge.util.hexToBytes(hexKey);
  const iv = forge.util.hexToBytes(hexIv);

  const cipher = forge.cipher.createCipher('AES-CBC', key);
  cipher.start({ iv });
  // cipher.update(value);
  cipher.update(forge.util.createBuffer(value));
  cipher.finish();
  const hexOutput = forge.util.bytesToHex(cipher.output);
  return hexOutput;
}


/*  TODO: подумать, как передавать iv. 
    Возможно, стоит сделать расшифровку сообщений отдельной функцией */
function aesDecrypt(hexValue, hexKey, hexIv) {
  const iv = forge.util.hexToBytes(hexIv);
  const key = forge.util.hexToBytes(hexKey);
  const value = forge.util.hexToBytes(hexValue);

  let decipher = forge.cipher.createDecipher('AES-CBC', key);
  decipher.start({ iv });
  decipher.update(forge.util.createBuffer(value));
  // decipher.update(value);
  let result = decipher.finish(); // check 'result' for true/false
  const hex = decipher.output.toHex();
  return hexyjs.hexToStr(hex);
}


export {
  generateRsaKeyPair,
  rsaEncrypt,
  rsaDecrypt,

  generateAesKey,
  generatePwdKey,
  generateUserKey,
  generateChannelKey,
  getIv,
  aesEncrypt,
  aesDecrypt
}
