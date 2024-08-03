export const BASE_URL = 'http://localhost:8000/api/v1/user'

export const validateEmail= (email) =>{
    // Regular expression for validating an email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Test the email against the regex
    return emailRegex.test(email);
  }
  