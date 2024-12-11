import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { AxiosError } from "axios";
import GroupService from "./groups.service";
import { ApiError } from "next/dist/server/api-utils";
import { CreateGroupDto } from "./dto/create-group.dto";
import { GroupEntity } from "./entities/group.entity";
import { UpdateGroupDto } from "./dto/update-group.dto";

export const useGroupsController = () => {
  const queryClient = useQueryClient();

  // Запрос для получения всех пользователей
  const getGroups = useQuery({
    queryKey: ["groupList"],
    queryFn: GroupService.getGroups,
  });

  // Мутация для создания нового пользователя
  const createGroup = useMutation<
    GroupEntity,
    AxiosError<ApiError>,
    CreateGroupDto
  >({
    mutationFn: (data) =>
      toast
        .promise(GroupService.createGroup(data), {
          loading: "Создание группы...",
          success: () => {
            queryClient.invalidateQueries({ queryKey: ["groupList"] });
            return "Группа успешно создана";
          },
          error: (err) => {
            if (err.response?.data) {
              return `Произошла ошибка: ${err.response.data.message}`;
            }
            return "Ошибка при создании группы";
          },
        })
        .unwrap(),
  });

  // Мутация для обновления данных пользователя
  const updateGroup = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateGroupDto }) =>
      toast
        .promise(GroupService.updateGroup(id, data), {
          loading: "Обновление данных группы...",
          success: () => {
            queryClient.invalidateQueries({ queryKey: ["groupList"] });
            return "Данные группы успешно обновлены";
          },
          error: (err) => {
            if (err.response?.data) {
              return `Произошла ошибка: ${err.response.data.message}`;
            }
            return "Ошибка при обновлении данных группы";
          },
        })
        .unwrap(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groupList"] });
    },
  });

  // Мутация для удаления пользователя
  const deleteGroup = useMutation({
    mutationFn: ({ id }: { id: string }) =>
      toast
        .promise(GroupService.deleteGroup(id), {
          loading: "Удаление группы...",
          success: () => {
            queryClient.invalidateQueries({ queryKey: ["groupList"] });
            return "Группа успешно удалён";
          },
          error: (err) => {
            if (err.response?.data) {
              return `Произошла ошибка: ${err.response.data.message}`;
            }
            return "Ошибка при удалении группы";
          },
        })
        .unwrap(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groupList"] });
    },
  });

  return {
    groups: getGroups.data,
    isGroupsLoading: getGroups.isLoading,
    createGroup: createGroup.mutateAsync,
    updateGroup: updateGroup.mutateAsync,
    deleteGroup: deleteGroup.mutateAsync,
    isCreatingGroup: createGroup.isPending,
    isUpdatingGroup: updateGroup.isPending,
    isDeletingGroup: deleteGroup.isPending,
  };
};
