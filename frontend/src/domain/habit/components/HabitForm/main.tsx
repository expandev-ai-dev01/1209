/**
 * @component HabitForm
 * @summary Form for creating and editing habits
 * @domain habit
 * @type domain-component
 * @category form
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/core/components/Input';
import { Button } from '@/core/components/Button';
import { Card } from '@/core/components/Card';
import type { HabitFormProps } from './types';
import type { HabitFormData, DayOfWeek } from '../../types';

const habitSchema = z
  .object({
    nomeHabito: z
      .string()
      .min(3, 'O nome do hábito deve ter pelo menos 3 caracteres')
      .max(50, 'O nome do hábito deve ter no máximo 50 caracteres'),
    descricao: z.string().max(200, 'A descrição deve ter no máximo 200 caracteres').optional(),
    frequencia: z.enum(['diária', 'semanal', 'mensal'], {
      message: 'Selecione a frequência do hábito',
    }),
    diasSemana: z
      .array(z.enum(['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo']))
      .optional(),
    diasMes: z.array(z.number()).optional(),
    horarioInicio: z.string().optional(),
    duracaoEstimada: z.number().positive('A duração deve ser maior que zero').optional(),
    categoriaId: z.number().optional(),
    dataInicio: z.string().optional(),
    dataTermino: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.frequencia === 'semanal') {
        return data.diasSemana && data.diasSemana.length > 0;
      }
      return true;
    },
    {
      message: 'Selecione pelo menos um dia da semana para hábitos semanais',
      path: ['diasSemana'],
    }
  )
  .refine(
    (data) => {
      if (data.frequencia === 'mensal') {
        return data.diasMes && data.diasMes.length > 0;
      }
      return true;
    },
    {
      message: 'Selecione pelo menos um dia do mês para hábitos mensais',
      path: ['diasMes'],
    }
  )
  .refine(
    (data) => {
      if (data.dataInicio && data.dataTermino) {
        return new Date(data.dataTermino) > new Date(data.dataInicio);
      }
      return true;
    },
    {
      message: 'A data de término deve ser posterior à data de início',
      path: ['dataTermino'],
    }
  );

const daysOfWeek: DayOfWeek[] = [
  'segunda',
  'terça',
  'quarta',
  'quinta',
  'sexta',
  'sábado',
  'domingo',
];

const daysOfMonth = Array.from({ length: 31 }, (_, i) => i + 1);

export const HabitForm = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: HabitFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<HabitFormData>({
    resolver: zodResolver(habitSchema),
    defaultValues: initialData
      ? {
          nomeHabito: initialData.nomeHabito,
          descricao: initialData.descricao,
          frequencia: initialData.frequencia,
          diasSemana: initialData.diasSemana,
          diasMes: initialData.diasMes,
          horarioInicio: initialData.horarioInicio,
          duracaoEstimada: initialData.duracaoEstimada,
          categoriaId: initialData.categoriaId,
          dataInicio: initialData.dataInicio,
          dataTermino: initialData.dataTermino,
        }
      : {
          frequencia: 'diária',
        },
  });

  const frequencia = watch('frequencia');
  const selectedDiasSemana = watch('diasSemana') || [];
  const selectedDiasMes = watch('diasMes') || [];

  const handleDayOfWeekToggle = (day: DayOfWeek) => {
    const current = selectedDiasSemana;
    const updated = current.includes(day) ? current.filter((d) => d !== day) : [...current, day];
    setValue('diasSemana', updated);
  };

  const handleDayOfMonthToggle = (day: number) => {
    const current = selectedDiasMes;
    const updated = current.includes(day) ? current.filter((d) => d !== day) : [...current, day];
    setValue('diasMes', updated);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {initialData ? 'Editar Hábito' : 'Cadastrar Novo Hábito'}
          </h2>
        </div>

        <Input
          label="Nome do Hábito"
          {...register('nomeHabito')}
          error={errors.nomeHabito?.message}
          required
          placeholder="Ex: Ler 30 minutos"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <textarea
            {...register('descricao')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows={3}
            placeholder="Descreva seu hábito (opcional)"
          />
          {errors.descricao && (
            <p className="text-sm text-red-500 mt-1">{errors.descricao.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Frequência <span className="text-red-500">*</span>
          </label>
          <select
            {...register('frequencia')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="diária">Diária</option>
            <option value="semanal">Semanal</option>
            <option value="mensal">Mensal</option>
          </select>
          {errors.frequencia && (
            <p className="text-sm text-red-500 mt-1">{errors.frequencia.message}</p>
          )}
        </div>

        {frequencia === 'semanal' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dias da Semana <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {daysOfWeek.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDayOfWeekToggle(day)}
                  className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                    selectedDiasSemana.includes(day)
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary-600'
                  }`}
                >
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </button>
              ))}
            </div>
            {errors.diasSemana && (
              <p className="text-sm text-red-500 mt-1">{errors.diasSemana.message}</p>
            )}
          </div>
        )}

        {frequencia === 'mensal' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dias do Mês <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-7 gap-2">
              {daysOfMonth.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDayOfMonthToggle(day)}
                  className={`px-3 py-2 rounded-lg border-2 transition-colors ${
                    selectedDiasMes.includes(day)
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary-600'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
            {errors.diasMes && (
              <p className="text-sm text-red-500 mt-1">{errors.diasMes.message}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Horário de Início
            </label>
            <input
              type="time"
              {...register('horarioInicio')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {errors.horarioInicio && (
              <p className="text-sm text-red-500 mt-1">{errors.horarioInicio.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duração Estimada (minutos)
            </label>
            <input
              type="number"
              {...register('duracaoEstimada', { valueAsNumber: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="30"
            />
            {errors.duracaoEstimada && (
              <p className="text-sm text-red-500 mt-1">{errors.duracaoEstimada.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data de Início</label>
            <input
              type="date"
              {...register('dataInicio')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {errors.dataInicio && (
              <p className="text-sm text-red-500 mt-1">{errors.dataInicio.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data de Término</label>
            <input
              type="date"
              {...register('dataTermino')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {errors.dataTermino && (
              <p className="text-sm text-red-500 mt-1">{errors.dataTermino.message}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={isSubmitting} fullWidth>
            {isSubmitting ? 'Salvando...' : initialData ? 'Atualizar Hábito' : 'Cadastrar Hábito'}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel} fullWidth>
            Cancelar
          </Button>
        </div>
      </form>
    </Card>
  );
};
