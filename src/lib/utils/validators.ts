// ─── Temporary email domains to block ───
export const TEMP_EMAIL_DOMAINS = [
  'mailinator.com',
  'guerrillamail.com',
  '10minutemail.com',
  'tempmail.com',
  'temp-mail.org',
  'trashmail.com',
  'yopmail.com',
  'mailnesia.com',
  'spamgourmet.com',
  'throwawayemail.com',
  'getnada.com',
  'maildrop.cc',
  'mintemail.com',
  'spambox.us',
  'tempmail.net',
  'fakeinbox.com',
  'mytemp.email',
  'burnermail.io',
  'guerrillamail.net',
  'guerrillamail.biz',
  'mailinator.net',
  'mailinator.org',
  'mailinator.me',
]

export const validators = {
  email: (email: string): { valid: boolean; message?: string } => {
    const trimmed = email.trim()
    if (!trimmed) return { valid: false, message: 'Email is required' }

    // Basic email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmed)) {
      return { valid: false, message: 'Invalid email format' }
    }

    // Block plus aliases (e.g., user+spam@gmail.com)
    if (trimmed.includes('+')) {
      return { valid: false, message: 'Email aliases (+ sign) are not allowed' }
    }

    const domain = trimmed.split('@')[1].toLowerCase()
    const localPart = trimmed.split('@')[0].toLowerCase()

    // Block temporary email domains
    if (TEMP_EMAIL_DOMAINS.includes(domain)) {
      return { valid: false, message: 'Temporary email addresses are not allowed' }
    }

    // Gmail dot trick: block dots in local part for Gmail/Googlemail
    if (domain === 'gmail.com' || domain === 'googlemail.com') {
      if (localPart.includes('.')) {
        return { valid: false, message: 'Gmail addresses with dots are not allowed' }
      }
    }

    return { valid: true }
  },

  fullName: (name: string): boolean => {
    return name.trim().length >= 3 && /^[a-zA-Z\s]+$/.test(name.trim())
  },

  password: (password: string): boolean => {
    return password.length >= 8
  },
}