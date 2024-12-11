"use client";

import { UserEntity } from "@/entities/users/entities/user.entity";
import UsersList from "@/entities/users/ui/UsersList";
import { useUsersController } from "@/entities/users/users.controller";
import ScreenContainer from "@/shared/containers/ScreenContainer";
import { Navigation } from "@/widgets/navigation/Navigation";
import React from "react";

export default function Page() {
  const { users, isUsersLoading } = useUsersController();
  return (
    <>
      <ScreenContainer>
        <UsersList isLoading={isUsersLoading} data={users as UserEntity[]} />
      </ScreenContainer>
      <Navigation />
    </>
  );
}
