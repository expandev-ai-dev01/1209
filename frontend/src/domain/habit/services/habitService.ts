/**
 * @service habitService
 * @summary Habit management service for authenticated endpoints
 * @domain habit
 * @type rest-service
 * @apiContext internal
 */

import { authenticatedClient } from '@/core/lib/api';
import type { Habit, HabitFormData, HabitListParams } from '../types';
import type { PaginatedResponse } from '@/core/types';

export const habitService = {
  /**
   * @endpoint GET /api/v1/internal/habit
   * @summary Fetches list of habits with filters
   */
  async list(params?: HabitListParams): Promise<PaginatedResponse<Habit>> {
    const response = await authenticatedClient.get('/habit', { params });
    return response.data;
  },

  /**
   * @endpoint GET /api/v1/internal/habit/:id
   * @summary Fetches single habit by ID
   */
  async getById(id: number): Promise<Habit> {
    const response = await authenticatedClient.get(`/habit/${id}`);
    return response.data.data;
  },

  /**
   * @endpoint POST /api/v1/internal/habit
   * @summary Creates new habit
   */
  async create(data: HabitFormData): Promise<Habit> {
    const response = await authenticatedClient.post('/habit', data);
    return response.data.data;
  },

  /**
   * @endpoint PUT /api/v1/internal/habit/:id
   * @summary Updates existing habit
   */
  async update(id: number, data: Partial<HabitFormData>): Promise<Habit> {
    const response = await authenticatedClient.put(`/habit/${id}`, data);
    return response.data.data;
  },

  /**
   * @endpoint DELETE /api/v1/internal/habit/:id
   * @summary Deletes habit
   */
  async delete(id: number): Promise<void> {
    await authenticatedClient.delete(`/habit/${id}`);
  },

  /**
   * @endpoint POST /api/v1/internal/habit/:id/duplicate
   * @summary Duplicates an existing habit
   */
  async duplicate(id: number, nomeNovoHabito: string): Promise<Habit> {
    const response = await authenticatedClient.post(`/habit/${id}/duplicate`, {
      nomeNovoHabito,
    });
    return response.data.data;
  },
};
