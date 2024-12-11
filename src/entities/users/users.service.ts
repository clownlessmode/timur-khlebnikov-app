import baseApi from "@/shared/api/base.api";
import { UserEntity } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

class UsersService {
  // Метод для получения всех пользователей
  static async getUsers(): Promise<UserEntity[]> {
    const response = await baseApi.get<UserEntity[]>("/users");
    return response.data;
  }

  // Метод для получения одного пользователя по ID
  static async getUser(id: string): Promise<UserEntity> {
    const response = await baseApi.get<UserEntity>(`/users/${id}`);
    return response.data;
  }

  // Метод для создания нового пользователя
  static async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const response = await baseApi.post<UserEntity>("/users", dto);
    return response.data;
  }

  // Метод для обновления данных пользователя
  static async updateUser(id: string, dto: UpdateUserDto): Promise<UserEntity> {
    const response = await baseApi.put<UserEntity>(`/users/${id}`, dto);
    return response.data;
  }

  static async getUserById(id: string): Promise<UserEntity> {
    const response = await baseApi.get<UserEntity>(`/users/${id}`);
    return response.data;
  }

  // Метод для удаления пользователя
  static async deleteUser(id: string): Promise<void> {
    await baseApi.delete(`/users/${id}`);
  }

  static async contactToUser(id: string): Promise<void> {
    await baseApi.post(`/bot/${id}`);
  }
}

export default UsersService;
