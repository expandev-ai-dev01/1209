/**
 * @summary
 * Habit business logic with in-memory storage
 *
 * @module services/habit/habitLogic
 */

import {
  HabitEntity,
  HabitCreateParams,
  HabitUpdateParams,
  HabitListParams,
  HabitDuplicateParams,
} from './habitTypes';
import { HabitStatus } from '@/constants/habitFrequency';

/**
 * @important In-memory storage for habits
 */
let habits: HabitEntity[] = [];
let nextId = 1;

/**
 * @summary
 * Creates a new habit
 *
 * @function habitCreate
 * @module services/habit/habitLogic
 *
 * @param {HabitCreateParams} params - Habit creation parameters
 *
 * @returns {Promise<HabitEntity>} Created habit entity
 *
 * @throws {Error} When validation fails
 */
export async function habitCreate(params: HabitCreateParams): Promise<HabitEntity> {
  const now = new Date();
  const dataInicio = params.dataInicio || now;

  const newHabit: HabitEntity = {
    id: nextId++,
    idUsuario: params.idUsuario,
    nomeHabito: params.nomeHabito,
    descricao: params.descricao || null,
    frequencia: params.frequencia,
    diasSemana: params.diasSemana || null,
    diasMes: params.diasMes || null,
    horarioInicio: params.horarioInicio || null,
    duracaoEstimada: params.duracaoEstimada || null,
    categoriaId: params.categoriaId || null,
    dataInicio,
    dataTermino: params.dataTermino || null,
    dataCriacao: now,
    status: HabitStatus.Active,
  };

  habits.push(newHabit);
  return newHabit;
}

/**
 * @summary
 * Retrieves a habit by ID
 *
 * @function habitGet
 * @module services/habit/habitLogic
 *
 * @param {number} id - Habit identifier
 * @param {number} idUsuario - User identifier
 *
 * @returns {Promise<HabitEntity | null>} Habit entity or null if not found
 */
export async function habitGet(id: number, idUsuario: number): Promise<HabitEntity | null> {
  const habit = habits.find((h) => h.id === id && h.idUsuario === idUsuario);
  return habit || null;
}

/**
 * @summary
 * Lists habits with filters and pagination
 *
 * @function habitList
 * @module services/habit/habitLogic
 *
 * @param {HabitListParams} params - List parameters
 *
 * @returns {Promise<{ data: HabitEntity[]; total: number }>} Paginated habits list
 */
export async function habitList(
  params: HabitListParams
): Promise<{ data: HabitEntity[]; total: number }> {
  let filtered = habits.filter((h) => h.idUsuario === params.idUsuario);

  // Apply filters
  if (params.status) {
    filtered = filtered.filter((h) => h.status === params.status);
  }
  if (params.categoriaId) {
    filtered = filtered.filter((h) => h.categoriaId === params.categoriaId);
  }
  if (params.frequencia) {
    filtered = filtered.filter((h) => h.frequencia === params.frequencia);
  }

  // Apply sorting
  const ordenacao = params.ordenacao || 'data_criacao_desc';
  filtered.sort((a, b) => {
    switch (ordenacao) {
      case 'nome_asc':
        return a.nomeHabito.localeCompare(b.nomeHabito);
      case 'nome_desc':
        return b.nomeHabito.localeCompare(a.nomeHabito);
      case 'data_criacao_asc':
        return a.dataCriacao.getTime() - b.dataCriacao.getTime();
      case 'data_criacao_desc':
      default:
        return b.dataCriacao.getTime() - a.dataCriacao.getTime();
    }
  });

  // Apply pagination
  const page = params.page || 1;
  const pageSize = params.pageSize || 20;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filtered.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    total: filtered.length,
  };
}

/**
 * @summary
 * Updates an existing habit
 *
 * @function habitUpdate
 * @module services/habit/habitLogic
 *
 * @param {HabitUpdateParams} params - Update parameters
 *
 * @returns {Promise<HabitEntity>} Updated habit entity
 *
 * @throws {Error} When habit not found or validation fails
 */
export async function habitUpdate(params: HabitUpdateParams): Promise<HabitEntity> {
  const habitIndex = habits.findIndex(
    (h) => h.id === params.id && h.idUsuario === params.idUsuario
  );

  if (habitIndex === -1) {
    throw new Error('Habit not found');
  }

  const existingHabit = habits[habitIndex];
  const updatedHabit: HabitEntity = {
    ...existingHabit,
    nomeHabito: params.nomeHabito !== undefined ? params.nomeHabito : existingHabit.nomeHabito,
    descricao: params.descricao !== undefined ? params.descricao : existingHabit.descricao,
    frequencia: params.frequencia !== undefined ? params.frequencia : existingHabit.frequencia,
    diasSemana: params.diasSemana !== undefined ? params.diasSemana : existingHabit.diasSemana,
    diasMes: params.diasMes !== undefined ? params.diasMes : existingHabit.diasMes,
    horarioInicio:
      params.horarioInicio !== undefined ? params.horarioInicio : existingHabit.horarioInicio,
    duracaoEstimada:
      params.duracaoEstimada !== undefined ? params.duracaoEstimada : existingHabit.duracaoEstimada,
    categoriaId: params.categoriaId !== undefined ? params.categoriaId : existingHabit.categoriaId,
    dataInicio: params.dataInicio !== undefined ? params.dataInicio : existingHabit.dataInicio,
    dataTermino: params.dataTermino !== undefined ? params.dataTermino : existingHabit.dataTermino,
    status: params.status !== undefined ? params.status : existingHabit.status,
  };

  habits[habitIndex] = updatedHabit;
  return updatedHabit;
}

/**
 * @summary
 * Deletes a habit
 *
 * @function habitDelete
 * @module services/habit/habitLogic
 *
 * @param {number} id - Habit identifier
 * @param {number} idUsuario - User identifier
 *
 * @returns {Promise<boolean>} True if deleted successfully
 *
 * @throws {Error} When habit not found
 */
export async function habitDelete(id: number, idUsuario: number): Promise<boolean> {
  const habitIndex = habits.findIndex((h) => h.id === id && h.idUsuario === idUsuario);

  if (habitIndex === -1) {
    throw new Error('Habit not found');
  }

  habits.splice(habitIndex, 1);
  return true;
}

/**
 * @summary
 * Duplicates an existing habit
 *
 * @function habitDuplicate
 * @module services/habit/habitLogic
 *
 * @param {HabitDuplicateParams} params - Duplicate parameters
 *
 * @returns {Promise<HabitEntity>} Duplicated habit entity
 *
 * @throws {Error} When original habit not found or validation fails
 */
export async function habitDuplicate(params: HabitDuplicateParams): Promise<HabitEntity> {
  const originalHabit = await habitGet(params.idHabitoOrigem, params.idUsuario);

  if (!originalHabit) {
    throw new Error('Original habit not found');
  }

  const duplicateParams: HabitCreateParams = {
    idUsuario: params.idUsuario,
    nomeHabito: params.nomeNovoHabito,
    descricao: originalHabit.descricao,
    frequencia: originalHabit.frequencia,
    diasSemana: originalHabit.diasSemana,
    diasMes: originalHabit.diasMes,
    horarioInicio: originalHabit.horarioInicio,
    duracaoEstimada: originalHabit.duracaoEstimada,
    categoriaId: originalHabit.categoriaId,
    dataInicio: new Date(),
    dataTermino: originalHabit.dataTermino,
  };

  return habitCreate(duplicateParams);
}
