/**
 * Scans the CV text and replaces Emails and Phone Numbers 
 * with anonymous placeholders for GDPR compliance.
 */
function redactPII(cvText) {
    // Standard regex pattern for email addresses
    // Note: The 'g' at the end means "global", meaning it will replace ALL instances, not just the first one
    const emailPattern = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/g;
    
    // The robust regex pattern we built for UK, US, and International phone numbers
    const phonePattern = /(?:\+?\d{1,3}[\s-]?)?(?:\(?\d{2,5}\)?[\s-]?)?\d{3,5}[\s-]?\d{3,5}[\s-]?\d{0,4}/g;
    
    // Replace the matches with safe placeholders
    let cleanText = cvText.replace(emailPattern, '<EMAIL>');
    cleanText = cleanText.replace(phonePattern, '<PHONE>');
    
    return cleanText;
}

module.exports = { extractCV, redactPII };