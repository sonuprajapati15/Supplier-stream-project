package com.travel.supplier.encode;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.zip.GZIPOutputStream;
import java.io.*;

public class Encryptor {

    private static final String SECRET = "1234567890123456"; // 16-char key for AES-128

    public static String encryptAndCompress(String json) {
        try {
            // Step 1: AES Encryption
            SecretKeySpec key = new SecretKeySpec(SECRET.getBytes(), "AES");
            Cipher cipher = Cipher.getInstance("AES");
            cipher.init(Cipher.ENCRYPT_MODE, key);
            byte[] encrypted = cipher.doFinal(json.getBytes());

            // Step 2: GZIP Compression
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            try (GZIPOutputStream gzipOut = new GZIPOutputStream(baos)) {
                gzipOut.write(encrypted);
            }

            // Step 3: Base64 encode
            String base64 = Base64.getEncoder().encodeToString(baos.toByteArray());
            return "data:" + base64 + "\n\n";
        }catch (Exception e) {
            e.printStackTrace();
        }
        return "event:error";
    }
}