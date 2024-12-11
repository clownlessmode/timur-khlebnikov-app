"use client";
import { Skeleton } from "@/shared/ui/skeleton";
import React from "react";
import { MessageEntity } from "../entities/message.entity";
import generateColor from "@/shared/utils/generate-color";
import Variant from "../entities/variant.enum";
import formatDate from "@/shared/utils/format-date";

interface Props {
  message: MessageEntity;
  name: string;
  id: string;
}

export const MessageCard = ({ message, name, id }: Props) => {
  return (
    <div className=" w-full bg-background rounded-md border p-2 flex gap-2 items-start">
      <div
        className="h-6 w-6 rounded-md"
        style={{
          backgroundColor: generateColor(
            message.variant === Variant.OUTGOING ? "Вы" : id
          ),
        }}
      ></div>
      <div className="flex flex-col w-full">
        <div className="justify-between flex w-full items-center">
          <h3 className="font-medium text-[16px] justify-between flex">
            {message.variant === Variant.OUTGOING ? "Вы" : name}
          </h3>
          <p className="opacity-50">
            {formatDate(message.created_at).replace(/\.\d{2},/, "")}
          </p>
        </div>
        <p className="text-muted-foreground">{message.content}</p>
      </div>
    </div>
  );
};

MessageCard.Skeleton = function UserCardSkeleton() {
  return <Skeleton className="w-full h-16" />;
};
