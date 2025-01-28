"use client";

import React, { useState } from "react";
import {
  MoreVertical,
  ChevronLeft,
  Printer,
  Star,
  Flag,
  Send,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { FaMicrophone } from "react-icons/fa";
import { FaFileImage } from "react-icons/fa";
import { FaPaperclip } from "react-icons/fa";
import { cn } from "@/lib/utils";

type EventType = "PAYMENT" | "JOIN" | "LEAVE" | "REMOVED" | "ADDED";

interface ChatEvent {
  id: string;
  type: EventType;
  userName: string;
  timestamp: string;
  details?: string;
}

interface Message {
  id: string;
  content: string;
  timestamp: string;
  author: {
    initial: string;
    color?: string;
  };
  isSender: boolean;
}

type TimelineItem = Message | ChatEvent;

interface ChatMessageProps {
  timeline: TimelineItem[];
  currentUser: string;
  title: string;
  onSendMessage: (message: string) => void;
  className?: string;
  onBack: () => void;
}

const ChatMessage = ({
  timeline,
  title,
  onSendMessage,
  className = "",
  onBack,
}: ChatMessageProps) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  const renderEvent = (event: ChatEvent) => {
    const getEventText = () => {
      switch (event.type) {
        case "PAYMENT":
          return "just paid his contribution";
        case "JOIN":
          return "joined the group";
        case "LEAVE":
          return "left the group";
        case "REMOVED":
          return "was removed from the group";
        case "ADDED":
          return "was added to the group";
        default:
          return "";
      }
    };

    return (
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-1 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
          <span className="font-medium text-blue-500">{event.userName}</span>
          <span>{getEventText()}</span>
          {event.type === "PAYMENT" && (
            <span role="img" aria-label="sparkles">
              ✨
            </span>
          )}
        </div>
      </div>
    );
  };

  const renderMessage = (message: Message) => (
    <div
      className={`w-full flex ${
        message.isSender ? "justify-end" : "justify-start"
      }`}
    >
      <div className="flex items-start gap-3 max-w-[80%]">
        {!message.isSender && (
          <div
            className={`w-10 h-10 rounded-full flex items-center cursor-pointer select-none justify-center text-white text-lg
              ${message.author.color || "bg-blue-600"}`}
          >
            {message.author.initial}
          </div>
        )}
        <div className="flex-1">
          <div
            className={`p-4 rounded-lg ${
              message.isSender
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-100"
            }`}
          >
            <div className="flex flex-col justify-between items-start gap-4">
              <p className="text-sm">{message.content}</p>
              <div className="flex w-full justify-end items-center gap-2 flex-shrink-0">
                <span
                  className={`text-sm ${
                    message.isSender ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  {message.timestamp}
                </span>
                <button
                  className={`${
                    message.isSender ? "text-blue-100" : "text-gray-500"
                  } hover:text-gray-700`}
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {message.isSender && (
          <div
            className={`w-10 h-10 rounded-full flex items-center cursor-pointer select-none justify-center text-white text-lg
              ${message.author.color || "bg-blue-600"}`}
          >
            {message.author.initial}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-white rounded-lg shadow-lg",
        className
      )}
    >
      {/* Fixed Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-gray-500 hover:text-gray-700"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-medium">{title}</h2>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            9
          </span>
        </div>
        <div className="flex items-center border rounded-lg">
          <button className="text-gray-500 hover:text-gray-700 p-2">
            <Printer className="w-5 h-5 text-primary" />
          </button>
          <div className="h-8 border-l"></div>
          <button className="text-gray-500 hover:text-gray-700 p-2">
            <Star className="w-5 h-5 text-primary" />
          </button>
          <div className="h-8 border-l"></div>
          <button className="text-gray-500 hover:text-gray-700 p-2">
            <Flag className="w-5 h-5 fill-red-500 text-red-500" />
          </button>
        </div>
      </div>

      {/* Scrollable Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {timeline.map((item) => (
            <div key={item.id}>
              {"content" in item
                ? renderMessage(item as Message)
                : renderEvent(item as ChatEvent)}
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Chat Input */}
      <div className="border-t p-4 bg-white sticky bottom-0 left-0 right-0">
        <form onSubmit={handleSend} className="flex items-center gap-3">
          <button type="button" className="text-gray-500 hover:text-gray-700">
            <FaMicrophone className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="flex items-center flex-1 gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Write message..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="button" className="text-gray-500 hover:text-gray-700">
              <FaPaperclip className="w-5 h-5 text-muted-foreground" />
            </button>
            <button type="button" className="text-gray-500 hover:text-gray-700">
              <FaFileImage className="w-5 h-5 text-muted-foreground" />
            </button>
            <button
              type="submit"
              className="bg-stone-300 flex items-center gap-2 text-white p-2 rounded-lg hover:bg-stone-200"
            >
              <Send className="size-4" />
              <span>Send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const GroupChatDetailPage = () => {
  const timeline: TimelineItem[] = [
    {
      id: "1",
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      timestamp: "6:30 pm",
      author: { initial: "H" },
      isSender: false,
    },
    {
      id: "2",
      type: "PAYMENT",
      userName: "James N Nji",
      timestamp: "6:31 pm",
    },
    {
      id: "3",
      type: "PAYMENT",
      userName: "Martin Pewake",
      timestamp: "6:32 pm",
    },
    {
      id: "4",
      content:
        "There are many variations of passages of Lorem Ipsum available.",
      timestamp: "6:34 pm",
      author: { initial: "J", color: "bg-blue-500" },
      isSender: true,
    },
    {
      id: "5",
      type: "JOIN",
      userName: "Nguh Fabrice",
      timestamp: "6:35 pm",
    },
    {
      id: "6",
      content:
        "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
      timestamp: "6:38 pm",
      author: { initial: "F", color: "bg-red-500" },
      isSender: false,
    },
  ];

  const router = useRouter();

  const handleSendMessage = (message: string) => {
    console.log("Sending message:", message);
  };

  return (
    <div className="h-full w-full">
      <ChatMessage
        timeline={timeline}
        currentUser="J"
        title="Cotisation Veterans"
        onSendMessage={handleSendMessage}
        onBack={() => router.back()}
        className="h-full"
      />
    </div>
  );
};

export default GroupChatDetailPage;