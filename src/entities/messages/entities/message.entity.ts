import { DefaultEntity } from "@/shared/api/default.entity";
import Variant from "./variant.enum";

export interface MessageEntity extends DefaultEntity {
  content: string;
  variant: Variant;
}
