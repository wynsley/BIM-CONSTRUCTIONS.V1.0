"use server";

import { contactFormSchema } from "@/shared/lib/validators";
import { sendContactNotificationEmail } from "@/shared/lib/emailService";
import { headers } from "next/headers";

/**
 * In-memory rate limiting cache.
 * ⚠️ LIMITATION: This Map does not persist across serverless function invocations
 * (e.g., Vercel). For production serverless deployments, consider using
 * Vercel KV, Upstash Redis, or similar distributed key-value stores.
 */
const rateLimitCache = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minuto

/**
 * Server Action to handle the contact form submission.
 * Validates data and triggers the email service.
 *
 * @param {Object|null} prevState
 * @param {FormData} formData
 * @returns {Promise<{errors?: Object, message?: string, success?: boolean}>}
 */
export async function submitContactForm(prevState, formData) {
  const honeypot = formData.get("bot_field");
  if (honeypot) {
    console.warn("[Security] Bot detected via honeypot.");
    return { success: true, message: "Mensaje enviado exitosamente. / Message sent successfully." }; // Fake success
  }

  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    services: formData.get("services"),
    message: formData.get("message"),
  };

  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || "unknown";
  const rateLimitKey = `${ip}-${rawData.email}`;
  const now = Date.now();

  if (rateLimitCache.has(rateLimitKey)) {
    const lastSub = rateLimitCache.get(rateLimitKey);
    if (now - lastSub < RATE_LIMIT_WINDOW_MS) {
      console.warn(`[Security] Rate limit hit for ${rateLimitKey}`);
      return { 
        success: false, 
        message: "Estás enviando mensajes muy rápido. Por favor, espera un minuto. / You are sending messages too fast. Please wait a minute.",
        values: rawData
      };
    }
  }

  const parsed = contactFormSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      message: "Por favor, revisa los errores en el formulario. / Please check the errors in the form.",
      values: rawData,
    };
  }

  try {
    rateLimitCache.set(rateLimitKey, now);

    const emailResult = await sendContactNotificationEmail(parsed.data);

    if (!emailResult.success) {
      return {
        success: false,
        message: "Hubo un problema al enviar el mensaje. Intenta de nuevo más tarde. / There was a problem sending the message. Please try again later.",
        values: rawData,
      };
    }

    return {
      success: true,
      message: "¡Gracias por contactarnos! Hemos recibido tu mensaje. / Thank you for contacting us! We have received your message.",
    };
  } catch (error) {
    console.error("[SubmitContactForm] Action error:", error);
    return {
      success: false,
      message: "Ocurrió un error inesperado. / An unexpected error occurred.",
    };
  }
}
