import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import VideoCallRoundedIcon from "@material-ui/icons/VideoCallRounded";
import AddCommentIcon from "@material-ui/icons/AddComment";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import SearchIcon from "@material-ui/icons/Search";
import SidebarChat from "./SidebarChat";
import db from "./firebase";
import { useStateValue } from "./StateProvider";

function Sidebar() {
  const [chats, setChats] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [value, setValue] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [foundUsers, setFoundUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(user.user.uid)
      .collection("chats")
      .onSnapshot((snapshot) => {
        console.log(snapshot);
        setChats(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    setIsLoading(false);
    return () => {
      unsubscribe();
    };
  }, []);

  RegExp.quote = function (str) {
    return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
  };

  useEffect(() => {
    var regex = new RegExp(RegExp.quote(value), "gi");
    setFoundUsers(allUsers.filter((user) => regex.test(user.data.displayName)));
    console.log(foundUsers);
  }, [value]);

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      setAllUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, [isSearching]);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <h2>Chats</h2>
        <div className="sidebar__header_button_container">
          <button className="sidebar__header_button">
            <MoreHorizIcon />
          </button>
          <button className="sidebar__header_button">
            <VideoCallRoundedIcon />
          </button>
          <button className="sidebar__header_button">
            <AddCommentIcon />
          </button>
        </div>
      </div>
      <div className="sidebar__search">
        {isSearching && (
          <ArrowBackRoundedIcon onClick={() => setIsSearching(false)} />
        )}
        <div className="sidebar__searchContainer">
          {isSearching || <SearchIcon />}
          <input
            type="text"
            placeholder="Search Messenger"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onClick={() => setIsSearching(true)}
          />
        </div>
      </div>
      <div className="sidebar__chats" onClick={() => setIsSearching(false)}>
        {isSearching ? (
          foundUsers.map((chat) => {
            return (
              <SidebarChat
                key={chat.id}
                id={chat.id}
                uid={user.user.uid}
                url={chat.data.imageURL}
                name={chat.data.displayName}
                newChat
              />
            );
          })
        ) : isLoading ? (
          <SidebarChat name="Loading..." message="" />
        ) : (
          chats.map((chat) => {
            return (
              <SidebarChat key={chat.id} id={chat.id} uid={user.user.uid} />
            );
          })
        )}
      </div>
    </div>
  );
}

export default Sidebar;
