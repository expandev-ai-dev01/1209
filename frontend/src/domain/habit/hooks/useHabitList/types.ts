import type { Habit, HabitListParams } from '../../types';

export interface UseHabitListOptions {
  filters?: HabitListParams;
  enabled?: boolean;
}

export interface UseHabitListReturn {
  habits: Habit[];
  total: number;
  page: number;
  pageSize: number;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
