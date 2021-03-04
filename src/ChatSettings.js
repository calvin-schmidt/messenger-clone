import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./ChatSettings.css";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";

function ChatSettings() {
  const { chatId } = useParams();
  const [{ user }, dispatch] = useStateValue();
  const [chatMembers, setChatMembers] = useState([]);

  useEffect(() => {
    if (chatId) {
      db.collection("users")
        .doc(user.user.uid)
        .collection("chats")
        .doc(chatId)
        .collection("members")
        .onSnapshot((snapshot) =>
          setChatMembers(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [chatId]);

  return (
    <div className="chatSettings">
      <div className="chatSettings__header">
        <Avatar src={chatMembers[0]?.imgURL} />
        <h3>{chatMembers[0]?.name}</h3>
        <p>Active 8m ago</p>
      </div>
      <div className="chatSettings__menu">
        <div className="chatSettings__menuItem">
          <h2>Customize Chat</h2>
          <KeyboardArrowDownRoundedIcon />
        </div>
        <div className="chatSettings__menuItem">
          <h2>Privacy & Support</h2>
          <KeyboardArrowDownRoundedIcon />
        </div>
        <div className="chatSettings__menuItem">
          <h2>Shared Photos</h2>
          <KeyboardArrowDownRoundedIcon />
        </div>
      </div>
    </div>
  );
}

export default ChatSettings;
