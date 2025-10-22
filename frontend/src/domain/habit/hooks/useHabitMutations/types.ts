import type { Habit, HabitFormData } from '../../types';

export interface UseHabitMutationsReturn {
  createHabit: (data: HabitFormData) => Promise<Habit>;
  updateHabit: (id: number, data: Partial<HabitFormData>) => Promise<Habit>;
  deleteHabit: (id: number) => Promise<void>;
  duplicateHabit: (id: number, newName: string) => Promise<Habit>;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  isDuplicating: boolean;
}
