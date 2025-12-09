// Password verification for NextAuth credentials provider
// Uses bcrypt for secure password hashing

import bcrypt from 'bcryptjs'

// Get password from environment variable
// If ADMIN_PASSWORD is a bcrypt hash (starts with $2a$ or $2b$), use hashed verification
// Otherwise, fallback to plain text for backward compatibility (NOT RECOMMENDED for production)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

// Pre-generated hash for "admin123" (for default/development)
// Generated with: bcrypt.hashSync('admin123', 10)
// This hash is used when ADMIN_PASSWORD is not set or is 'admin123'
const DEFAULT_HASH = '$2b$10$CKMbEBvbPdwBa/xCX.S0XectyL9X92bRdqI87.WvgClrKyvL/j3DK'

/**
 * Verifies a password against the stored password (hashed or plain text)
 * @param password - The password to verify
 * @returns Promise<boolean> - True if password matches
 */
export async function verifyPassword(password: string): Promise<boolean> {
  // Check if ADMIN_PASSWORD is a bcrypt hash (starts with $2a$ or $2b$)
  const isHashed = ADMIN_PASSWORD.startsWith('$2a$') || ADMIN_PASSWORD.startsWith('$2b$')
  
  if (isHashed) {
    // Use bcrypt to compare password with hash
    return await bcrypt.compare(password, ADMIN_PASSWORD)
  }
  
  // Fallback to plain text comparison (for backward compatibility)
  // WARNING: This is insecure and should only be used during migration
  // In production, always use hashed passwords
  if (ADMIN_PASSWORD === 'admin123') {
    // For default password, use the pre-generated hash
    return await bcrypt.compare(password, DEFAULT_HASH)
  }
  
  // Plain text comparison (NOT RECOMMENDED)
  return password === ADMIN_PASSWORD
}

