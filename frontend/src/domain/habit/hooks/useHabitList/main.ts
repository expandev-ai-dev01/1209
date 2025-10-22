/**
 * @hook useHabitList
 * @summary Manages habit list with filtering and pagination
 * @domain habit
 * @type domain-hook
 * @category data
 */

import { useQuery } from '@tanstack/react-query';
import { habitService } from '../../services';
import type { UseHabitListOptions, UseHabitListReturn } from './types';

export const useHabitList = (options: UseHabitListOptions = {}): UseHabitListReturn => {
  const { filters = {}, enabled = true } = options;

  const queryKey = ['habits', filters];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => habitService.list(filters),
    enabled,
    staleTime: 2 * 60 * 1000,
  });

  return {
    habits: data?.data || [],
    total: data?.total || 0,
    page: data?.page || 1,
    pageSize: data?.limit || 20,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
