import 'server-only';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  es: () => import('./dictionaries/es.json').then((module) => module.default),
};

/**
 * Gets the dictionary for the specified locale.
 *
 * @param {'en' | 'es'} locale
 * @returns {Promise<Object>}
 */
export const getDictionary = async (locale) => dictionaries[locale]();
