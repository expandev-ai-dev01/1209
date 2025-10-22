import { z } from 'zod';

/**
 * @summary
 * Zod validation utilities and reusable schemas
 *
 * @module utils/zodValidation
 */

/**
 * @summary String validation (1-255 characters)
 */
export const zString = z.string().min(1).max(255);

/**
 * @summary Nullable string validation
 */
export const zNullableString = z.string().max(255).nullable();

/**
 * @summary Name validation (1-100 characters)
 */
export const zName = z.string().min(1).max(100);

/**
 * @summary Description validation (nullable, max 500 characters)
 */
export const zNullableDescription = z.string().max(500).nullable();

/**
 * @summary Foreign key validation (positive integer)
 */
export const zFK = z.number().int().positive();

/**
 * @summary Nullable foreign key validation
 */
export const zNullableFK = z.number().int().positive().nullable();

/**
 * @summary Bit/Boolean validation (0 or 1)
 */
export const zBit = z.union([z.literal(0), z.literal(1)]);

/**
 * @summary Date string validation (ISO format)
 */
export const zDateString = z.string().datetime();

/**
 * @summary Email validation
 */
export const zEmail = z.string().email();

/**
 * @summary Positive number validation
 */
export const zPositiveNumber = z.number().positive();

/**
 * @summary Non-negative number validation
 */
export const zNonNegativeNumber = z.number().nonnegative();

/**
 * @summary ID parameter validation
 */
export const zIdParam = z.object({
  id: z.coerce.number().int().positive(),
});
