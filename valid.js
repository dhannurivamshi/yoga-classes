// validation.js

// Function to validate user data
const validateUserData = (userData) => {
    const errors = [];
  
    // Check if username is present
    if (!userData.username || userData.username.trim() === '') {
      errors.push('Username is required.');
    }
  
    // Check if password is present
    if (!userData.password || userData.password.trim() === '') {
      errors.push('Password is required.');
    }
  
    return errors;
  };
  
  module.exports = {
    validateUserData,
  };
  