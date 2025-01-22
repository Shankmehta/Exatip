// Validation utility functions
export const validateUpperCase = (value: string): boolean => {
  return /^[A-Z]*$/.test(value);
};

export const validateNumber = (value: string): boolean => {
  return /^\d*\.?\d*$/.test(value);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

