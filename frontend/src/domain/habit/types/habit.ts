/**
 * @module habit/types
 * @summary Type definitions for habit domain
 */

export type HabitStatus = 'ativo' | 'inativo' | 'concluído';
export type HabitFrequency = 'diária' | 'semanal' | 'mensal';
export type DayOfWeek = 'segunda' | 'terça' | 'quarta' | 'quinta' | 'sexta' | 'sábado' | 'domingo';

export interface Habit {
  id: number;
  nomeHabito: string;
  descricao?: string;
  frequencia: HabitFrequency;
  diasSemana?: DayOfWeek[];
  diasMes?: number[];
  horarioInicio?: string;
  duracaoEstimada?: number;
  categoriaId?: number;
  dataInicio?: string;
  dataTermino?: string;
  dataCriacao: string;
  usuarioId: number;
  status: HabitStatus;
}

export interface HabitFormData {
  nomeHabito: string;
  descricao?: string;
  frequencia: HabitFrequency;
  diasSemana?: DayOfWeek[];
  diasMes?: number[];
  horarioInicio?: string;
  duracaoEstimada?: number;
  categoriaId?: number;
  dataInicio?: string;
  dataTermino?: string;
}

export interface HabitListParams {
  status?: HabitStatus;
  categoriaId?: number;
  frequencia?: HabitFrequency;
  ordenacao?: 'nome_asc' | 'nome_desc' | 'data_criacao_asc' | 'data_criacao_desc';
  page?: number;
  pageSize?: number;
}
