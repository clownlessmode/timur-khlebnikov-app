import { GroupEntity } from "@/entities/groups/entities/group.entity";
import { UserEntity } from "@/entities/users/entities/user.entity";

function uniqueUsers(groups: GroupEntity[]): UserEntity[] {
  const usersSet = new Set<string>(); // Множество для уникальных идентификаторов пользователей
  const uniqueUsers: UserEntity[] = []; // Массив для уникальных пользователей

  groups.forEach((group) => {
    group.users.forEach((user) => {
      if (!usersSet.has(user.id)) {
        usersSet.add(user.id); // Добавляем ID пользователя в Set, чтобы избежать дублирования
        uniqueUsers.push(user); // Добавляем пользователя в массив
      }
    });
  });

  return uniqueUsers;
}
export default uniqueUsers;
