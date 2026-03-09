import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../services/api/client';
import { QueueItem } from '../types';

export const useQueue = () => {
  return useQuery<QueueItem[]>({
    queryKey: ['queue'],
    queryFn: async () => {
      const { data } = await apiClient.get('/queue');
      return data;
    },
  });
};

export const useJoinQueue = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Partial<QueueItem>) => {
      const { data } = await apiClient.post('/queue/join', payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['queue'] });
    },
  });
};