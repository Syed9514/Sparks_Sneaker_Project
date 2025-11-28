/**
 * value: string | number
 * Returns a clean float number (e.g., "$1,200.50" -> 1200.50)
 */
export const parsePrice = (value) => {
  if (!value) return 0;
  if (typeof value === 'number') return value;
  
  // Remove everything that isn't a digit or a decimal point
  const cleanString = value.toString().replace(/[^0-9.]/g, '');
  return parseFloat(cleanString) || 0;
};

/**
 * amount: number
 * Returns a formatted currency string (e.g., 1200.5 -> "$1,200.50")
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};