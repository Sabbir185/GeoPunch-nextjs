import { z } from "zod";

export const UserRole = z.enum(["ADMIN", "USER", "MANAGER"]);
export type UserRole = z.infer<typeof UserRole>;

export const userSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: UserRole.default("USER"),
  phone: z.string().optional(),
  address: z.string().optional(),
  profileImage: z.string().url().optional().nullable(),
  department: z.string().optional(),
  position: z.string().optional(),
  employeeId: z.string().optional(),
  isActive: z.boolean().default(true),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const loginUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type User = z.infer<typeof userSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
