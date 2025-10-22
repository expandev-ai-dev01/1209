/**
 * @summary
 * Habit service type definitions
 *
 * @module services/habit/habitTypes
 */

import { HabitFrequency, HabitStatus, DayOfWeek } from '@/constants/habitFrequency';

/**
 * @interface HabitEntity
 * @description Represents a habit entity in the system
 *
 * @property {number} id - Unique habit identifier
 * @property {number} idUsuario - User identifier
 * @property {string} nomeHabito - Habit name
 * @property {string | null} descricao - Habit description
 * @property {HabitFrequency} frequencia - Habit frequency
 * @property {DayOfWeek[] | null} diasSemana - Days of week for weekly habits
 * @property {number[] | null} diasMes - Days of month for monthly habits
 * @property {string | null} horarioInicio - Start time (HH:MM)
 * @property {number | null} duracaoEstimada - Estimated duration in minutes
 * @property {number | null} categoriaId - Category identifier
 * @property {Date} dataInicio - Start date
 * @property {Date | null} dataTermino - End date
 * @property {Date} dataCriacao - Creation timestamp
 * @property {HabitStatus} status - Current habit status
 */
export interface HabitEntity {
  id: number;
  idUsuario: number;
  nomeHabito: string;
  descricao: string | null;
  frequencia: HabitFrequency;
  diasSemana: DayOfWeek[] | null;
  diasMes: number[] | null;
  horarioInicio: string | null;
  duracaoEstimada: number | null;
  categoriaId: number | null;
  dataInicio: Date;
  dataTermino: Date | null;
  dataCriacao: Date;
  status: HabitStatus;
}

/**
 * @interface HabitCreateParams
 * @description Parameters for creating a new habit
 */
export interface HabitCreateParams {
  idUsuario: number;
  nomeHabito: string;
  descricao?: string | null;
  frequencia: HabitFrequency;
  diasSemana?: DayOfWeek[] | null;
  diasMes?: number[] | null;
  horarioInicio?: string | null;
  duracaoEstimada?: number | null;
  categoriaId?: number | null;
  dataInicio?: Date;
  dataTermino?: Date | null;
}

/**
 * @interface HabitUpdateParams
 * @description Parameters for updating an existing habit
 */
export interface HabitUpdateParams {
  id: number;
  idUsuario: number;
  nomeHabito?: string;
  descricao?: string | null;
  frequencia?: HabitFrequency;
  diasSemana?: DayOfWeek[] | null;
  diasMes?: number[] | null;
  horarioInicio?: string | null;
  duracaoEstimada?: number | null;
  categoriaId?: number | null;
  dataInicio?: Date;
  dataTermino?: Date | null;
  status?: HabitStatus;
}

/**
 * @interface HabitListParams
 * @description Parameters for listing habits with filters
 */
export interface HabitListParams {
  idUsuario: number;
  status?: HabitStatus;
  categoriaId?: number;
  frequencia?: HabitFrequency;
  ordenacao?: 'nome_asc' | 'nome_desc' | 'data_criacao_asc' | 'data_criacao_desc';
  page?: number;
  pageSize?: number;
}

/**
 * @interface HabitDuplicateParams
 * @description Parameters for duplicating a habit
 */
export interface HabitDuplicateParams {
  idHabitoOrigem: number;
  idUsuario: number;
  nomeNovoHabito: string;
}
