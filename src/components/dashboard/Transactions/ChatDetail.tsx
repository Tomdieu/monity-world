import React from "react";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Star,
  Flag,
  MoreVertical,
  Printer,
  Mic,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MdAttachFile, MdImage } from "react-icons/md";

interface Message {
  id: string;
  content: string;
  timestamp: string;
  isSender: boolean;
  sender: {
    name: string;
    avatar: string;
  };
}

interface ChatDetailProps {
  messages: Message[];
  currentUser: {
    name: string;
    accountId: string;
    avatar: string;
  };
  recipient: {
    name: string;
    accountId: string;
    avatar: string;
  };
  status?: string;
  onBack?: () => void;
  className?: string;
}

const AudioVisualizer = () => (
  <div className="flex items-center gap-[2px] h-4 mx-2">
    <div
      className="w-[2px] h-3 bg-amber-400 animate-pulse"
      style={{ animationDelay: "0ms" }}
    ></div>
    <div
      className="w-[2px] h-2 bg-amber-400 animate-pulse"
      style={{ animationDelay: "200ms" }}
    ></div>
    <div
      className="w-[2px] h-4 bg-amber-400 animate-pulse"
      style={{ animationDelay: "150ms" }}
    ></div>
    <div
      className="w-[2px] h-2 bg-amber-400 animate-pulse"
      style={{ animationDelay: "300ms" }}
    ></div>
    <div
      className="w-[2px] h-3 bg-amber-400 animate-pulse"
      style={{ animationDelay: "75ms" }}
    ></div>
  </div>
);

const ChatDetail: React.FC<ChatDetailProps> = ({
  messages,
  currentUser,
  recipient,
  status = "Request",
  onBack,
  className,
}) => {
  return (
    <div className={cn("flex flex-col h-full bg-white rounded-lg", className)}>
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="size-5 text-gray-500" />
            </Button>

            <div className="flex items-center">
              <div className="flex items-center gap-1">
                <Image
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <h5 className="font-semibold text-xs">{currentUser.name}</h5>
                  <h6 className="text-muted-foreground text-xs/3">
                    {currentUser.accountId}
                  </h6>
                </div>
              </div>

              <AudioVisualizer />
              <div className="flex items-center gap-2 pl-1 pr-3 py-1">
                <Image
                  src={recipient.avatar}
                  alt={recipient.name}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <div>
                  <h5 className="font-semibold text-xs">{recipient.name}</h5>
                  <h6 className="text-xs/3 text-muted-foreground">
                    {recipient.accountId}
                  </h6>
                </div>
              </div>
            </div>

            <span className="px-2 py-1.5 text-xs rounded-lg bg-purple-100 text-purple-600">
              {status}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100 text-gray-500"
            >
              <Printer className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100 text-blue-500"
            >
              <Star className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100 text-red-500"
            >
              <Flag className="size-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-start gap-3 max-w-2xl",
              message.isSender ? "ml-auto" : ""
            )}
          >
            {!message.isSender && (
              <Image
                src={message.sender.avatar}
                alt={message.sender.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
            )}
            <div
              className={cn(
                "relative group",
                message.isSender ? "ml-auto" : ""
              )}
            >
              <div
                className={cn(
                  "p-4 rounded-lg",
                  message.isSender
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700"
                )}
              >
                <p className="text-sm">{message.content}</p>
              </div>
              <div
                className={cn(
                  "flex items-center gap-2 mt-1",
                  message.isSender ? "justify-end" : ""
                )}
              >
                <span className="text-xs text-gray-500">
                  {message.timestamp}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="size-4 text-gray-400" />
                </Button>
              </div>
            </div>
            {message.isSender && (
              <Image
                src={message.sender.avatar}
                alt={message.sender.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const ChatInput = ({className}:{className?:string}) => {
  return (
    <div className={cn("flex items-center gap-2 w-full py-4 px-5",className)}>
      <Button
        className="rounded-full bg-gray-100 hover:bg-gray-100/80"
        size={"icon"}
      >
        <Mic className="text-muted-foreground" />
      </Button>
      <div className="flex flex-1 items-center gap-3 p-4 border-t border-gray-100">
        <input
          type="text"
          placeholder="write a message"
          className="flex-1 border-none outline-none bg-transparent focus:ring-0"
        />
        <Button
          className="rounded-full bg-gray-100 hover:bg-gray-100/80"
          size={"icon"}
        >
          <MdAttachFile className="size-5 text-muted-foreground" />
        </Button>
        <Button
          className="rounded-full bg-gray-100 hover:bg-gray-100/80"
          size={"icon"}
        >
          <MdImage className="size-5 text-muted-foreground" />
        </Button>
        <Button variant={"secondary"}>Send</Button>
      </div>
    </div>
  );
};

export default ChatDetail;

