
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Handle different phone number lengths
  if (cleaned.length === 11) {
    // Mobile: (XX) XXXXX-XXXX
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
  } else if (cleaned.length === 10) {
    // Landline: (XX) XXXX-XXXX
    const match = cleaned.match(/^(\d{2})(\d{4})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
  }
  
  return phone; // Return original if no pattern matches
};

export const validatePhoneNumber = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10 || cleaned.length === 11;
};

export const createWhatsAppLink = (phone: string, message?: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const formattedPhone = `55${cleaned}`;
  const encodedMessage = message ? encodeURIComponent(message) : '';
  
  return `https://wa.me/${formattedPhone}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
};

export const createPhoneLink = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  return `tel:+55${cleaned}`;
};

export const isValidBrazilianPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if it's a valid Brazilian phone number
  if (cleaned.length === 11) {
    // Mobile: starts with 9 after area code
    const areaCode = cleaned.substring(0, 2);
    const firstDigit = cleaned.charAt(2);
    return parseInt(areaCode) >= 11 && parseInt(areaCode) <= 99 && firstDigit === '9';
  } else if (cleaned.length === 10) {
    // Landline
    const areaCode = cleaned.substring(0, 2);
    return parseInt(areaCode) >= 11 && parseInt(areaCode) <= 99;
  }
  
  return false;
};
