import pako from "pako";
import CryptoJS from "crypto-js";

const SECRET = "1234567890123456"; // Must match Java key

export function decryptAndDecompress(base64Str) {
    // Step 1: Base64 decode
    const compressedEncryptedBytes = Uint8Array.from(atob(base64Str), c => c.charCodeAt(0));

    // Step 2: GZIP decompress
    const encryptedBytes = pako.ungzip(compressedEncryptedBytes);

    // Step 3: AES decrypt
    const wordArray = CryptoJS.lib.WordArray.create(encryptedBytes);
    const decrypted = CryptoJS.AES.decrypt({ ciphertext: wordArray }, CryptoJS.enc.Utf8.parse(SECRET), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    });

    // Step 4: Convert to string
    return decrypted.toString(CryptoJS.enc.Utf8);
}
