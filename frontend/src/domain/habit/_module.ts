/**
 * @module habit
 * @summary Habit management domain module
 * @domain functional
 * @version 1.0.0
 */

export * from './components';
export * from './hooks';
export * from './services';
export * from './types';

export const moduleMetadata = {
  name: 'habit',
  domain: 'functional',
  version: '1.0.0',
  publicComponents: ['HabitForm'],
  publicHooks: ['useHabitList', 'useHabitMutations'],
  publicServices: ['habitService'],
  dependencies: {
    internal: ['@/core/components', '@/core/lib', '@/core/types'],
    external: ['react', 'react-hook-form', 'zod', '@tanstack/react-query', 'axios'],
    domains: [],
  },
  exports: {
    components: ['HabitForm'],
    hooks: ['useHabitList', 'useHabitMutations'],
    services: ['habitService'],
    types: ['Habit', 'HabitFormData', 'HabitListParams', 'HabitStatus', 'HabitFrequency'],
  },
} as const;
