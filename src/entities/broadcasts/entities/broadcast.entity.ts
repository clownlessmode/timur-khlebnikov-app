import { GroupEntity } from "@/entities/groups/entities/group.entity";
import { DefaultEntity } from "@/shared/api/default.entity";
import BroadcastStatus from "./broadcast-status.enum";

export interface BroadcastEntity extends DefaultEntity {
  name: string;
  message: string;
  files: Buffer[];
  groups: GroupEntity[];
  status: BroadcastStatus;
  // images: string[];
}
