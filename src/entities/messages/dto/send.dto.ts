import Variant from "../entities/variant.enum";

export interface SendDto {
  id: string;
  message: string;
  variant: Variant;
}
