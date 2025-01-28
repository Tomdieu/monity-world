import React from "react";
import { cn } from "@/lib/utils";
import {
  Star,
  Filter,
  ChevronLeft,
  ChevronRight,
  Volume2,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import Link from "next/link";

type MessageStatus = "Request" | "Spam" | "First time" | "Stared" | "";

interface ChatMessage {
  id: string;
  sender: {
    name: string;
    accountId: string;
    avatar: string;
  };
  receiver: {
    name: string;
    accountId: string;
    avatar: string;
  };
  message: string;
  status: MessageStatus;
  timestamp: string;
  hasAudio?: boolean;
  isStarred?: boolean;
}

interface TransactionChatsProps {
  messages: ChatMessage[];
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onToggleStar: (messageId: string) => void;
  onCheckMessage: (messageId: string, checked: boolean) => void;
  selectedMessages: string[];
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

const getStatusStyle = (status: MessageStatus) => {
  switch (status) {
    case "Request":
      return "bg-purple-100 text-purple-600";
    case "Spam":
      return "bg-blue-100 text-blue-600";
    case "First time":
      return "bg-emerald-100 text-emerald-600";
    case "Stared":
      return "bg-orange-100 text-orange-600";
    default:
      return "";
  }
};

const TransactionChats: React.FC<TransactionChatsProps> = ({
  messages,
  currentPage,
  totalItems,
  onPageChange,
  onToggleStar,
  onCheckMessage,
  selectedMessages,
  className,
}) => {
  return (
    <div className={cn("w-full bg-white rounded-lg", className)}>
      {/* Search and Filters */}
      <div className="p-4 space-y-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="search transaction"
              className="w-full pl-4 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8">
            Search
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="size-4 text-gray-500" />
              <span className="text-gray-600">Filter By</span>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="first-time" />
              <label htmlFor="first-time" className="text-sm text-gray-600">
                First time
              </label>

              <Checkbox id="spam" />
              <label htmlFor="spam" className="text-sm text-gray-600">
                Spam
              </label>

              <Checkbox id="stared" />
              <label htmlFor="stared" className="text-sm text-gray-600">
                Stared
              </label>

              <Checkbox id="request" />
              <label htmlFor="request" className="text-sm text-gray-600">
                Request
              </label>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-red-500">
              <RotateCcw className="size-4 mr-2" />
              Reset Filter
            </Button>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-1">
        {messages.map((message) => (
          <div
            key={message.id}
            className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 group border-b-2 border-gray-200 border-transparent transition-colors"
          >
            <Checkbox
              checked={selectedMessages.includes(message.id)}
              onCheckedChange={(checked) =>
                onCheckMessage(message.id, checked as boolean)
              }
              className="mt-1"
            />
            <button
              onClick={() => onToggleStar(message.id)}
              className={cn(
                "mt-1",
                message.isStarred
                  ? "text-yellow-400"
                  : "text-gray-300 group-hover:text-gray-400"
              )}
            >
              <Star className="size-5" />
            </button>
            <Link href={"/dashboard/transactions/chats/" + message.id}>
            <div className="flex items-center">
                
              <div className="flex items-end">
                <Image
                  src={message.sender.avatar}
                  alt={message.sender.avatar}
                  className="w-8 h-8 rounded-full"
                  width={32}
                  height={32}
                />
                <div>
                  <h5 className="font-semibold text-xs">
                    {message.sender.name}
                  </h5>
                  <h6 className="text-xs text-gray-500">
                    {message.sender.accountId}
                  </h6>
                </div>
              </div>
              {message.hasAudio && <AudioVisualizer />}
              <div className="flex items-center gap-2 pl-1 pr-3 py-1">
                <Image
                  src={message.receiver.avatar}
                  alt={message.receiver.avatar}
                  className="w-8 h-8 rounded-full border-2 border-white"
                  width={32}
                  height={32}
                />
                <div>
                  <h5 className="font-semibold text-xs">
                    {message.receiver.name}
                  </h5>
                  <h6 className="text-xs text-gray-500">
                    {message.receiver.accountId}
                  </h6>
                </div>
              </div>
            </div>
            </Link>


            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700">{message.message}</p>
            </div>

            <div className="flex items-center gap-2">
              {message.status && (
                <span
                  className={cn(
                    "px-2 py-0.5 text-xs rounded-full",
                    getStatusStyle(message.status)
                  )}
                >
                  {message.status}
                </span>
              )}
              <span className="text-sm text-gray-500">{message.timestamp}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="p-4 flex items-center justify-between border-t border-gray-100">
        <span className="text-sm text-gray-500">
          Showing {(currentPage - 1) * 10 + 1}-
          {Math.min(currentPage * 10, totalItems)} of {totalItems}
        </span>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage * 10 >= totalItems}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionChats;
