"use client";
import { Skeleton } from "@/shared/ui/skeleton";
import React, { useRef, useState } from "react";
import { UserEntity } from "../entities/user.entity";
import {
  ArrowUpRight,
  Bot,
  Calendar,
  MapPin,
  MessageCircle,
  MessageSquare,
  User,
} from "lucide-react";

import generateColor from "@/shared/utils/generate-color";
import { motion } from "framer-motion";
import generateName from "@/shared/utils/generate-name";
import formatPhone from "@/shared/utils/format-phone";
import formatDate from "@/shared/utils/format-date";
import { Badge } from "@/shared/ui/badge";
import DetailItem from "@/shared/ui/DetailItem";
import UserAvatar from "./UserAvatar";
import { Button } from "@/shared/ui/button";

import Link from "next/link";
import EditUser from "@/features/user/EditUser";
import firstWords from "@/shared/utils/first-words";
import { useUsersController } from "../users.controller";
import Spinner from "@/shared/ui/Spinner";

interface Props {
  user: UserEntity;
}

export const UserCard = ({ user }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { contactUser, isContactingUser } = useUsersController();
  const searchParams = new URLSearchParams({
    first_name: user.telegram.first_name || "",
    username: user.telegram.username || "",
    name: user.name || "",
  }).toString();

  return (
    <div className="w-full bg-background rounded-md border p-2 gap-3">
      <button
        className="flex items-center justify-between w-full text-left"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex gap-2 items-center">
          <UserAvatar
            hash={user.id}
            status={user.hasBanned}
            text={0}
            avatarText={firstWords(
              generateName({
                first_name: user.telegram.first_name,
                username: user.telegram.username,
                id: user.id,
                name: user.name,
              })
            )}
          />
          <div className="flex flex-col">
            <h3 className="font-medium text-[16px]">
              {generateName({
                first_name: user.telegram.first_name,
                username: user.telegram.username,
                id: user.id,
                name: user.name,
              })}
            </h3>
            <p className="text-muted-foreground">
              {formatPhone(user.telephone)}
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
              <div className="flex gap-2 text-muted-foreground items-start">
                <User className="w-5 h-5" />
                <span className="flex flex-row gap-1 items-center w-full flex-wrap">
                  {user.groups.length > 0
                    ? user.groups.map((group) => (
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
              <DetailItem icon={MapPin} label={user.region || "Нет данных"} />
              <DetailItem icon={Calendar} label={formatDate(user.created_at)} />
              <DetailItem
                icon={MessageSquare}
                label={user.comment || "Нет данных"}
              />
              {user.hasBanned && (
                <DetailItem
                  icon={Bot}
                  label="Бот заблокирован"
                  className="text-red-500"
                />
              )}
            </div>
            <div className="flex flex-row gap-2">
              <Link href={`/chats/${user.id}?${searchParams}`}>
                <Button>
                  <Bot className="w-4 h-4" />
                  Написать через бота
                </Button>
              </Link>
              <Button
                className="w-full justify-center items-center"
                variant={"outline"}
                onClick={() => contactUser({ id: user.id })}
              >
                {isContactingUser ? (
                  <Spinner />
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4" />
                    Написать лично
                  </>
                )}
              </Button>
            </div>
            <EditUser user={user} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

UserCard.Skeleton = function UserCardSkeleton() {
  return <Skeleton className="w-full h-16" />;
};
