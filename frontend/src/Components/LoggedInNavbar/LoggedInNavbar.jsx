import React, { useState } from "react";
import { Link } from "react-router-dom";

import css from "./LoggedInNavbar.module.css";

import SearchBar from "../../utils/SearchBar/SearchBar";


import globeIcon from "../Assets/globe.png";
import userEmptyIcon from "../Assets/user-empty.png";
import hamburgerIcon from "../Assets/hamburger.png";
import exitIcon from "../Assets/exit.png";
import logo from "../Assets/logo.png";

const LoggedInNavbar = () => {
  let [menuState, setMenuState] = useState(false);
  let [showLanguageSettingsModal, setShowLanguageSettingsModal] =
    useState(false);

  return (
    <div className={css.navbar}>
      <div
        className={css.menuBox}
        onClick={() => setMenuState((prev) => !prev)}
      >
        <img src={hamburgerIcon} alt="menu icon" className={css.menuIcon} />
      </div>
      <div className={css.left}>
        <Link className={css.logoBox} to="/">
          <img src={logo} alt="logo" className={css.logo} />
        </Link>
      </div>
      <div className={css.right}>
        <div className={css.catDropdown}>Courses</div>
        <div className={css.searchBox}>
          <SearchBar />
        </div>
        <a className={css.hovBox} href="#" target="_blank">
          Fall 2023
        </a>
        <Link className={css.hovBox} to="/user/profile/courses">
          Instructor
        </Link>
        <Link className={css.hovBox} to="/user/my-courses">
          My Learning
        </Link>

        <div className={css.profile}>
          <img src={userEmptyIcon} className={css.profileIcon} />
          <div className={css.menuBox}>
            <div className={css.innerMenuBox}>
              <div className={css.prflDiv}>
                <Link to="#" className={css.user}>
                  <div className={css.leftUserDiv}>
                    <img
                      src={userEmptyIcon}
                      alt="user profile"
                      className={css.userProfileImg}
                    />
                  </div>
                  <div className={css.rightUserDiv}>
                    <div className={css.uname}>Test User 1</div>
                    <div className={css.email}>testuser@gmail.com</div>
                  </div>
                </Link>
              </div>
              <hr className={css.hr} />
              <div className={css.prflDiv}>
                <Link to="#" className={css.menuItem}>
                  My Learning
                </Link>

                <Link to="#" className={css.menuItem}>
                  My Wishlist
                </Link>
                <Link to="#" className={css.menuItem}>
                  Instructor Dashboard
                </Link>
              </div>
              <hr className={css.hr} />
              <div className={css.prflDiv}>
                <Link to="/" className={css.menuItem}>
                  Notifications
                </Link>
                <Link to="/" className={css.menuItem}>
                  Messages
                </Link>
              </div>
              <hr className={css.hr} />
              <div className={css.prflDiv}>
                <Link to="/user/account" className={css.menuItem}>
                  Account Settings
                </Link>
                <Link to="/" className={css.menuItem}>
                  Payment Methods
                </Link>
                <Link to="/" className={css.menuItem}>
                  Subscriptions
                </Link>
                <Link to="/" className={css.menuItem}>
                   Grades
                </Link>
              </div>


              <hr className={css.hr} />
              <div className={css.prflDiv}>
                <Link to="#" className={css.menuItem}>
                  Public Profile
                </Link>
                <Link
                  to="/user/profile/settings/basic"
                  className={css.menuItem}
                >
                  Edit Profile
                </Link>
              </div>
              <hr className={css.hr} />
              <div className={css.prflDiv}>
                <Link to="/" className={css.menuItem}>
                  Help
                </Link>
                <Link to="/" className={css.menuItem}>
                  Logout
                </Link>
              </div>
              <hr className={css.hr} />
              <div className={css.prflDiv}>
                <div className={css.menuItem2}>
                  <span>
                    <div className={css.menuItemTxt1}>Edubridge Bussiness</div>
                    <div className={css.menuItemTxt2}>
                      Bring learning to your company
                    </div>
                  </span>
                  <span>
                    <img src={exitIcon} className={css.icon} alt="exit icon" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LoggedInNavbar;
