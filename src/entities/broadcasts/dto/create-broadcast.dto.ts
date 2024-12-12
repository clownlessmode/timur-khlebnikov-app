export interface CreateBroadcastDto {
  name: string;
  message: string;
  groupIds: string[];
  images?: File[]; // Добавлено для поддержки файлов
}
