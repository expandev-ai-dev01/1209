/**
 * @summary
 * Habit API controller - handles all habit CRUD operations
 *
 * @module api/v1/internal/habit/controller
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { errorResponse } from '@/middleware/error';
import { successResponse, listResponse } from '@/utils/response';
import {
  habitCreate,
  habitGet,
  habitList,
  habitUpdate,
  habitDelete,
  habitDuplicate,
  habitCreateSchema,
  habitUpdateSchema,
  habitDuplicateSchema,
  HabitListParams,
} from '@/services/habit';
import { HabitStatus, HabitFrequency } from '@/constants/habitFrequency';

/**
 * @api {get} /api/v1/internal/habit List Habits
 * @apiName ListHabits
 * @apiGroup Habit
 * @apiVersion 1.0.0
 *
 * @apiDescription Lists all habits for the authenticated user with optional filters
 *
 * @apiParam {String} [status] Filter by status (ativo, inativo, concluído)
 * @apiParam {Number} [categoriaId] Filter by category ID
 * @apiParam {String} [frequencia] Filter by frequency (diária, semanal, mensal)
 * @apiParam {String} [ordenacao] Sort order (nome_asc, nome_desc, data_criacao_asc, data_criacao_desc)
 * @apiParam {Number} [page=1] Page number
 * @apiParam {Number} [pageSize=20] Items per page
 *
 * @apiSuccess {Array} data Array of habits
 * @apiSuccess {Number} total Total number of habits
 * @apiSuccess {Number} page Current page
 * @apiSuccess {Number} pageSize Items per page
 *
 * @apiError {String} ValidationError Invalid query parameters
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const idUsuario = 1;

    const querySchema = z.object({
      status: z.nativeEnum(HabitStatus).optional(),
      categoriaId: z.coerce.number().int().positive().optional(),
      frequencia: z.nativeEnum(HabitFrequency).optional(),
      ordenacao: z
        .enum(['nome_asc', 'nome_desc', 'data_criacao_asc', 'data_criacao_desc'])
        .optional(),
      page: z.coerce.number().int().positive().optional(),
      pageSize: z.coerce.number().int().positive().max(100).optional(),
    });

    const validated = querySchema.parse(req.query);

    const params: HabitListParams = {
      idUsuario,
      ...validated,
    };

    const result = await habitList(params);
    const page = params.page || 1;
    const pageSize = params.pageSize || 20;

    res.json(listResponse(result.data, page, pageSize, result.total));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json(errorResponse('Validation failed', 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}

/**
 * @api {post} /api/v1/internal/habit Create Habit
 * @apiName CreateHabit
 * @apiGroup Habit
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new habit for the authenticated user
 *
 * @apiParam {String} nomeHabito Habit name (3-50 characters)
 * @apiParam {String} [descricao] Habit description (max 200 characters)
 * @apiParam {String} frequencia Frequency (diária, semanal, mensal)
 * @apiParam {Array} [diasSemana] Days of week for weekly habits
 * @apiParam {Array} [diasMes] Days of month for monthly habits
 * @apiParam {String} [horarioInicio] Start time (HH:MM)
 * @apiParam {Number} [duracaoEstimada] Estimated duration in minutes
 * @apiParam {Number} [categoriaId] Category ID
 * @apiParam {Date} [dataInicio] Start date
 * @apiParam {Date} [dataTermino] End date
 *
 * @apiSuccess {Object} data Created habit
 *
 * @apiError {String} ValidationError Invalid parameters provided
 */
