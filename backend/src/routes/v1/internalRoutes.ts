import { Router } from 'express';
import * as habitController from '@/api/v1/internal/habit/controller';

/**
 * @summary
 * Internal (authenticated) API routes configuration for V1
 *
 * @module routes/v1/internalRoutes
 */

const router = Router();

// Habit routes - /api/v1/internal/habit
router.get('/habit', habitController.listHandler);
router.post('/habit', habitController.createHandler);
router.get('/habit/:id', habitController.getHandler);
router.put('/habit/:id', habitController.updateHandler);
router.delete('/habit/:id', habitController.deleteHandler);
router.post('/habit/:id/duplicate', habitController.duplicateHandler);

export default router;
