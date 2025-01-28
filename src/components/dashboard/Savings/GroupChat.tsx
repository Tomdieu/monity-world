import React from "react";
import { cn } from "@/lib/utils";
import {
  Star,
  Filter,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

interface GroupChatMessage {
  id: string;
  groupName: string;
  message: string;
  timestamp: string;
  messageCount: string;
  isStarred?: boolean;
}

interface GroupChatsProps {
  messages: GroupChatMessage[];
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onToggleStar: (messageId: string) => void;
  onCheckMessage: (messageId: string, checked: boolean) => void;
  selectedMessages: string[];
  className?: string;
}

const GroupChats: React.FC<GroupChatsProps> = ({
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
              placeholder="search message"
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

          <div className="flex gap-2">
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
            className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 group"
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

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <Link href={`/dashboard/savings/group-chats/${message.id}`}>
                <span className="text-sm font-medium text-blue-500">
                  {message.groupName}
                </span>
                </Link>
                <span className="text-sm text-gray-500">{message.timestamp}</span>
              </div>
              <p className="text-sm text-gray-700 mt-1">{message.message}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center min-w-[20px] h-5 bg-indigo-100 text-indigo-600 text-xs rounded-full px-1">
                {message.messageCount}
              </span>
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


export default GroupChats;