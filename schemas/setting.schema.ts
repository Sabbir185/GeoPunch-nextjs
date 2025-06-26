import { z } from "zod";

export const SettingSchema = z.object({
  id: z.number().int().optional(),
  site_name: z.string(),
  site_email: z.string(),
  site_address: z.string(),
  site_footer: z.string(),
  site_phone: z.string(),
  site_logo: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type TSetting = z.infer<typeof SettingSchema>;
