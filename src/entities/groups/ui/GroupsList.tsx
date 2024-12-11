import React from "react";
import { GroupCard } from "./GroupCard";
import { GroupEntity } from "../entities/group.entity";
import NotFound from "@/widgets/not-found/NotFound";

import AddGroup from "@/features/group/AddGroup";

interface Props {
  data: GroupEntity[];
  isLoading: boolean;
}

const GroupsList = ({ data, isLoading }: Props) => {
  if (isLoading) {
    // Показываем 7 skeletons, пока данные загружаются
    return (
      <>
        {Array(7)
          .fill(0)
          .map((_, index) => (
            <GroupCard.Skeleton key={index} />
          ))}
      </>
    );
  }

  // Если данные загружены
  return data && data.length !== 0 ? (
    // Если данные не пустые, отображаем пользователей
    data.map((group) => <GroupCard key={group.id} group={group} />)
  ) : (
    <NotFound trigger={<AddGroup />} />
  );
};

export default GroupsList;
