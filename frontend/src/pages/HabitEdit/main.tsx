/**
 * @page HabitEditPage
 * @summary Page for editing existing habits
 * @domain habit
 * @type form-page
 * @category management
 */

import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { HabitForm } from '@/domain/habit/components';
import { useHabitMutations } from '@/domain/habit/hooks';
import { habitService } from '@/domain/habit/services';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import type { HabitFormData } from '@/domain/habit/types';

export const HabitEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { updateHabit, isUpdating } = useHabitMutations();

  const { data: habit, isLoading } = useQuery({
    queryKey: ['habit', id],
    queryFn: () => habitService.getById(Number(id)),
    enabled: !!id,
  });

  const handleSubmit = async (data: HabitFormData) => {
    try {
      await updateHabit(Number(id), data);
      navigate('/habits');
    } catch (error) {
      console.error('Failed to update habit:', error);
    }
  };

  const handleCancel = () => {
    navigate('/habits');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!habit) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hábito não encontrado</h2>
          <button
            onClick={() => navigate('/habits')}
            className="text-primary-600 hover:text-primary-700"
          >
            Voltar para lista de hábitos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <HabitForm
          initialData={habit}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isUpdating}
        />
      </div>
    </div>
  );
};

export default HabitEditPage;
