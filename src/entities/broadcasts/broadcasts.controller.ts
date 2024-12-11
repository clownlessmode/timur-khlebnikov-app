import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { AxiosError } from "axios";
import BroadcastService from "./broadcasts.service";
import { ApiError } from "next/dist/server/api-utils";
import { BroadcastEntity } from "./entities/broadcast.entity";
import { UpdateBroadcastDto } from "./dto/update-broadcast.dto";

export const useBroadcastsController = () => {
  const queryClient = useQueryClient();

  // Запрос для получения всех пользователей
  const getBroadcasts = useQuery({
    queryKey: ["broadcastList"],
    queryFn: BroadcastService.getBroadcasts,
  });

  // Мутация для создания нового пользователя
  const createBroadcast = useMutation<
    BroadcastEntity,
    AxiosError<ApiError>,
    any
  >({
    mutationFn: (data) =>
      toast
        .promise(BroadcastService.createBroadcast(data), {
          loading: "Создание рассылки...",
          success: () => {
            queryClient.invalidateQueries({ queryKey: ["broadcastList"] });
            return "Рассылка успешно создана";
          },
          error: (err) => {
            if (err.response?.data) {
              return `Произошла ошибка: ${err.response.data.message}`;
            }
            return "Ошибка при создании рассылки";
          },
        })
        .unwrap(),
  });

  // Мутация для обновления данных пользователя
  const updateBroadcast = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBroadcastDto }) =>
      toast
        .promise(BroadcastService.updateBroadcast(id, data), {
          loading: "Обновление данных рассылки...",
          success: () => {
            queryClient.invalidateQueries({ queryKey: ["broadcastList"] });
            return "Данные рассылки успешно обновлены";
          },
          error: (err) => {
            if (err.response?.data) {
              return `Произошла ошибка: ${err.response.data.message}`;
            }
            return "Ошибка при обновлении данных рассылки";
          },
        })
        .unwrap(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["broadcastList"] });
    },
  });

  // Мутация для удаления пользователя
  const deleteBroadcast = useMutation({
    mutationFn: ({ id }: { id: string }) =>
      toast
        .promise(BroadcastService.deleteBroadcast(id), {
          loading: "Удаление рассылки...",
          success: () => {
            queryClient.invalidateQueries({ queryKey: ["broadcastList"] });
            return "Рассылка успешно удалён";
          },
          error: (err) => {
            if (err.response?.data) {
              return `Произошла ошибка: ${err.response.data.message}`;
            }
            return "Ошибка при удалении рассылки";
          },
        })
        .unwrap(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["broadcastList"] });
    },
  });

  return {
    broadcasts: getBroadcasts.data,
    isBroadcastsLoading: getBroadcasts.isLoading,
    createBroadcast: createBroadcast.mutateAsync,
    updateBroadcast: updateBroadcast.mutateAsync,
    deleteBroadcast: deleteBroadcast.mutateAsync,
    isCreatingBroadcast: createBroadcast.isPending,
    isUpdatingBroadcast: updateBroadcast.isPending,
    isDeletingBroadcast: deleteBroadcast.isPending,
  };
};
