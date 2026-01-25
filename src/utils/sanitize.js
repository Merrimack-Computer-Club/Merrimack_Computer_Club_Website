import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML content to prevent XSS attacks
 * @param {string} dirty - The potentially unsafe HTML string
 * @param {object} config - Optional DOMPurify configuration
 * @returns {string} - Sanitized HTML string
 */
export const sanitizeHtml = (dirty, config = {}) => {
  if (!dirty || typeof dirty !== 'string') {
    return '';
  }
  
  // Default configuration that allows safe HTML but removes scripts
  const defaultConfig = {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'blockquote', 'code', 'pre', 'ol', 'ul', 'li', 'a', 'span', 'div'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'style'],
    ALLOW_DATA_ATTR: false,
    ...config
  };
  
  return DOMPurify.sanitize(dirty, defaultConfig);
};

/**
 * Sanitizes plain text input by removing HTML tags
 * @param {string} input - The input string
 * @returns {string} - Sanitized plain text
 */
export const sanitizeText = (input) => {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  // Remove all HTML tags for plain text fields
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
};

/**
 * Validates and sanitizes email addresses
 * @param {string} email - Email address to validate
 * @returns {string|null} - Sanitized email or null if invalid
 */
export const sanitizeEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return null;
  }
  
  const trimmedEmail = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(trimmedEmail)) {
    return null;
  }
  
  return sanitizeText(trimmedEmail);
};

/**
 * Validates Merrimack email addresses
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid Merrimack email
 */
export const isValidMerrimackEmail = (email) => {
  const sanitized = sanitizeEmail(email);
  if (!sanitized) {
    return false;
  }
  
  return sanitized.endsWith('@merrimack.edu');
};

/**
 * Sanitizes database path components to prevent injection
 * @param {string} path - Path component to sanitize
 * @returns {string} - Sanitized path
 */
export const sanitizeDatabasePath = (path) => {
  if (!path || typeof path !== 'string') {
    return '';
  }
  
  // Remove special Firebase characters and ensure safe path
  // Firebase doesn't allow: . $ # [ ] /
  return path
    .replace(/[.$#[\]/]/g, '_')
    .trim()
    .substring(0, 200); // Limit length
};

/**
 * Validates URL format
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid URL
 */
export const isValidUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return false;
  }
  
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Sanitizes an array of URLs
 * @param {string|Array} resources - Comma-separated string or array of URLs
 * @returns {Array} - Array of valid URLs
 */
export const sanitizeResources = (resources) => {
  if (!resources) {
    return [];
  }
  
  // Convert to array if string
  const resourceArray = Array.isArray(resources) 
    ? resources 
    : resources.split(',').map(r => r.trim());
  
  // Filter and validate URLs
  return resourceArray
    .filter(url => url && url.length > 0)
    .filter(isValidUrl)
    .slice(0, 20); // Limit to 20 resources
};
