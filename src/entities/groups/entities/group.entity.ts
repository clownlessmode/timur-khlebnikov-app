import { UserEntity } from "@/entities/users/entities/user.entity";
import { DefaultEntity } from "@/shared/api/default.entity";

export interface GroupEntity extends DefaultEntity {
  name: string;
  users: UserEntity[];
}
