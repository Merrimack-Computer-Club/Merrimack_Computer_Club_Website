# Security Best Practices and Implementation

## Overview

This document outlines the security measures implemented in the Merrimack Computer Club Website to protect against common web vulnerabilities and Firebase-specific security risks.

## Security Measures Implemented

### 1. Environment Variables for Sensitive Configuration

**Issue:** Firebase API keys and configuration were hardcoded in source code, making them publicly visible in the repository.

**Solution:** 
- Moved all Firebase configuration to environment variables
- Created `.env.example` template for developers
- Actual `.env` file is gitignored to prevent accidental commits

**Setup:**
1. Copy `.env.example` to `.env`
2. Fill in your Firebase project credentials
3. For production deployment, set environment variables in your hosting platform

**Files:**
- `.env.example` - Template with placeholder values
- `src/pages/firebaseConfig.js` - Updated to use environment variables

### 2. Firebase Security Rules

**Issue:** No database security rules were defined, potentially allowing unauthorized read/write access.

**Solution:**
- Created comprehensive Firebase Realtime Database security rules
- Implemented authentication requirements for all operations
- Added validation rules for data structure and content
- Restricted write access based on user ownership

**Key Rules:**
- **Authentication Required:** All read/write operations require authentication
- **Email Validation:** Only @merrimack.edu emails are allowed
- **Ownership Verification:** Users can only edit their own content
- **Input Validation:** Field length limits and type checking
- **Data Structure Enforcement:** Required fields validation

**Files:**
- `database.rules.json` - Firebase security rules
- `firebase.json` - Updated to include rules deployment

**Deployment:**
```bash
firebase deploy --only database
```

### 3. Input Sanitization

**Issue:** User-generated content (posts, comments) was not sanitized, creating XSS vulnerabilities.

**Solution:**
- Integrated DOMPurify for HTML sanitization
- Created utility functions for different types of input
- Sanitize all user inputs before storage and display

**Functions Available:**
- `sanitizeHtml()` - For rich text content (allows safe HTML tags)
- `sanitizeText()` - For plain text (removes all HTML)
- `sanitizeEmail()` - Email validation and sanitization
- `sanitizeDatabasePath()` - Prevents Firebase path injection
- `sanitizeResources()` - Validates and filters URL arrays

**Files:**
- `src/utils/sanitize.js` - Sanitization utilities

**Usage Example:**
```javascript
import { sanitizeHtml, sanitizeText } from '../utils/sanitize';

// Sanitize rich text content
const cleanHtml = sanitizeHtml(userInput);

// Sanitize plain text
const cleanText = sanitizeText(userInput);
```

### 4. Database Path Security

**Issue:** User input was directly used in Firebase database paths, creating injection risks.

**Solution:**
- Sanitize all path components before database operations
- Remove Firebase special characters (. $ # [ ] /)
- Limit path component length

**Implementation:**
Use `sanitizeDatabasePath()` when constructing database paths with user input.

## Security Checklist for Developers

### Before Committing Code:

- [ ] Never commit `.env` files
- [ ] Check that no API keys or secrets are in code
- [ ] Sanitize all user inputs before database operations
- [ ] Validate email addresses for @merrimack.edu domain
- [ ] Use environment variables for configuration

### Before Deploying:

- [ ] Ensure environment variables are set in hosting platform
- [ ] Deploy Firebase security rules: `firebase deploy --only database`
- [ ] Test authentication flows
- [ ] Verify that unauthorized users cannot access protected resources
- [ ] Check that users can only edit their own content

### When Adding New Features:

- [ ] Use sanitization utilities for all user inputs
- [ ] Add appropriate Firebase security rules
- [ ] Implement client-side validation
- [ ] Consider what happens if authentication fails
- [ ] Test with different user roles/permissions

## Known Limitations

### Client-Side Security

**Current State:**
- Authorization checks (like `canEdit()`) are performed on the client side
- User identity stored in localStorage can be manipulated

**Mitigation:**
- Firebase Security Rules enforce server-side authorization
- Even if client-side checks are bypassed, Firebase rules prevent unauthorized operations
- Email verification in Firebase rules ensures users can only write with their own email

**Future Improvements:**
- Consider implementing Firebase Authentication instead of OAuth-only
- Add server-side validation via Firebase Cloud Functions
- Implement rate limiting for API operations

## Firebase Security Rules Explanation

### Users Node
```json
"users": {
  "$userId": {
    ".read": true,  // Public profiles (filtered by display flag)
    ".write": "auth != null && data.child('email').val() == auth.token.email"
    // Users can only modify their own profile
  }
}
```

### Knowledgebase Posts
```json
"knowledgebase": {
  "$postId": {
    ".write": "auth != null && data.child('maintainer_email').val() == auth.token.email"
    // Only post owner can edit/delete
  }
}
```

### Comments
```json
"in_comments": {
  "$commentId": {
    ".write": "auth != null && data.child('commenter_email').val() == auth.token.email"
    // Only comment author can delete
  }
}
```

## Incident Response

### If API Keys Are Compromised:

1. **Immediately:** Rotate Firebase API keys in Firebase Console
2. Update `.env` with new keys
3. Update environment variables in hosting platform
4. Redeploy application
5. Review Firebase usage logs for unauthorized access

### If Security Rules Are Misconfigured:

1. Check Firebase Console for security warnings
2. Review database access logs
3. Update `database.rules.json` with fixes
4. Deploy: `firebase deploy --only database`
5. Test rules with Firebase Rules Playground

## Testing Security

### Manual Testing:

1. **Test Authentication:**
   - Try accessing pages without login
   - Verify non-Merrimack emails are rejected

2. **Test Authorization:**
   - Try editing another user's post (should fail)
   - Try deleting another user's comment (should fail)

3. **Test Input Validation:**
   - Try submitting posts with script tags
   - Verify HTML is sanitized
   - Test with very long inputs

### Firebase Rules Testing:

Use the Firebase Console Rules Playground to test:
```
Read: /users/test-user
Auth: Authenticated with test@merrimack.edu
Expected: Allow

Write: /users/other-user
Auth: Authenticated with test@merrimack.edu
Expected: Deny (not owner)
```

## Resources

- [Firebase Security Rules Documentation](https://firebase.google.com/docs/database/security)
- [DOMPurify Documentation](https://github.com/cure53/DOMPurify)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [React Security Best Practices](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)

## Support

For security concerns or questions, please contact:
- Merrimack Computer Club eboard members via [Discord](https://discord.gg/FdATJDYBPP)
- Alexander Elguezabal at `aelguezabal@microsoft.com`

**For security vulnerabilities, please report privately rather than creating public issues.**
