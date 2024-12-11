"use client";

import { GroupEntity } from "@/entities/groups/entities/group.entity";
import { useGroupsController } from "@/entities/groups/groups.controller";
import GroupsList from "@/entities/groups/ui/GroupsList";

import ScreenContainer from "@/shared/containers/ScreenContainer";
import React from "react";
import AddGroup from "@/features/group/AddGroup";
import { Navigation } from "../../widgets/navigation/Navigation";

export default function Page() {
  const { groups, isGroupsLoading } = useGroupsController();
  return (
    <>
      <ScreenContainer>
        <GroupsList
          isLoading={isGroupsLoading}
          data={groups as GroupEntity[]}
        />
      </ScreenContainer>
      <Navigation>{groups && groups?.length > 0 && <AddGroup />}</Navigation>
    </>
  );
}
