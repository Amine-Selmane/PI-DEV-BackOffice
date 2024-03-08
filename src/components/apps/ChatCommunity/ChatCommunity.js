import React, { useState } from 'react';
import ChatRoomList from './ChatRoomList';
import ChatRoom from './ChatRoom';
import ChatMsgForm from './ChatMsgForm';

const ChatCommunity = () => {
  const [currentRoom, setCurrentRoom] = useState(null);
  const [messages, setMessages] = useState([]);

  const joinRoom = (roomId) => {
    // Fetch messages for the selected room and update state
    setCurrentRoom(roomId);
  };

  const sendMessage = (message) => {
    // Send message to the current room and update state
  };

  return (
    <div>
      {currentRoom ? (
        <>
          <ChatRoom room={currentRoom} />
          <ChatMsgForm sendMessage={sendMessage} />
        </>
      ) : (
        <ChatRoomList rooms={[]} joinRoom={joinRoom} />
      )}
    </div>
  );
};

export default ChatCommunity;
