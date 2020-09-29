import forge from 'node-forge'
import {
  generateRsaKeyPair,
  rsaEncrypt,
  rsaDecrypt,

  generateAesKey,
  generateUserKey,
  generatePwdKey,
  aesEncrypt,
  aesDecrypt,
} from './lowLevelEncryption'

function testRsa() {
  const testString = 'Test passed: RSA'
  const keyPair = generateRsaKeyPair()
  const result = rsaDecrypt(rsaEncrypt(testString, keyPair.pubKey), keyPair.privKey)

  console.log(result)
}

function testAes() {
  const testString = 'Test passed: AES'
  const key = forge.random.getBytesSync(32)
  const iv = forge.random.getBytesSync(32)

  const enc = aesEncrypt(testString, key, iv)
  const dec = aesDecrypt(enc, key, iv)
  console.log(dec)
}

function testUserKey() {
  const testString = 'Test passed: UserKey'
  const key = generateUserKey()
  const iv = forge.random.getBytesSync(32)

  const enc = aesEncrypt(testString, key, iv)
  const dec = aesDecrypt(enc, key, iv)
  console.log(dec)
}


function testPwdKey(login, password) {
  const testString = 'Test passed: pwdKey'
  const key = generatePwdKey(login, password)
  const iv = forge.random.getBytesSync(32)

  const enc = aesEncrypt(testString, key, iv)
  const dec = aesDecrypt(enc, key, iv)
  console.log(dec)
}

function testRsaOfAes() {
  const testString = 'Test passed: Rsa(Aes)'

  const rsaKeyPair = generateRsaKeyPair()
  const aesKey = generateAesKey()
  const iv = forge.random.getBytesSync(32)

  const encStr = aesEncrypt(testString, aesKey, iv)
  const encAesKey = rsaEncrypt(aesKey, rsaKeyPair.pubKey)
  const decAesKey = rsaDecrypt(encAesKey, rsaKeyPair.privKey)
  const decStr = aesDecrypt(encStr, decAesKey, iv)
  console.log(decStr)
}

function testAesOfRsa() {
  const testString = 'Test passed: Aes(Rsa)'

  const rsaKeyPair = generateRsaKeyPair()
  const aesKey = generateAesKey()
  const iv = forge.random.getBytesSync(32)

  const encStr = rsaEncrypt(testString, rsaKeyPair.pubKey)
  const encPrivate = aesEncrypt(rsaKeyPair.privKey, aesKey, iv)
  const decPrivate = aesDecrypt(encPrivate, aesKey, iv)
  const decStr = rsaDecrypt(encStr, decPrivate)

  console.log(decStr)
}


export { testRsa, testAes, testUserKey, testPwdKey, testRsaOfAes, testAesOfRsa }
