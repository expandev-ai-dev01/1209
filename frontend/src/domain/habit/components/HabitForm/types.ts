import type { HabitFormData, Habit } from '../../types';

export interface HabitFormProps {
  initialData?: Habit;
  onSubmit: (data: HabitFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}
