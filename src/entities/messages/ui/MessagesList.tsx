import React from "react";
import NotFound from "@/widgets/not-found/NotFound";
import { UserEntity } from "@/entities/users/entities/user.entity";
import { MessageCard } from "./MessageCard";
import generateName from "@/shared/utils/generate-name";
import { MessageEntity } from "@/entities/messages/entities/message.entity";

interface Props {
  data: UserEntity;
  isLoading: boolean;
  messages?: MessageEntity[];
}

const MessagesList = ({ data, isLoading, messages = [] }: Props) => {
  if (isLoading) {
    return (
      <>
        {Array(7)
          .fill(0)
          .map((_, index) => (
            <MessageCard.Skeleton key={index} />
          ))}
      </>
    );
  }

  const allMessages = [...(data.messages || []), ...messages];

  if (!data || allMessages.length === 0 || isLoading) {
    return <NotFound />;
  }

  return allMessages.map((message, index) => (
    <MessageCard
      key={`${message.id}-${index}`}
      message={message}
      id={data.id}
      name={generateName({
        first_name: data.telegram?.first_name,
        username: data.telegram?.username,
        id: data.id,
        name: data.name,
      })}
    />
  ));
};

export default MessagesList;
