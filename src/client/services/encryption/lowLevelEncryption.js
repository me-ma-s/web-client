import forge from 'node-forge';

// TODO: Вспомнить, что такое 'e'
// TODO: сделать генерацию ключей асинхронной
function generateRsaKeyPair() {
  const keyPair = forge.rsa.generateKeyPair({ bits: 2048, e: 0x10001 });
  const privKey = forge.pki.privateKeyToPem(keyPair.privateKey);
  const pubKey = forge.pki.publicKeyToPem(keyPair.publicKey);
  return { privKey, pubKey };
}

function rsaEncrypt(value, pubKey) {
  if (!value) throw new Error('value undefined')
  if (!pubKey) throw new Error('pubKey undefined')
  const pub = forge.pki.publicKeyFromPem(pubKey);
  return pub.encrypt(value);
}

function rsaDecrypt(value, privKey) {
  if (!value) throw new Error('value undefined')
  if (!privKey) throw new Error('privKey undefined')
  const priv = forge.pki.privateKeyFromPem(privKey);
  return priv.decrypt(value);
}

function generatePwdKey(login, password) {
  if (!login) throw new Error('login undefined')
  if (!password) throw new Error('password undefined')

  const numIterations = 10000;
  const pwdKey = forge.pkcs5.pbkdf2(password, login, numIterations, 32);
  return forge.util.bytesToHex(pwdKey);
}

function generateIv() {
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


function aesEncrypt(value, hexKey, hexIv) {
  if (!value) throw Error('value undefined');
  if (!hexIv) throw Error('iv undefined');
  if (!hexKey) throw Error('hexKey undefined');

  const key = forge.util.hexToBytes(hexKey);
  const iv = forge.util.hexToBytes(hexIv);

  const cipher = forge.cipher.createCipher('AES-CBC', key);
  cipher.start({ iv });
  cipher.update(forge.util.createBuffer(value, 'utf8'));
  cipher.finish();

  const hexOutput = forge.util.bytesToHex(cipher.output);
  return hexOutput;
}

function aesDecrypt(hexValue, hexKey, hexIv) {
  if (!hexValue) throw Error('hexValue undefined');
  if (!hexIv) throw Error('iv undefined');
  if (!hexKey) throw Error('hexKey undefined');

  const iv = forge.util.hexToBytes(hexIv);
  const key = forge.util.hexToBytes(hexKey);
  const value = forge.util.hexToBytes(hexValue);

  const decipher = forge.cipher.createDecipher('AES-CBC', key);
  decipher.start({ iv });
  decipher.update(forge.util.createBuffer(value));

  const ret = decipher.output.toString().replace(/\u0010/g, '');
  
  return ret;
}

function sha256(str) {
  if (!str) throw new Error('str undefined')
  const md = forge.md.sha256.create();
  md.update(str);
  return md.digest().toHex();
}


export {
  generateRsaKeyPair,
  rsaEncrypt,
  rsaDecrypt,

  generateAesKey,
  generatePwdKey,
  generateUserKey,
  generateChannelKey,
  generateIv,
  aesEncrypt,
  aesDecrypt,

  sha256
}
