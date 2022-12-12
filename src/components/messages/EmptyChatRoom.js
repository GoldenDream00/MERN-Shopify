import React from "react";
import Home from "../../assets/images/chat.webp";
import "../../assets/css/EmptyChatRoom.css";

function EmptyChatRoom() {
  return (
    <div>
      <div className="EmptyChatroom">
        <img className="emptychatroom-img" src={Home} alt=""></img>
        <p className="empty-chatroom-mainhead">Start Chatting🤝</p>
        <p className="empty-chatroom-subhead">
          Select an your friends from the Sidebar and Start conversation.Add
          friends by username from the option in the top right corner of the
          page
        </p>
      </div>
    </div>
  );
}

export default EmptyChatRoom;
