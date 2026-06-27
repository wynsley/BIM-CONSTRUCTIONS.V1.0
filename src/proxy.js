import { NextResponse } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

// Define our supported locales
export const locales = ['es', 'en'];
export const defaultLocale = 'es';

/**
 * Get the preferred locale from the request headers
 * @param {import('next/server').NextRequest} request 
 * @returns {string} The matched locale
 */
function getLocale(request) {
  // Negotiator expects a plain object of headers
  const negotiatorHeaders = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator to parse the Accept-Language header
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  // Handle case where no accept-language is present
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

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return; // Allow the request to proceed

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  
  // e.g. incoming request is /proyectos
  // The new URL is now /es/proyectos
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    // Skip all static files (images, favicon, video, etc.)
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|mp4|webm)).*)',
  ],
};
