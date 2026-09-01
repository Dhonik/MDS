/**
 * Clean URL and WhatsApp formatting utilities
 */

export function cleanPhoneNumber(phone?: string | null): string {
  if (!phone) return '';
  return phone.replace(/[^0-9]/g, '');
}

export function generateWhatsAppLink(phone?: string | null, message?: string): string {
  if (!phone) return '#';
  const cleanPhone = cleanPhoneNumber(phone);
  const encodedMsg = message ? encodeURIComponent(message) : '';
  return `https://wa.me/${cleanPhone}${encodedMsg ? `?text=${encodedMsg}` : ''}`;
}

export function formatPrice(price?: number | null, unit: string = 'kg'): string | null {
  if (price === null || price === undefined || isNaN(price)) return null;
  return `₹${price}/${unit}`;
}
