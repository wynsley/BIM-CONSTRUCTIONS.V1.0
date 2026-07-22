/**
 * Utility to retrieve localized data safely.
 * Given a data object that is keyed by language codes (e.g., { en: [...], es: [...] })
 * it returns the array for the requested language or falls back to the default language (es).
 *
 * @param {Object} data - Object containing language‑specific data.
 * @param {string} lang - Current language (e.g., 'en' or 'es').
 * @returns {Array} - The localized array (or empty array if not found).
 */
export function getLocalizedData(data, lang) {
  if (!data) return [];
  const localized = data[lang] ?? data['es'];
  return Array.isArray(localized) ? localized : [];
}
