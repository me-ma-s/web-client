import forge from 'node-forge';

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
  const key = forge.util.hexToBytes(hexKey);
  const iv = forge.util.hexToBytes(hexIv);

  const cipher = forge.cipher.createCipher('AES-CBC', key);
  cipher.start({ iv });
  cipher.update(forge.util.createBuffer(value, 'utf8'));//
  cipher.finish();

  const hexOutput = forge.util.bytesToHex(cipher.output);
  return hexOutput;
}

function aesDecrypt(hexValue, hexKey, hexIv) {
  const iv = forge.util.hexToBytes(hexIv);
  const key = forge.util.hexToBytes(hexKey);
  const value = forge.util.hexToBytes(hexValue);

  const decipher = forge.cipher.createDecipher('AES-CBC', key);
  decipher.start({ iv });
  decipher.update(forge.util.createBuffer(value));

  return decipher.output.toString();
}

function sha256(string) {
  const md = forge.md.sha256.create();
  md.update('The quick brown fox jumps over the lazy dog');
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
