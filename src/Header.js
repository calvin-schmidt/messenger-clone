import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "./icons/HomeIcon";
import MarketIcon from "./icons/MarketIcon";
import WatchIcon from "./icons/WatchIcon";
import GroupsIcon from "./icons/GroupsIcon";
import MoreIcon from "./icons/MoreIcon";
import AddIcon from "@material-ui/icons/Add";
import BellIcon from "./icons/BellIcon";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import { useStateValue } from "./StateProvider";

function Header() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="header">
      <div className="header__left">
        <div className="header__left_logo_container">
          <a
            href="https://www.facebook.com/"
            className="header__left_logo_link"
          >
            <img
              className="header__left_logo_img"
              src="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512"
              alt=""
            />
          </a>
        </div>
        <div className="header__searchContainer">
          <SearchIcon />
          <input type="text" placeholder="Search Facebook" />
        </div>
        <button className="header__button_round" id="header__searchRound">
          <SearchIcon />
        </button>
      </div>
      <div className="header__middle">
        <button className="header__button_rec">
          <HomeIcon />
        </button>
        <button className="header__button_rec">
          <WatchIcon />
        </button>
        <button className="header__button_rec">
          <MarketIcon />
        </button>
        <button className="header__button_rec">
          <GroupsIcon />
        </button>
        <button className="header__button_rec">
          <MoreIcon />
        </button>
      </div>
      <div className="header__right">
        <div className="header__right_userInfo">
          <img src={user.additionalUserInfo.profile.picture.data.url} alt="" />
          <h3>{user.additionalUserInfo.profile.first_name}</h3>
        </div>
        <button className="header__button_round">
          <AddIcon />
        </button>
        <button className="header__button_round">
          <BellIcon />
        </button>
        <button className="header__button_round">
          <ArrowDropDownRoundedIcon />
        </button>
      </div>
    </div>
  );
}

export default Header;
