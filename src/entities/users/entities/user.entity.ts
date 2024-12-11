import { DefaultEntity } from "@/shared/api/default.entity";
import { TelegramEntity } from "./telegram.entity";
import { RoleEnum } from "./role.enum";
import { GroupEntity } from "@/entities/groups/entities/group.entity";
import { MessageEntity } from "@/entities/messages/entities/message.entity";

export interface UserEntity extends DefaultEntity {
  telegram: TelegramEntity;
  name: string;
  telephone: string;
  region: string;
  comment: string;
  hasBanned: boolean;
  role: RoleEnum;
  groups: GroupEntity[];
  messages: MessageEntity[];
}
