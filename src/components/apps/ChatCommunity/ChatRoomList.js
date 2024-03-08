import React from 'react';

const ChatRoomList = ({ rooms, joinRoom }) => {
  return (
    <div>
      <h2>Available Chat Rooms</h2>
      <ul>
        {rooms.map(room => (
          <li key={room.id}>
            <button onClick={() => joinRoom(room.id)}>{room.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoomList;
