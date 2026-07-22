import { z } from "zod";

import { isValidPhoneNumber } from "libphonenumber-js";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres / Minimum 2 characters" })
    .max(100, { message: "El nombre no puede exceder 100 caracteres / Maximum 100 characters" }),
  
  email: z
    .string()
    .email({ message: "Debe ser un correo electrónico válido / Must be a valid email" }),
  
  phone: z
    .string()
    .refine((val) => !val || isValidPhoneNumber(val), {
      message: "Debe ser un número de teléfono válido para el país seleccionado / Must be a valid phone number for the selected country",
    })
    .optional()
    .or(z.literal("")),
  
  address: z
    .string()
    .optional(),
    
  services: z
    .string()
    .min(1, { message: "Debes seleccionar un servicio / You must select a service" }),
    
  message: z
    .string()
    .min(10, { message: "El mensaje debe tener al menos 10 caracteres / Minimum 10 characters" })
    .max(1000, { message: "El mensaje es demasiado largo (máx 1000) / Message is too long (max 1000)" }),
});

/** @typedef {z.infer<typeof contactFormSchema>} ContactFormData */
