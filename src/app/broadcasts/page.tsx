"use client";

import { useBroadcastsController } from "@/entities/broadcasts/broadcasts.controller";
import { BroadcastEntity } from "@/entities/broadcasts/entities/broadcast.entity";
import BroadcastsList from "@/entities/broadcasts/ui/BroadcastsList";
import AddBroadcast from "@/features/broadcast/AddBroadcast";
import ScreenContainer from "@/shared/containers/ScreenContainer";
import { Navigation } from "@/widgets/navigation/Navigation";

export default function Page() {
  const { broadcasts, isBroadcastsLoading } = useBroadcastsController();
  return (
    <>
      <ScreenContainer>
        <BroadcastsList
          isLoading={isBroadcastsLoading}
          data={broadcasts as BroadcastEntity[]}
        />
      </ScreenContainer>
      <Navigation>
        {broadcasts && broadcasts?.length > 0 && <AddBroadcast />}
      </Navigation>
    </>
  );
}
