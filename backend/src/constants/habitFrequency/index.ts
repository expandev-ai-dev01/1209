/**
 * @summary
 * Habit frequency constants
 *
 * @module constants/habitFrequency
 */

export enum HabitFrequency {
  Daily = 'diária',
  Weekly = 'semanal',
  Monthly = 'mensal',
}

export enum HabitStatus {
  Active = 'ativo',
  Inactive = 'inativo',
  Completed = 'concluído',
}

export enum DayOfWeek {
  Monday = 'segunda',
  Tuesday = 'terça',
  Wednesday = 'quarta',
  Thursday = 'quinta',
  Friday = 'sexta',
  Saturday = 'sábado',
  Sunday = 'domingo',
}

export const VALID_DAYS_OF_WEEK = [
  DayOfWeek.Monday,
  DayOfWeek.Tuesday,
  DayOfWeek.Wednesday,
  DayOfWeek.Thursday,
  DayOfWeek.Friday,
  DayOfWeek.Saturday,
  DayOfWeek.Sunday,
];

export const VALID_DAYS_OF_MONTH = Array.from({ length: 31 }, (_, i) => i + 1);
