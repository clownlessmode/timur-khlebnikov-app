import { cn } from "@/shared/lib/utils";
import generateColor from "@/shared/utils/generate-color";

interface Props {
  hash: string;
  status: boolean; // Статус забанен/не забанен
  text: string | number; // Количество непрочитанных сообщений
  avatarText?: string;
}

const UserAvatar = ({ hash, status, text, avatarText }: Props) => {
  // Проверяем, является ли text числом и больше ли оно 0
  const isUnreadMessages = typeof text === "number" && text > 0;

  // Условие для отображения бордера и круга
  const shouldDisplayBadge = status || isUnreadMessages;

  return (
    <div className="relative">
      <div
        className="w-12 h-12 rounded-md flex items-center justify-center"
        style={{ backgroundColor: generateColor(hash) }}
      >
        <p className="text-background uppercase">{avatarText}</p>
      </div>

      {shouldDisplayBadge && (
        <div
          className={cn(
            "absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center",
            status ? "bg-red-500" : isUnreadMessages ? "bg-green-500" : "",
            status || isUnreadMessages ? "border-2 border-white" : ""
          )}
        >
          {/* Если есть непрочитанные сообщения, показываем их количество */}
          {isUnreadMessages && (
            <span className="text-white text-[10px] font-medium">{text}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
