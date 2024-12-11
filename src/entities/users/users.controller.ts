import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { AxiosError } from "axios";
import UserService from "./users.service";
import { ApiError } from "next/dist/server/api-utils";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./entities/user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";

export const useUsersController = (id?: string) => {
  const queryClient = useQueryClient();

  // Запрос для получения всех пользователей
  const getUsers = useQuery({
    queryKey: ["userList"],
    queryFn: UserService.getUsers,
  });

  const getUserById = useQuery({
    queryKey: ["user", id],
    queryFn: () => {
      if (!id) throw new Error("ID пользователя не указан");
      return UserService.getUserById(id);
    },
    enabled: !!id, // Запрос выполняется только если передан ID
  });

  // Мутация для создания нового пользователя
  const createUser = useMutation<
    UserEntity,
    AxiosError<ApiError>,
    CreateUserDto
  >({
    mutationFn: (data) =>
      toast
        .promise(UserService.createUser(data), {
          loading: "Создание пользователя...",
          success: () => {
            queryClient.invalidateQueries({ queryKey: ["userList"] });
            return "Пользователь успешно создан";
          },
          error: (err) => {
            if (err.response?.data) {
              return `Произошла ошибка: ${err.response.data.message}`;
            }
            return "Ошибка при создании пользователя";
          },
        })
        .unwrap(),
  });

  // Мутация для обновления данных пользователя
  const updateUser = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserDto }) =>
      toast
        .promise(UserService.updateUser(id, data), {
          loading: "Обновление данных пользователя...",
          success: () => {
            queryClient.invalidateQueries({ queryKey: ["userList"] });
            return "Данные пользователя успешно обновлены";
          },
          error: (err) => {
            if (err.response?.data) {
              return `Произошла ошибка: ${err.response.data.message}`;
            }
            return "Ошибка при обновлении данных пользователя";
          },
        })
        .unwrap(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userList"] });
    },
  });

  const contactToUser = useMutation({
    mutationFn: ({ id }: { id: string }) =>
      toast
        .promise(UserService.contactToUser(id), {
          loading: "Отправка контактов...",
          success: () => {
            return "Контакты успешно отправлены";
          },
          error: (err) => {
            if (err.response?.data) {
              return `Произошла ошибка: ${err.response.data.message}`;
            }
            return "Ошибка при отправке контактов";
          },
        })
        .unwrap(),
  });

  // Мутация для удаления пользователя
  const deleteUser = useMutation({
    mutationFn: ({ id }: { id: string }) =>
      toast
        .promise(UserService.deleteUser(id), {
          loading: "Удаление пользователя...",
          success: () => {
            queryClient.invalidateQueries({ queryKey: ["userList"] });
            return "Пользователь успешно удалён";
          },
          error: (err) => {
            if (err.response?.data) {
              return `Произошла ошибка: ${err.response.data.message}`;
            }
            return "Ошибка при удалении пользователя";
          },
        })
        .unwrap(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userList"] });
    },
  });

  return {
    users: getUsers.data,
    user: getUserById.data,
    isUsersLoading: getUsers.isLoading,
    isUserLoading: getUserById.isLoading,
    createUser: createUser.mutateAsync,
    updateUser: updateUser.mutateAsync,
    deleteUser: deleteUser.mutateAsync,
    contactUser: contactToUser.mutateAsync,
    isContactingUser: contactToUser.isPending,
    isCreatingUser: createUser.isPending,
    isUpdatingUser: updateUser.isPending,
    isDeletingUser: deleteUser.isPending,
  };
};
