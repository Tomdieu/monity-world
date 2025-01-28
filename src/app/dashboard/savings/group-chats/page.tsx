"use client"
import GroupChats from "@/components/dashboard/Savings/GroupChat";
import React from "react";

function GroupChatsPage() {
  const sampleGroupMessages = [
    {
      id: "1",
      groupName: "Cotisation Veterans",
      message: "The next person is probable james",
      timestamp: "9:38 AM",
      messageCount: "14",
    },
    {
      id: "2",
      groupName: "Cotisation Veterans",
      message: "The next person is probable james",
      timestamp: "10:45 AM",
      messageCount: "8",
    },
    {
      id: "3",
      groupName: "Cotisation Veterans",
      message: "The next person is probable james",
      timestamp: "8:38 AM",
      messageCount: "33",
    },
    // Add more sample messages as needed
  ];
  return (
    <div>
      <GroupChats
        messages={sampleGroupMessages}
        currentPage={1}
        totalItems={12}
        onPageChange={() => {}}
        onToggleStar={() => {}}
        onCheckMessage={() => {}}
        selectedMessages={[]}
      />
    </div>
  );
}

export default GroupChatsPage;
