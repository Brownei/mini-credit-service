import * as crypto from "crypto";

export class EncryptionService {
  private readonly IV_LENGTH = 16; // AES block size
  private readonly ALGORITHM = "aes-256-gcm";

  private getKey(): Buffer {
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined in environment variables");
    }

    return crypto
      .createHash("sha256")
      .update(process.env.SECRET_KEY)
      .digest(); // Always 32 bytes
  }

  encrypt(text: string): string {
    const key = this.getKey();
    const iv = crypto.randomBytes(this.IV_LENGTH);

    const cipher = crypto.createCipheriv(this.ALGORITHM, key, iv);

    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    const authTag = cipher.getAuthTag().toString("hex");

    // Format: iv:tag:ciphertext
    return `${iv.toString("hex")}:${authTag}:${encrypted}`;
  }

  decrypt(encryptedString: string): string {
    const key = this.getKey();
    const [ivHex, tagHex, content] = encryptedString.split(":");

    if (!ivHex || !tagHex || !content) {
      throw new Error("Invalid encrypted string format");
    }

    const decipher = crypto.createDecipheriv(
      this.ALGORITHM,
      key,
      Buffer.from(ivHex, "hex")
    );

    decipher.setAuthTag(Buffer.from(tagHex, "hex"));

    let decrypted = decipher.update(content, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  }
}

