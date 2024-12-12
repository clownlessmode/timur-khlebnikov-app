import baseApi from "@/shared/api/base.api";
import { MarkMessagesAsReadDto } from "./dto/markAsRead.dto";

class MessagesService {
  static async markAsRead(dto: MarkMessagesAsReadDto): Promise<any> {
    const response = await baseApi.post<any>(`/messages/mark-as-read`, dto);
    return response.data;
  }
}
export default MessagesService;
