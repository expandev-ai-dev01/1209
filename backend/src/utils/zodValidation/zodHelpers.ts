import { z } from 'zod';

/**
 * @summary
 * Common Zod validation schemas for reuse across the application
 *
 * @module utils/zodValidation
 */

/**
 * String validation (1-255 characters)
 */
export const zString = z.string().min(1).max(255);

/**
 * Nullable string validation
 */
export const zNullableString = z.string().max(255).nullable();

/**
 * Name validation (1-100 characters)
 */
export const zName = z.string().min(1).max(100);

/**
 * Description validation (nullable, max 500 characters)
 */
export const zNullableDescription = z.string().max(500).nullable();

/**
 * Foreign key validation (positive integer)
 */
export const zFK = z.number().int().positive();

/**
 * Nullable foreign key validation
 */
export const zNullableFK = z.number().int().positive().nullable();

/**
 * Bit/Boolean validation (0 or 1)
 */
export const zBit = z.union([z.literal(0), z.literal(1)]);

/**
 * Date string validation (ISO format)
 */
export const zDateString = z.string().datetime();

/**
 * Email validation
 */
export const zEmail = z.string().email().max(255);

/**
 * URL validation
 */
export const zUrl = z.string().url().max(500);

/**
 * Positive number validation
 */
export const zPositiveNumber = z.number().positive();

/**
 * Non-negative number validation
 */
export const zNonNegativeNumber = z.number().nonnegative();
