/**
 * @summary
 * Habit validation schemas and functions
 *
 * @module services/habit/habitValidation
 */

import { z } from 'zod';
import {
  HabitFrequency,
  DayOfWeek,
  VALID_DAYS_OF_WEEK,
  VALID_DAYS_OF_MONTH,
} from '@/constants/habitFrequency';

/**
 * @summary Habit name validation schema
 */
export const habitNameSchema = z
  .string()
  .min(3, 'O nome do hábito deve ter pelo menos 3 caracteres')
  .max(50, 'O nome do hábito deve ter no máximo 50 caracteres')
  .refine(
    (val) => val.trim().length > 0,
    'O nome do hábito não pode conter apenas espaços em branco'
  );

/**
 * @summary Habit description validation schema
 */
export const habitDescriptionSchema = z
  .string()
  .max(200, 'A descrição deve ter no máximo 200 caracteres')
  .nullable()
  .optional();

/**
 * @summary Habit frequency validation schema
 */
export const habitFrequencySchema = z.nativeEnum(HabitFrequency, {
  errorMap: () => ({ message: 'Selecione a frequência do hábito' }),
});

/**
 * @summary Days of week validation schema
 */
export const daysOfWeekSchema = z
  .array(z.nativeEnum(DayOfWeek))
  .min(1, 'Selecione pelo menos um dia da semana para hábitos semanais')
  .nullable()
  .optional();

/**
 * @summary Days of month validation schema
 */
export const daysOfMonthSchema = z
  .array(z.number().int().min(1).max(31))
  .min(1, 'Selecione pelo menos um dia do mês para hábitos mensais')
  .refine(
    (days) => days?.every((day) => VALID_DAYS_OF_MONTH.includes(day)) ?? true,
    'Dias do mês devem estar entre 1 e 31'
  )
  .nullable()
  .optional();

/**
 * @summary Time validation schema (HH:MM format)
 */
export const timeSchema = z
  .string()
  .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de horário inválido. Use HH:MM')
  .nullable()
  .optional();

/**
 * @summary Duration validation schema
 */
export const durationSchema = z
  .number()
  .int()
  .positive('A duração estimada deve ser maior que zero')
  .nullable()
  .optional();

/**
 * @summary Date validation schema
 */
export const dateSchema = z.coerce.date();

/**
 * @summary Start date validation
 */
export const startDateSchema = z.coerce
  .date()
  .refine(
    (date) => date >= new Date(new Date().setHours(0, 0, 0, 0)),
    'A data de início não pode ser anterior à data atual'
  )
  .optional();

/**
 * @summary Base habit schema without refinements
 */
const baseHabitSchema = z.object({
  nomeHabito: habitNameSchema,
  descricao: habitDescriptionSchema,
  frequencia: habitFrequencySchema,
  diasSemana: daysOfWeekSchema,
  diasMes: daysOfMonthSchema,
  horarioInicio: timeSchema,
  duracaoEstimada: durationSchema,
  categoriaId: z.number().int().positive().nullable().optional(),
  dataInicio: startDateSchema,
  dataTermino: z.coerce.date().nullable().optional(),
});

/**
 * @summary
 * Validates habit creation data
 *
 * @function validateHabitCreate
 * @module services/habit/habitValidation
 *
 * @param {any} data - Data to validate
 *
 * @returns {object} Validated data
 *
 * @throws {z.ZodError} When validation fails
 */
export const habitCreateSchema = baseHabitSchema
  .refine(
    (data) => {
      if (data.frequencia === HabitFrequency.Weekly) {
        return data.diasSemana && data.diasSemana.length > 0;
      }
      return true;
    },
    {
      message: 'Selecione pelo menos um dia da semana para hábitos semanais',
      path: ['diasSemana'],
    }
  )
  .refine(
    (data) => {
      if (data.frequencia === HabitFrequency.Monthly) {
        return data.diasMes && data.diasMes.length > 0;
      }
      return true;
    },
    {
      message: 'Selecione pelo menos um dia do mês para hábitos mensais',
      path: ['diasMes'],
    }
  )
  .refine(
    (data) => {
      if (data.dataTermino && data.dataInicio) {
        return data.dataTermino > data.dataInicio;
      }
      return true;
    },
    {
      message: 'A data de término deve ser posterior à data de início',
      path: ['dataTermino'],
    }
  );

/**
 * @summary
 * Validates habit update data
 */
export const habitUpdateSchema = z
  .object({
    id: z.number().int().positive(),
    nomeHabito: habitNameSchema.optional(),
    descricao: habitDescriptionSchema,
    frequencia: habitFrequencySchema.optional(),
    diasSemana: daysOfWeekSchema,
    diasMes: daysOfMonthSchema,
    horarioInicio: timeSchema,
    duracaoEstimada: durationSchema,
    categoriaId: z.number().int().positive().nullable().optional(),
    dataInicio: startDateSchema,
    dataTermino: z.coerce.date().nullable().optional(),
  })
  .refine(
    (data) => {
      if (data.frequencia === HabitFrequency.Weekly) {
        return data.diasSemana && data.diasSemana.length > 0;
      }
      return true;
    },
    {
      message: 'Selecione pelo menos um dia da semana para hábitos semanais',
      path: ['diasSemana'],
    }
  )
  .refine(
    (data) => {
      if (data.frequencia === HabitFrequency.Monthly) {
        return data.diasMes && data.diasMes.length > 0;
      }
      return true;
    },
    {
      message: 'Selecione pelo menos um dia do mês para hábitos mensais',
      path: ['diasMes'],
    }
  )
  .refine(
    (data) => {
      if (data.dataTermino && data.dataInicio) {
        return data.dataTermino > data.dataInicio;
      }
      return true;
    },
    {
      message: 'A data de término deve ser posterior à data de início',
      path: ['dataTermino'],
    }
  );

/**
 * @summary
 * Validates habit duplicate data
 */
export const habitDuplicateSchema = z
  .object({
    idHabitoOrigem: z.number().int().positive(),
    nomeNovoHabito: habitNameSchema,
  })
  .refine((data) => data.nomeNovoHabito.trim().length > 0, {
    message: 'O novo hábito deve ter um nome diferente do original',
    path: ['nomeNovoHabito'],
  });
