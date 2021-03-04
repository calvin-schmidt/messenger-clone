import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Chat.css";
import PhoneRoundedIcon from "@material-ui/icons/PhoneRounded";
import VideocamRoundedIcon from "@material-ui/icons/VideocamRounded";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import StickerIcon from "./icons/StickerIcon";
import AddCircleIcon from "./icons/AddCircleIcon";
import PhotoLibraryIcon from "./icons/PhotoLibraryIcon";
import GifIcon from "./icons/GifIcon";
import EmojiIcon from "./icons/EmojiIcon";
import LikeIcon from "./icons/LikeIcon";
import { useStateValue } from "./StateProvider";
import { useParams } from "react-router-dom";
import db from "./firebase";
import firebase from "firebase";

function Chat() {
  const [{ user }, dispatch] = useStateValue();
  const { chatId } = useParams();
  const [chatMembers, setChatMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

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

      db.collection("users")
        .doc(user.user.uid)
        .collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [chatId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("users")
      .doc(user.user.uid)
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .add({
        message: input,
        name: user.user.displayName,
        from: user.user.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

    db.collection("users")
      .doc(chatMembers[0]?.key)
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .add({
        message: input,
        name: user.user.displayName,
        from: user.user.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={chatMembers[0]?.imgURL} />
        <div className="chat__headerInfo">
          <h3>{chatMembers[0]?.name}</h3>
          <p>Last seen...</p>
        </div>
        <div className="chat__headerRight">
          <button className="chat__headerRight_button">
            <PhoneRoundedIcon />
          </button>
          <button className="chat__headerRight_button">
            <VideocamRoundedIcon />
          </button>
          <button className="chat__headerRight_button">
            <InfoRoundedIcon />
          </button>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message, index) => (
          <div className="chat__messageContainer" key={index}>
            <p className="chat__timestamp">
              {new Date(message?.timestamp?.toDate()).toUTCString()}
            </p>
            <p
              className={`chat__message ${
                message.from === user.user.uid ? "sender" : ""
              }`}
            >
              {message.message}
            </p>
          </div>
        ))}
      </div>
      <div className="chat__footer">
        <div className="chat__footer_iconContainer">
          <AddCircleIcon />
          <PhotoLibraryIcon />
          <StickerIcon />
          <GifIcon />
        </div>
        <form action="">
          <input
            type="text"
            placeholder="Aa"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" onClick={sendMessage}></button>
          <EmojiIcon />
        </form>
        <div className="chat__footer_likeContainer">
          <LikeIcon />
        </div>
      </div>
    </div>
  );
}

export default Chat;
