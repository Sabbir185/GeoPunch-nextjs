import { z } from "zod";

export const emailLogSchema = z.object({
  id: z.number(),
  recipientEmail: z.string().email(),
  recipientName: z.string().nullable(),
  subject: z.string().min(1),
  body: z.string().min(1),
  senderEmail: z.string().email(),
  senderName: z.string().nullable(),
  senderType: z.enum(["firebase", "admin"]),
  emailId: z.string().nullable(),
  status: z.enum(["sent", "failed", "pending"]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type EmailLog = z.infer<typeof emailLogSchema>;

export const emailLogListSchema = z.object({
  docs: z.array(emailLogSchema),
  totalDocs: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
  nextPage: z.number().nullable(),
  prevPage: z.number().nullable(),
});

export type EmailLogList = z.infer<typeof emailLogListSchema>;
