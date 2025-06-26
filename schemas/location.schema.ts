import { z } from "zod";

export const LocatoinSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, { message: "Name is required" }),
  image: z.string().url().optional().nullable(),
  address: z.string().optional().nullable(),
  lat: z.number(),
  lng: z.number(),
  maxRadius: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  isDeleted: z.boolean().default(false),
});

export type TLocatoin = z.infer<typeof LocatoinSchema>;
