"use client";
import { Skeleton } from "@/shared/ui/skeleton";
import React, { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { motion } from "framer-motion";

import { GroupEntity } from "../entities/group.entity";
import UserAvatar from "@/entities/users/ui/UserAvatar";
import generateColor from "@/shared/utils/generate-color";
import generateName from "@/shared/utils/generate-name";
import formatPhone from "@/shared/utils/format-phone";
import EditGroup from "@/features/group/EditGroup";
import generateWordByCount from "@/shared/utils/generate-word-by-count";
import DeleteGroup from "../../../features/group/DeleteGroup";

interface Props {
  group: GroupEntity;
}

export const GroupCard = ({ group }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full bg-background rounded-md border p-2 gap-3">
      <button
        className="flex items-center justify-between w-full text-left"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex gap-2 items-center">
          <UserAvatar
            hash={group.id}
            status={false}
            text={""}
            avatarText={`${group.users.length}`}
          />
          <div className="flex flex-col">
            <h3 className="font-medium text-[16px]">{group.name}</h3>
            <p className="text-muted-foreground">
              {generateWordByCount(group.users.length, [
                "пользователь",
                "пользователя",
                "пользователей",
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
              {group.users.map((user) => (
                <div
                  key={group.id}
                  className="flex gap-1 items-center text-[14px]"
                >
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: generateColor(user.id) }}
                  ></div>
                  {generateName({
                    last_name: user.telegram.last_name,
                    first_name: user.telegram.first_name,
                    username: user.telegram.username,
                    id: user.id,
                    name: user.name,
                  })}
                  , {formatPhone(user.telephone)}
                </div>
              ))}
            </div>
            <EditGroup group={group} />
            <DeleteGroup group={group} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

GroupCard.Skeleton = function UserCardSkeleton() {
  return <Skeleton className="w-full h-16" />;
};
