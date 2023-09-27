'use client'
import React, { useEffect, useState, useRef } from 'react'
import ChatBubbleLeft from '../chat-bubble/chatBubbleLeft'
import ChatBubbleRight from '../chat-bubble/chatBubbleRight'
import { io } from "socket.io-client";

interface MessagesProps {
  data: Array<{
    _id: string;
    message: string;
    timestamp: number;
    sender_id: string;
    sender_username: string;
    __v: number;
  }>;
}

const Messages: React.FC<MessagesProps> = ({ data }) => {
  const userId = sessionStorage.getItem('userId');
  const [messages, setMessages] = useState(data);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  // socket.
  useEffect(() => {
    const socket = io('http://localhost:8080', {
      transports: ['websocket'],
    });

    socket.connect();
    socket.on('message_sent', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);

      if (messageContainerRef.current) {
        messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
      }
    })

    return () => {
      socket.disconnect();
    }
  }, [])

  return (
    <div className="flex-grow p-4 overflow-y-scroll scroll-smooth flex-auto" ref={messageContainerRef}>
      {messages && messages.length > 0 ? (
        messages.map((message) => (
          <>
            {message.sender_id == userId ? (
              <ChatBubbleRight key={message._id} username={message.sender_username} message={message.message} timestamp={message.timestamp} />
            ) : (
              <ChatBubbleLeft key={message._id} username={message.sender_username} message={message.message} timestamp={message.timestamp} />
            )}
          </>
        ))
      ) : (
        <div className='w-full h-full flex items-center justify-center'>
          NO MESSAGE FOUND.
        </div>
      )}
    </div>
  )
}

export default Messages
