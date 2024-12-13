"use client";
import { Skeleton } from "@/shared/ui/skeleton";
import React, { useRef, useState } from "react";
import { ArrowUpRight, Calendar, MessageSquare, User } from "lucide-react";

import { motion } from "framer-motion";

import generateColor from "@/shared/utils/generate-color";

import generateWordByCount from "@/shared/utils/generate-word-by-count";
import { BroadcastEntity } from "../entities/broadcast.entity";
import uniqueUsers from "@/shared/utils/unique-users";
import DetailItem from "@/shared/ui/DetailItem";
import { Badge } from "@/shared/ui/badge";
import formatDate from "@/shared/utils/format-date";
import DeleteBroadcast from "../../../features/broadcast/DeleteBroadcast";

interface Props {
  broadcast: BroadcastEntity;
}
// sads
export const BroadcastCard = ({ broadcast }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const groups = broadcast.groups || []; // Защищаемся от undefined
  const uniqueUsersCount = uniqueUsers(groups).length; // Количество уникальных пользователей
  return (
    <div className="w-full bg-background rounded-md border p-2 gap-3">
      <button
        className="flex items-center justify-between w-full text-left"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex gap-2 items-center">
          {/* <UserAvatar hash={broadcast.id} status={false} text={""} /> */}
          <div className="flex flex-col">
            <h3 className="font-medium text-[16px]">{broadcast.name}</h3>
            <p className="text-muted-foreground">
              {generateWordByCount(uniqueUsersCount, [
                "уникальный пользователь рассылки",
                "уникальных пользователя рассылки",
                "уникальных пользователей рассылки",
              ])}
            </p>
          </div>
        </div>
        <ArrowUpRight
          color="#60646C"
          className={`transform transition-transform ${
            isExpanded ? "rotate-90" : ""
          }`}
        />
      </button>
      {/* Анимация раскрывающегося контента */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? contentRef.current?.scrollHeight || "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
      >
        <div ref={contentRef} className="pb-4">
          <div className="flex flex-col gap-3 mt-3">
            <div className="space-y-1">
              <DetailItem icon={MessageSquare} label={broadcast.message} />
              <DetailItem
                icon={Calendar}
                label={formatDate(broadcast.created_at)}
              />
              <div className="flex gap-2 text-muted-foreground items-start">
                <User className="w-5 h-5" />
                <span className="flex flex-row gap-1 items-center w-full flex-wrap">
                  {broadcast.groups.length > 0
                    ? broadcast.groups.map((group) => (
                        <Badge
                          key={group.id}
                          style={{ backgroundColor: generateColor(group.id) }}
                        >
                          {group.name}
                        </Badge>
                      ))
                    : "Нет групп"}
                </span>
              </div>
            </div>
            <DeleteBroadcast broadcast={broadcast} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

BroadcastCard.Skeleton = function UserCardSkeleton() {
  return <Skeleton className="w-full h-16" />;
};
