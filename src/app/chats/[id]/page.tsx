"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import generateName from "@/shared/utils/generate-name";
import { useSearchParams } from "next/navigation";
import SendMessages from "@/features/messages/SendMessages";
import { use, useEffect } from "react";
import ScreenContainer from "@/shared/containers/ScreenContainer";
import { useUsersController } from "@/entities/users/users.controller";
import { UserEntity } from "@/entities/users/entities/user.entity";
import MessagesList from "@/entities/messages/ui/MessagesList";
import { useChatSocket } from "@/entities/messages/useChatSocket";
import generateColor from "@/shared/utils/generate-color";
import { useMessagesController } from "@/entities/messages/messages.controller";

import { useMemo } from "react";
export default function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const searchParams = useSearchParams();
  const first_name = searchParams?.get("first_name") ?? undefined;
  const username = searchParams?.get("username") ?? undefined;
  const name = searchParams?.get("name") ?? null;

  const { id } = use(params);

  const { user, isUsersLoading } = useUsersController(id);
  const { markAsRead } = useMessagesController();
  const { messages, sendMessage } = useChatSocket(id, id);

  const unreadMessageIds = useMemo(() => {
    return user?.messages
      ? user.messages
          .filter((message) => !message.isRead)
          .map((message) => message.id)
      : [];
  }, [user?.messages]);

  useEffect(() => {
    const markUnreadMessages = async () => {
      if (unreadMessageIds.length > 0) {
        try {
          await markAsRead({
            data: { messageIds: unreadMessageIds },
          });
        } catch (error) {
          console.error("Error marking messages as read:", error);
        }
      }
    };

    markUnreadMessages();
  }, [unreadMessageIds]); // Эффект зависит только от мемоизированных данных

  return (
    <>
      <div className="border-t px-4 flex flex-row gap-1 py-2 items-center">
        <Link href={"/"}>
          <Button className="max-w-12" variant={"outline"}>
            <ArrowLeft />
          </Button>
        </Link>
        <p>
          Чат с пользователем{" "}
          <span
            className="font-semibold"
            style={{
              color: generateColor(id),
            }}
          >
            {generateName({
              first_name: first_name,
              username: username,
              id: id,
              name: name,
            })}
          </span>
        </p>
      </div>
      <ScreenContainer>
        <MessagesList
          isLoading={isUsersLoading}
          data={user || ({} as UserEntity)}
          messages={messages}
        />
      </ScreenContainer>
      <SendMessages onSendMessage={sendMessage} />
    </>
  );
}
