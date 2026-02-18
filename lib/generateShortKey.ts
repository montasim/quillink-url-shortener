import { customAlphabet } from 'nanoid';

// Alphanumeric alphabet for short keys
const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

// Default length for short keys
const DEFAULT_LENGTH = 7;

// Create nanoid instance (cached for performance)
const nanoid = customAlphabet(ALPHABET, DEFAULT_LENGTH);

/**
 * Generate a unique short key
 * @param length - Optional custom length (default: 7)
 * @returns A unique short key string
 */
export function generateShortKey(length?: number): string {
    if (length && length !== DEFAULT_LENGTH) {
        return customAlphabet(ALPHABET, length)();
    }
    return nanoid();
}
