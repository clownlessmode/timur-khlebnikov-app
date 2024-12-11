"use client";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Send } from "lucide-react";
import React, { useState } from "react";

interface SendMessagesProps {
  onSendMessage: (message: string) => void;
}

const SendMessages: React.FC<SendMessagesProps> = ({ onSendMessage }) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="border-t px-4 flex flex-row gap-1 py-2">
      <Input
        placeholder="Введите сообщение..."
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button className="max-w-12" onClick={handleSendMessage}>
        <Send />
      </Button>
    </div>
  );
};

export default SendMessages;
