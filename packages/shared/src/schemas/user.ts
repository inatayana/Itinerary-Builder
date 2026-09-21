import { z } from 'zod';

export const userCreateSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  phoneNumber: z.string().optional(),
  dateOfBirth: z.string().date().optional(),
  nationality: z.string().max(50).optional(),
});

export const userUpdateSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  phoneNumber: z.string().optional(),
  avatarUrl: z.string().url().optional(),
});

export const roleSchema = z.enum(['SUPER_ADMIN', 'ADMIN', 'DRIVER', 'TRAVELER', 'GUEST']);

export const assignRoleSchema = z.object({
  userId: z.string().uuid(),
  role: roleSchema,
  assignedBy: z.string().uuid(),
  expiresAt: z.string().datetime().optional(),
});
