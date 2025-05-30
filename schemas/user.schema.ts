import { z } from "zod";

export const RolesEnum = z.enum(["USER", "ADMIN", "SUPER_ADMIN"]);
export type Roles = z.infer<typeof RolesEnum>;

export const UserStatusEnum = z.enum([
  "PENDING",
  "ACTIVE",
  "INACTIVE",
  "SUSPENDED",
]);
export type UserStatus = z.infer<typeof UserStatusEnum>;

// User schema definition
export const UserSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string({
    required_error: "Phone is required",
    invalid_type_error: "Phone must be a string",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  role: RolesEnum.default("USER"),
  image: z.string().url().optional().nullable(),
  address: z.string().optional().nullable(),
  department: z.string().optional().nullable(),
  designation: z.string().optional().nullable(),
  position: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional()
    .nullable(),
  status: UserStatusEnum.default("ACTIVE"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  isDeleted: z.boolean().default(false),
});

export type User = z.infer<typeof UserSchema>;

// signup
export const CreateUserWithOtpSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string({
      required_error: "Phone is required",
      invalid_type_error: "Phone must be a string",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    designation: z.string().optional(),
    department: z.string().optional(),
    otp: z.string().length(6, { message: "OTP must be 6 digits" }),
    fcm_token: z.string().optional(),
  })
  .strict();

export const UpdateUserProfileSchema = z
  .object({
    name: z.string({ invalid_type_error: "Name must be a string" }).optional(),
    email: z.string().email({ message: "Invalid email address" }).optional(),
    phone: z
      .string({ invalid_type_error: "Phone must be a string" })
      .optional(),
    image: z
      .string({ invalid_type_error: "Image must be a string" })
      .url()
      .optional(),
    address: z
      .string({ invalid_type_error: "Address must be a string" })
      .optional(),
    department: z
      .string({ invalid_type_error: "Department must be a string" })
      .optional(),
    designation: z
      .string({ invalid_type_error: "Designation must be a string" })
      .optional(),
  })
  .strict();

export type UpdateUserProfileInput = z.infer<typeof UpdateUserProfileSchema>;
