/**
 * @hook useHabitMutations
 * @summary Manages habit CRUD mutations
 * @domain habit
 * @type domain-hook
 * @category data
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { habitService } from '../../services';
import type { UseHabitMutationsReturn } from './types';

export const useHabitMutations = (): UseHabitMutationsReturn => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: habitService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => habitService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: habitService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });

  const duplicateMutation = useMutation({
    mutationFn: ({ id, newName }: { id: number; newName: string }) =>
      habitService.duplicate(id, newName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });

  return {
    createHabit: createMutation.mutateAsync,
    updateHabit: (id, data) => updateMutation.mutateAsync({ id, data }),
    deleteHabit: deleteMutation.mutateAsync,
    duplicateHabit: (id, newName) => duplicateMutation.mutateAsync({ id, newName }),
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isDuplicating: duplicateMutation.isPending,
  };
};
