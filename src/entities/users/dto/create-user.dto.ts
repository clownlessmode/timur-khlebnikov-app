import { RoleEnum } from "../entities/role.enum";
import { TelegramEntity } from "../entities/telegram.entity";

export interface CreateUserDto {
  telegram: TelegramEntity;
  groups: string[];
  name: string;
  telephone: string;
  region: string;
  comment: string;
  hasBanned: boolean;
  role: RoleEnum;
}
