import { useMutation, useQueryClient } from "@tanstack/react-query";
import MessagesService from "./messages.service";
import { MarkMessagesAsReadDto } from "./dto/markAsRead.dto";

export const useMessagesController = () => {
  const queryClient = useQueryClient();

  // Запрос для получения всех пользователей

  const markAsRead = useMutation({
    mutationFn: ({ data }: { data: MarkMessagesAsReadDto }) =>
      MessagesService.markAsRead(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userList"] });
    },
  });

  return {
    markAsRead: markAsRead.mutateAsync,
  };
};
