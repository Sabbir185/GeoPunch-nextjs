import {z} from 'zod';

const positionSchema = z.object({
    lat: z.number(),
    lng: z.number()
});

const placeSchema = z.object({
    address: z.string(),
    position: positionSchema
});

export const activityLogSchema = z.object({
    id: z.number().int().positive(),
    checkedInTime: z.date(),
    checkedInPlace: placeSchema,
    checkedOutTime: z.date().optional(),
    checkedOutPlace: placeSchema.optional(),
    userId: z.number().int().positive(),
    createdAt: z.date(),
    updatedAt: z.date(),
    action: z.enum(['Checked-In', 'Checked-Out']).default('Checked-In')
});

export const createActivityLogSchema = z.object({
    checkedInTime: z.date(),
    checkedInPlace: placeSchema,
    userId: z.number().int().positive(),
    action: z.enum(['Checked-In', 'Checked-Out']).default('Checked-In')
});

export const updateActivityLogSchema = z.object({
    id: z.number().int().positive(),
    userId: z.number().int().positive(),
    checkedOutTime: z.date(),
    checkedOutPlace: placeSchema
});

export type ActivityLog = z.infer<typeof activityLogSchema>;
export type CreateActivityLog = z.infer<typeof createActivityLogSchema>;
export type UpdateActivityLog = z.infer<typeof updateActivityLogSchema>;
