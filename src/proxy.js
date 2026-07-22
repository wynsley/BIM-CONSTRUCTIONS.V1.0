import { NextResponse } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

export const locales = ['es', 'en'];
export const defaultLocale = 'es';

/**
 * Get the preferred locale from the request headers
 * @param {import('next/server').NextRequest} request 
 * @returns {string} The matched locale
 */
function getLocale(request) {
  const negotiatorHeaders = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  let languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  if (languages.length === 0 || languages[0] === '*') {
    return defaultLocale;
  }

  try {
    return matchLocale(languages, locales, defaultLocale);
  } catch (error) {
    return defaultLocale;
  }
}

export function proxy(request) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return; // Allow the request to proceed

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|mp4|webm)).*)',
  ],
};
