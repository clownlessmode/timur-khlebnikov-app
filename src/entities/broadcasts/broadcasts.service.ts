import baseApi from "@/shared/api/base.api";
import { BroadcastEntity } from "./entities/broadcast.entity";
import { CreateBroadcastDto } from "./dto/create-broadcast.dto";
import { UpdateBroadcastDto } from "./dto/update-broadcast.dto";

class BroadcastsService {
  static async getBroadcasts(): Promise<BroadcastEntity[]> {
    const response = await baseApi.get<BroadcastEntity[]>("/broadcasts");
    return response.data;
  }

  static async getBroadcast(id: string): Promise<BroadcastEntity> {
    const response = await baseApi.get<BroadcastEntity>(`/broadcasts/${id}`);
    return response.data;
  }

  static async createBroadcast(
    dto: CreateBroadcastDto
  ): Promise<BroadcastEntity> {
    // const formData = new FormData();

    // // Добавляем текстовые поля
    // formData.append("name", dto.name);
    // formData.append("message", dto.message);

    // // Добавляем group ids
    // dto.groupIds.forEach((groupId, index) => {
    //   formData.append(`groupIds[${index}]`, groupId);
    // });

    // // Добавляем изображения, если есть
    // if (dto.images) {
    //   dto.images.forEach((image, index) => {
    //     formData.append(`images`, image);
    //   });
    // }

    const response = await baseApi.post<BroadcastEntity>("/broadcasts", dto, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }

  static async updateBroadcast(
    id: string,
    dto: UpdateBroadcastDto
  ): Promise<BroadcastEntity> {
    const response = await baseApi.patch<BroadcastEntity>(
      `/broadcasts/${id}`,
      dto
    );
    return response.data;
  }

  static async deleteBroadcast(id: string): Promise<void> {
    await baseApi.delete(`/broadcasts/${id}`);
  }
}

export default BroadcastsService;
