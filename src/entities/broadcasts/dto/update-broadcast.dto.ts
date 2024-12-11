import BroadcastStatus from "../entities/broadcast-status.enum";

export interface UpdateBroadcastDto {
  name: string;
  message: string;
  groupIds: string[];
  status: BroadcastStatus;
}
