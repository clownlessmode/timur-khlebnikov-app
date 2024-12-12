import { useState, useEffect, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { SendDto } from "@/entities/messages/dto/send.dto";
import { MessageEntity } from "@/entities/messages/entities/message.entity";
import Variant from "@/entities/messages/entities/variant.enum";

export function useChatSocket(userId: string, currentRoomId: string) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<MessageEntity[]>([]);

  const addMessage = useCallback(
    (message: any) => {
      setMessages((prevMessages) => {
        const normalizedMessage: MessageEntity = {
          id: message.id || Date.now().toString(),
          content: message.message || message.content,
          variant: message.variant || Variant.INCOMING,
          created_at: message.created_at || new Date().toISOString(),
          updated_at: message.updated_at || new Date().toISOString(),
          isRead: true,
        };

        return [...prevMessages, normalizedMessage];
      });
    },
    [userId]
  );

  useEffect(() => {
    if (!userId) return;

    // Create socket connection
    const newSocket = io(`${process.env.NEXT_PUBLIC_API_WS_URL}`, {
      query: {
        userId,
        roomId: currentRoomId, // Передаем идентификатор текущей комнаты
      },
    });

    // Handle connection
    newSocket.on("connect", () => {
      const joinData = { id: userId };
      newSocket.emit("join", joinData);
    });

    // Handle incoming messages
    newSocket.on("new", (message: any) => {
      addMessage(message);
    });

    // Handle connection errors
    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [userId, addMessage]);

  const sendMessage = (message: string) => {
    if (message.trim() && socket) {
      const messageData: SendDto = {
        id: userId,
        message: message,
        variant: Variant.OUTGOING,
      };

      // Optimistically add the message to the list
      addMessage({
        content: message,
        variant: Variant.OUTGOING,
        id: Date.now().toString(), // Temporary ID
      });

      // Emit message to server
      socket.emit("send", messageData);
    }
  };

  const markMessageAsRead = (messageId: string) => {
    if (socket) {
      socket.emit("markAsRead", { messageId });
    }
  };

  // Обновленная функция markMultipleMessages, использующая markMessageAsRead
  const markMultipleMessages = (messageIds: string[]) => {
    if (socket) {
      messageIds.forEach((messageId) => {
        markMessageAsRead(messageId);
      });
    }
  };

  return { messages, sendMessage, socket, markMultipleMessages };
}
