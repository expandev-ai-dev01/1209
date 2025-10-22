import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';
import { errorResponse } from './error';

/**
 * @summary
 * Request validation middleware factory
 *
 * @function validationMiddleware
 * @module middleware/validation
 *
 * @param {ZodSchema} schema - Zod validation schema
 *
 * @returns {Function} Express middleware function
 *
 * @throws {ValidationError} When request body fails validation
 */
export function validationMiddleware(schema: ZodSchema) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json(errorResponse('Validation failed', 'VALIDATION_ERROR', error.errors));
      } else {
        next(error);
      }
    }
  };
}
