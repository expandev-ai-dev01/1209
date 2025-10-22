import { Request, Response } from 'express';
import { errorResponse } from './error';

/**
 * @summary
 * 404 Not Found middleware
 *
 * @function notFoundMiddleware
 * @module middleware/notFound
 *
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 *
 * @returns {void}
 */
export function notFoundMiddleware(req: Request, res: Response): void {
  res.status(404).json(errorResponse(`Route ${req.method} ${req.path} not found`, 'NOT_FOUND'));
}
