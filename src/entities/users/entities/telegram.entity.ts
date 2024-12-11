import { DefaultEntity } from "@/shared/api/default.entity";

export interface TelegramEntity extends DefaultEntity {
  telegram_id: number;
  username: string;
  first_name?: string;
  language_code: string;
  is_bot: boolean;
}
