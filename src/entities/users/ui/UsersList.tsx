import React from "react";
import { UserEntity } from "../entities/user.entity";
import { UserCard } from "./UserCard";
import NotFound from "@/widgets/not-found/NotFound";

interface Props {
  data: UserEntity[];
  isLoading: boolean;
}

const UsersList = ({ data, isLoading }: Props) => {
  if (isLoading) {
    // Показываем 7 skeletons, пока данные загружаются
    return (
      <>
        {Array(7)
          .fill(0)
          .map((_, index) => (
            <UserCard.Skeleton key={index} />
          ))}
      </>
    );
  }

  // Если данные загружены
  return data && data.length !== 0 ? (
    // Если данные не пустые, отображаем пользователей
    data.map((user) => <UserCard key={user.id} user={user} />)
  ) : (
    <NotFound />
  );
};

export default UsersList;
