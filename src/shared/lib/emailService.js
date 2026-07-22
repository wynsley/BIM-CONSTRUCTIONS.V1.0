import "server-only"; // Ensures this module can never be imported into client components
import { Resend } from "resend";

if (process.env.NODE_ENV === 'production' && !process.env.RESEND_API_KEY) {
  console.error('[EmailService] CRITICAL: RESEND_API_KEY is not set in production!');
}

/**
 * Escapes HTML special characters to prevent XSS injection.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_for_build");

/**
 * Sends a contact form submission email to the administrator.
 *
 * @param {import("./validators").ContactFormData} data
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function sendContactNotificationEmail(data) {
  const { name, email, phone, address, services, message } = data;

  try {
    const { data: result, error } = await resend.emails.send({
      from: "BIM Constructions Web <onboarding@resend.dev>",
      to: [process.env.ADMIN_EMAIL || "admin@example.com"],
      subject: `Nuevo mensaje de contacto: ${name}`,
      replyTo: email,
      html: `
        <h2>Nuevo mensaje desde la web</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Teléfono:</strong> ${escapeHtml(phone || "No especificado")}</p>
        <p><strong>Dirección:</strong> ${escapeHtml(address || "No especificado")}</p>
        <p><strong>Servicio de interés:</strong> ${escapeHtml(services)}</p>
        <br/>
        <h3>Mensaje:</h3>
        <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      `,
    });

    if (error) {
      console.error("[EmailService] Error sending email via Resend:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("[EmailService] Unexpected error sending email:", error);
    return { success: false, error: "Error interno del servidor de correo." };
  }
}
