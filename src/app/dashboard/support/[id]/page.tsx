"use client"
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Star, 
  Trash2, 
  MoreVertical, 
  Paperclip, 
  Send,
  Printer
} from 'lucide-react';

// Types
interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  isSelf: boolean;
}

interface ChatHeaderProps {
  user: {
    name: string;
    id: string;
    tag?: string;
  };
  onBack: () => void;
}

// Avatar Component
const Avatar: React.FC<{ letter: string, className?: string }> = ({ letter, className = '' }) => (
  <div className={`w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-white font-medium ${className}`}>
    {letter}
  </div>
);

// Chat Header Component
const ChatHeader: React.FC<ChatHeaderProps> = ({ user, onBack }) => (
  <div className="flex items-center justify-between p-4 border-b bg-white">
    <div className="flex items-center space-x-4">
      <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
        <ArrowLeft className="w-5 h-5" />
      </button>
      <div className="flex items-center space-x-2">
        <Avatar letter="N" />
        <div>
          <h2 className="font-medium">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.id}</p>
        </div>
      </div>
      <span className="px-3 py-1 bg-green-100 text-green-600 rounded-lg text-sm">
        {user.tag}
      </span>
    </div>
    <div className="flex items-center space-x-4">
      <button className="text-gray-600 hover:text-gray-800">
        <Printer className="w-5 h-5" />
      </button>
      <button className="text-blue-500 hover:text-blue-600">
        <Star className="w-5 h-5" />
      </button>
      <button className="text-red-500 hover:text-red-600">
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  </div>
);

// Message Bubble Component
const MessageBubble: React.FC<{ message: Message }> = ({ message }) => (
  <div className={`flex ${message.isSelf ? 'justify-end' : 'justify-start'} mb-4`}>
    {!message.isSelf && (
      <Avatar letter={message.sender.name[0]} className="mr-3 mt-2" />
    )}
    <div className={`relative max-w-xl ${message.isSelf ? 'order-1' : 'order-2'}`}>
      <div
        className={`px-4 py-3 rounded-lg ${
          message.isSelf
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        {message.content}
      </div>
      <div className="flex items-center mt-1">
        <span className="text-sm text-gray-500">{message.timestamp}</span>
        <button className="ml-2 text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

// Message Input Component
const MessageInput: React.FC = () => {
  const [message, setMessage] = useState('');

  return (
    <div className="border-t bg-white p-4">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write message"
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="text-gray-500 hover:text-gray-700">
          <Paperclip className="w-5 h-5" />
        </button>
        <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// Main Chat Detail Component
const ChatDetail: React.FC = () => {
  const sampleMessages: Message[] = [
    {
      id: '1',
      content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
      timestamp: '6:30 pm',
      sender: {
        id: 'Account ID',
        name: 'John',
        avatar: 'J'
      },
      isSelf: false
    },
    {
      id: '2',
      content: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.',
      timestamp: '6:34 pm',
      sender: {
        id: 'Account ID',
        name: 'You',
        avatar: 'Y'
      },
      isSelf: true
    },
    {
      id: '3',
      content: 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.Contrary to popular belief, Lorem Ipsum is not simply random text is the model text for your company.',
      timestamp: '6:38 pm',
      sender: {
        id: 'Account ID',
        name: 'John',
        avatar: 'J'
      },
      isSelf: false
    }
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      <ChatHeader 
        user={{
          name: 'Ngeh Felix',
          id: 'Account ID',
          tag: 'Security'
        }}
        onBack={() => console.log('back clicked')}
      />
      
      <div className="flex-1 overflow-y-auto p-4">
        {sampleMessages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatDetail;