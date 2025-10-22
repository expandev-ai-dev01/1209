/**
 * @page HabitListPage
 * @summary Page displaying list of user habits
 * @domain habit
 * @type list-page
 * @category management
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHabitList, useHabitMutations } from '@/domain/habit/hooks';
import { Button } from '@/core/components/Button';
import { Card } from '@/core/components/Card';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import type { HabitStatus, HabitFrequency } from '@/domain/habit/types';

export const HabitListPage = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<HabitStatus | undefined>('ativo');
  const [frequenciaFilter, setFrequenciaFilter] = useState<HabitFrequency | undefined>();

  const { habits, isLoading, refetch } = useHabitList({
    filters: {
      status: statusFilter,
      frequencia: frequenciaFilter,
      ordenacao: 'data_criacao_desc',
    },
  });

  const { deleteHabit, isDeleting } = useHabitMutations();

  const handleDelete = async (id: number) => {
    if (
      window.confirm('Tem certeza que deseja excluir este hábito? Esta ação não pode ser desfeita.')
    ) {
      try {
        await deleteHabit(id);
        refetch();
      } catch (error) {
        console.error('Failed to delete habit:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Meus Hábitos</h1>
          <Button onClick={() => navigate('/habits/new')}>Cadastrar Novo Hábito</Button>
        </div>

        <Card className="mb-6">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={statusFilter || ''}
                onChange={(e) => setStatusFilter((e.target.value as HabitStatus) || undefined)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Todos</option>
                <option value="ativo">Ativos</option>
                <option value="inativo">Inativos</option>
                <option value="concluído">Concluídos</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Frequência</label>
              <select
                value={frequenciaFilter || ''}
                onChange={(e) =>
                  setFrequenciaFilter((e.target.value as HabitFrequency) || undefined)
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Todas</option>
                <option value="diária">Diária</option>
                <option value="semanal">Semanal</option>
                <option value="mensal">Mensal</option>
              </select>
            </div>
          </div>
        </Card>

        {habits.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Você ainda não possui hábitos cadastrados</p>
              <Button onClick={() => navigate('/habits/new')}>Cadastrar Primeiro Hábito</Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {habits.map((habit) => (
              <Card key={habit.id}>
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-900">{habit.nomeHabito}</h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        habit.status === 'ativo'
                          ? 'bg-green-100 text-green-800'
                          : habit.status === 'inativo'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {habit.status}
                    </span>
                  </div>

                  {habit.descricao && <p className="text-gray-600 text-sm">{habit.descricao}</p>}

                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Frequência:</span> {habit.frequencia}
                    </p>
                    {habit.horarioInicio && (
                      <p>
                        <span className="font-medium">Horário:</span> {habit.horarioInicio}
                      </p>
                    )}
                    {habit.duracaoEstimada && (
                      <p>
                        <span className="font-medium">Duração:</span> {habit.duracaoEstimada} min
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 pt-3">
                    <Button
                      size="small"
                      variant="outline"
                      onClick={() => navigate(`/habits/${habit.id}/edit`)}
                      fullWidth
                    >
                      Editar
                    </Button>
                    <Button
                      size="small"
                      variant="outline"
                      onClick={() => handleDelete(habit.id)}
                      disabled={isDeleting}
                      fullWidth
                    >
                      Excluir
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitListPage;
