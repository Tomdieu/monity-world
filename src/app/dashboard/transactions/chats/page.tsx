"use client"
import TransactionChats from '@/components/dashboard/Transactions/Chats';
import { sampleMessages } from '@/constants/data';
import React from 'react'

function TransactionsChatPage() {
  const [selectedMessages, setSelectedMessages] = React.useState<string[]>([]);
  return (
    <div>
      <TransactionChats
      messages={sampleMessages}
      currentPage={1}
      totalItems={78}
      onPageChange={(page) => console.log('Page:', page)}
      onToggleStar={(id) => console.log('Toggle star:', id)}
      onCheckMessage={(id, checked) => {
        if (checked) {
          setSelectedMessages(prev => [...prev, id]);
        } else {
          setSelectedMessages(prev => prev.filter(msgId => msgId !== id));
        }
      }}
      selectedMessages={selectedMessages}
    />
    </div>
  )
}

export default TransactionsChatPage