export async function createHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const idUsuario = 1;

    const validated = habitCreateSchema.parse(req.body);

    const habit = await habitCreate({
      idUsuario,
      ...validated,
    });

    res.status(201).json(successResponse(habit));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json(errorResponse('Validation failed', 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}

/**
 * @api {get} /api/v1/internal/habit/:id Get Habit
 * @apiName GetHabit
 * @apiGroup Habit
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves a specific habit by ID
 *
 * @apiParam {Number} id Habit ID
 *
 * @apiSuccess {Object} data Habit details
 *
 * @apiError {String} NotFound Habit not found
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const idUsuario = 1;
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json(errorResponse('Invalid habit ID', 'INVALID_ID'));
      return;
    }

    const habit = await habitGet(id, idUsuario);

    if (!habit) {
      res.status(404).json(errorResponse('Habit not found', 'NOT_FOUND'));
      return;
    }

    res.json(successResponse(habit));
  } catch (error: any) {
    next(error);
  }
}

/**
 * @api {put} /api/v1/internal/habit/:id Update Habit
 * @apiName UpdateHabit
 * @apiGroup Habit
 * @apiVersion 1.0.0
 *
 * @apiDescription Updates an existing habit
 *
 * @apiParam {Number} id Habit ID
 * @apiParam {String} [nomeHabito] Habit name
 * @apiParam {String} [descricao] Habit description
 * @apiParam {String} [frequencia] Frequency
 * @apiParam {Array} [diasSemana] Days of week
 * @apiParam {Array} [diasMes] Days of month
 * @apiParam {String} [horarioInicio] Start time
 * @apiParam {Number} [duracaoEstimada] Estimated duration
 * @apiParam {Number} [categoriaId] Category ID
 * @apiParam {Date} [dataInicio] Start date
 * @apiParam {Date} [dataTermino] End date
 * @apiParam {String} [status] Habit status
 *
 * @apiSuccess {Object} data Updated habit
 *
 * @apiError {String} ValidationError Invalid parameters
 * @apiError {String} NotFound Habit not found
 */
export async function updateHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const idUsuario = 1;
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json(errorResponse('Invalid habit ID', 'INVALID_ID'));
      return;
    }

    const validated = habitUpdateSchema.parse({ ...req.body, id });

    const habit = await habitUpdate({
      idUsuario,
      ...validated,
    });

    res.json(successResponse(habit));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json(errorResponse('Validation failed', 'VALIDATION_ERROR', error.errors));
    } else if (error.message === 'Habit not found') {
      res.status(404).json(errorResponse('Habit not found', 'NOT_FOUND'));
    } else {
      next(error);
    }
  }
}

/**
 * @api {delete} /api/v1/internal/habit/:id Delete Habit
 * @apiName DeleteHabit
 * @apiGroup Habit
 * @apiVersion 1.0.0
 *
 * @apiDescription Deletes a habit
 *
 * @apiParam {Number} id Habit ID
 *
 * @apiSuccess {Boolean} success Deletion success
 *
 * @apiError {String} NotFound Habit not found
 */
export async function deleteHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const idUsuario = 1;
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json(errorResponse('Invalid habit ID', 'INVALID_ID'));
      return;
    }

    await habitDelete(id, idUsuario);

    res.json(successResponse({ deleted: true }));
  } catch (error: any) {
    if (error.message === 'Habit not found') {
      res.status(404).json(errorResponse('Habit not found', 'NOT_FOUND'));
    } else {
      next(error);
    }
  }
}

/**
 * @api {post} /api/v1/internal/habit/:id/duplicate Duplicate Habit
 * @apiName DuplicateHabit
 * @apiGroup Habit
 * @apiVersion 1.0.0
 *
 * @apiDescription Duplicates an existing habit with a new name
 *
 * @apiParam {Number} id Original habit ID
 * @apiParam {String} nomeNovoHabito New habit name
 *
 * @apiSuccess {Object} data Duplicated habit
 *
 * @apiError {String} ValidationError Invalid parameters
 * @apiError {String} NotFound Original habit not found
 */
export async function duplicateHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const idUsuario = 1;
    const idHabitoOrigem = parseInt(req.params.id);

    if (isNaN(idHabitoOrigem)) {
      res.status(400).json(errorResponse('Invalid habit ID', 'INVALID_ID'));
      return;
    }

    const validated = habitDuplicateSchema.parse({
      ...req.body,
      idHabitoOrigem,
    });

    const habit = await habitDuplicate({
      idUsuario,
      ...validated,
    });

    res.status(201).json(successResponse(habit));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json(errorResponse('Validation failed', 'VALIDATION_ERROR', error.errors));
    } else if (error.message === 'Original habit not found') {
      res.status(404).json(errorResponse('Original habit not found', 'NOT_FOUND'));
    } else {
      next(error);
    }
  }
}
