import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import db from "./firebase";
import { Link, useParams } from "react-router-dom";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";

function SidebarChat({ id, uid, url, name, newChat }) {
  const [messages, setMessages] = useState("");
  const [members, setMembers] = useState("");
  const { chatId } = useParams();
  const [{ activeChat }, dispatch] = useStateValue();
  const [messagePreview, setMessagePreview] = useState();

  useEffect(() => {
    if (id) {
      db.collection("users")
        .doc(uid)
        .collection("chats")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
      db.collection("users")
        .doc(uid)
        .collection("chats")
        .doc(id)
        .collection("members")
        .onSnapshot((snapshot) =>
          setMembers(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  useEffect(() => {
    if (messages[0]?.message.length > 27) {
      setMessagePreview(messages[0]?.message.slice(0, 27) + "...");
    } else {
      setMessagePreview(messages[0]?.message);
    }
  });

  const handleClick = () => {
    if (newChat) {
      //db.collection("users").doc(uid).collection("chats");
    } else {
      dispatch({ type: actionTypes.SET_ACTIVE_CHAT, activeChat: id });
    }
  };

  return (
    <Link to={`/messages/${id}`} onClick={handleClick}>
      <div className={`sidebarChat ${activeChat == id ? "active" : "naah"}`}>
        <Avatar src={url || members[0]?.imgURL} />
        <div className="sidebarChat__info">
          <h2>{name || members[0]?.name}</h2>
          <p>{messagePreview}</p>
        </div>
      </div>
    </Link>
  );
}

export default SidebarChat;
