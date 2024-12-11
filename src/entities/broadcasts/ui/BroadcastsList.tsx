import React from "react";
import { BroadcastEntity } from "../entities/broadcast.entity";
import { BroadcastCard } from "./BroadcastCard";
import NotFound from "@/widgets/not-found/NotFound";
import AddBroadcast from "@/features/broadcast/AddBroadcast";

interface Props {
  data: BroadcastEntity[];
  isLoading: boolean;
}

const BroadcastsList = ({ data, isLoading }: Props) => {
  if (isLoading) {
    // Показываем 7 skeletons, пока данные загружаются
    return (
      <>
        {Array(7)
          .fill(0)
          .map((_, index) => (
            <BroadcastCard.Skeleton key={index} />
          ))}
      </>
    );
  }

  // Если данные загружены
  return data && data.length !== 0 ? (
    // Если данные не пустые, отображаем пользователей
    data.map((broadcast) => (
      <BroadcastCard key={broadcast.id} broadcast={broadcast} />
    ))
  ) : (
    <NotFound trigger={<AddBroadcast />} />
  );
};

export default BroadcastsList;
