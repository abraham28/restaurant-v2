/**
 * Cryptographic utilities for secure token storage
 * Uses Web Crypto API for encryption/decryption
 */

import { ENCRYPTION_CONSTANTS } from './constants';

// Destructure constants for easier use
const { APP_SALT, USER_SEED_KEY } = ENCRYPTION_CONSTANTS;

/**
 * Generate a random user seed and store it in localStorage
 * This seed is unique per device/user
 */
export function generateUserSeed(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  // Convert to base64url for storage (32 bytes is small, so spread is safe)
  const base64 = btoa(String.fromCharCode(...Array.from(array)));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

/**
 * Get or generate user seed from localStorage
 */
export function getUserSeed(): string {
  let seed = localStorage.getItem(USER_SEED_KEY);
  if (!seed) {
    seed = generateUserSeed();
    localStorage.setItem(USER_SEED_KEY, seed);
  }
  return seed;
}

/**
 * Derive encryption key from app salt and user seed
 * Uses PBKDF2 to derive a key suitable for AES-GCM
 */
async function deriveKey(salt: string, seed: string): Promise<CryptoKey> {
  if (!crypto.subtle) {
    throw new Error(
      'crypto.subtle is not available. Encryption requires a secure context (HTTPS or localhost).',
    );
  }

  // Combine app salt and user seed
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(salt + seed),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey'],
  );

  // Derive key using PBKDF2
  const derivedKey = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode(salt),
      iterations: 100000, // High iteration count for security
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );

  return derivedKey;
}

/**
 * Encrypt data using AES-GCM
 * @param data - Plain text data to encrypt
 * @returns Encrypted data as base64 string (includes IV)
 */
export async function encrypt(data: string): Promise<string> {
  if (!crypto.subtle) {
    throw new Error(
      'crypto.subtle is not available. Encryption requires a secure context (HTTPS or localhost).',
    );
  }

  const userSeed = getUserSeed();
  const key = await deriveKey(APP_SALT, userSeed);

  // Generate random IV (Initialization Vector)
  const iv = crypto.getRandomValues(new Uint8Array(12)); // 12 bytes for AES-GCM

  // Encrypt the data
  const encoder = new TextEncoder();
  const encrypted = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    key,
    encoder.encode(data),
  );

  // Combine IV and encrypted data, then convert to base64
  const combined = new Uint8Array(iv.length + encrypted.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(encrypted), iv.length);

  // Convert Uint8Array to string in chunks to avoid stack overflow
  let binaryString = '';
  const chunkSize = 8192; // Process in 8KB chunks
  for (let i = 0; i < combined.length; i += chunkSize) {
    const chunk = combined.slice(i, i + chunkSize);
    binaryString += String.fromCharCode.apply(null, Array.from(chunk));
  }

  const base64 = btoa(binaryString);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

/**
 * Decrypt data using AES-GCM
 * @param encryptedData - Encrypted data as base64 string (includes IV)
 * @returns Decrypted plain text data
 */
export async function decrypt(encryptedData: string): Promise<string> {
  if (!crypto.subtle) {
    throw new Error(
      'crypto.subtle is not available. Decryption requires a secure context (HTTPS or localhost).',
    );
  }

  const userSeed = getUserSeed();
  const key = await deriveKey(APP_SALT, userSeed);

  // Convert from base64url to Uint8Array
  const base64 = encryptedData.replace(/-/g, '+').replace(/_/g, '/');
  const combined = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

  // Extract IV (first 12 bytes) and encrypted data
  const iv = combined.slice(0, 12);
  const encrypted = combined.slice(12);

  // Decrypt the data
  const decrypted = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    key,
    encrypted,
  );

  // Convert decrypted data to string
  const decoder = new TextDecoder();
  return decoder.decode(decrypted);
}

/**
 * Clear user seed from localStorage
 * This should be called on logout
 */
export function clearUserSeed(): void {
  localStorage.removeItem(USER_SEED_KEY);
}
