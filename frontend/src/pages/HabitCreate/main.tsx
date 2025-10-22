/**
 * @page HabitCreatePage
 * @summary Page for creating new habits
 * @domain habit
 * @type form-page
 * @category management
 */

import { useNavigate } from 'react-router-dom';
import { HabitForm } from '@/domain/habit/components';
import { useHabitMutations } from '@/domain/habit/hooks';
import type { HabitFormData } from '@/domain/habit/types';

export const HabitCreatePage = () => {
  const navigate = useNavigate();
  const { createHabit, isCreating } = useHabitMutations();

  const handleSubmit = async (data: HabitFormData) => {
    try {
      await createHabit(data);
      navigate('/habits');
    } catch (error) {
      console.error('Failed to create habit:', error);
    }
  };

  const handleCancel = () => {
    navigate('/habits');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <HabitForm onSubmit={handleSubmit} onCancel={handleCancel} isSubmitting={isCreating} />
      </div>
    </div>
  );
};

export default HabitCreatePage;
