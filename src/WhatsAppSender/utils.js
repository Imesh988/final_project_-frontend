// දුරකථන අංකය පිරිසිදු කිරීම සහ ආකෘතිගත කිරීම
export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.startsWith('0') ? `94${cleaned.substring(1)}` : cleaned;
};

// WhatsApp සබැඳිය ජනනය කිරීම
export const generateWhatsAppLink = (phone, message) => {
  const formattedPhone = formatPhoneNumber(phone);
  return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
};

// ශ්‍රී ලංකා දුරකථන අංකය වලංගු කිරීම
export const validateSriLankanPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.match(/^(94|0)\d{9}$/);
};