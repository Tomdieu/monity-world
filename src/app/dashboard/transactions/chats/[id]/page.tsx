"use client"
import ChatDetail, { ChatInput } from "@/components/dashboard/Transactions/ChatDetail";
import { useRouter } from "next/navigation";
import React from "react";

function ChatDetailPage() {
    const router = useRouter()
  const sampleMessages = [
    {
      id: "1",
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
      timestamp: "6:30 pm",
      isSender: false,
      sender: {
        name: "Nguh Fabrice",
        avatar: "/images/img2.svg",
      },
    },
    {
      id: "2",
      content:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
      timestamp: "6:34 pm",
      isSender: true,
      sender: {
        name: "John Doe",
        avatar: "/images/img2.svg",
      },
    },
    {
      id: "3",
      content:
        "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.Contrary to popular belief, Lorem Ipsum is not simply random text is the model text for your company.",
      timestamp: "6:38 pm",
      isSender: false,
      sender: {
        name: "Nguh Fabrice",
        avatar: "/images/img2.svg",
      },
    },
  ];
  return (
    <div className="flex flex-col flex-1 w-full h-full relative">
      <ChatDetail
        messages={sampleMessages}
        currentUser={{
          name: "Nguh Fabrice",
          accountId: "Account ID",
          avatar: "/images/img2.svg",
        }}
        recipient={{
          name: "John Doe",
          accountId: "Account ID",
          avatar: "/images/img2.svg",
        }}
        onBack={() => router.back()}
      />
      <ChatInput className="bottom-0 left-0 right-0 bg-white rounded-b-md"/>
    </div>
  );
}

export default ChatDetailPage;
