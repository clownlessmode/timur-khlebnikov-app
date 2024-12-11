import baseApi from "@/shared/api/base.api";
import { GroupEntity } from "./entities/group.entity";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";

class GroupsService {
  static async getGroups(): Promise<GroupEntity[]> {
    const response = await baseApi.get<GroupEntity[]>("/groups");
    return response.data;
  }

  static async getGroup(id: string): Promise<GroupEntity> {
    const response = await baseApi.get<GroupEntity>(`/groups/${id}`);
    return response.data;
  }

  static async createGroup(dto: CreateGroupDto): Promise<GroupEntity> {
    const response = await baseApi.post<GroupEntity>("/groups", dto);
    return response.data;
  }

  static async updateGroup(
    id: string,
    dto: UpdateGroupDto
  ): Promise<GroupEntity> {
    const response = await baseApi.patch<GroupEntity>(`/groups/${id}`, dto);
    return response.data;
  }

  static async deleteGroup(id: string): Promise<void> {
    await baseApi.delete(`/groups/${id}`);
  }
}

export default GroupsService;
