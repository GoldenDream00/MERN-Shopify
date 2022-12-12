import React, { useState, useContext } from "react";
import styled from "styled-components";
import Logo from "../assets/images/1.png";
import Avatar from "../assets/images/avatar.png";
import { IconButton } from "@material-ui/core";
import { AuthContext } from "../Context/AuthContext";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ProfilePage from "./messages/ProfilePage";
import Badge from "@mui/material/Badge";
import NotificationsNoneSharpIcon from "@material-ui/icons/NotificationsNoneSharp";
import { useHistory } from "react-router-dom";
import { PUBLIC_BRAND, PUBLIC_MESSAGE } from "../configs/router-config";



const Header = () => {
  const { user, setUserData, count ,setCount } = useContext(AuthContext);
  const [profiletoggle, setProfiletoggle] = useState(false);
  const userPhoto = user.user.photo;
  const history = useHistory();

  const HandleSubmit = () => {
    history.push(
      PUBLIC_BRAND + PUBLIC_MESSAGE,
    )
  };

  const profiletoggler = () => {
    profiletoggle === false ? setProfiletoggle(true) : setProfiletoggle(false);
  };
  
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <Wrapper>
      <Logowrapper>
        <img src={Logo} alt="logo" />
      </Logowrapper>
      {profiletoggle && (
        <ProfilePage
          toggler={() => {
            profiletoggler();
          }}
          togglestate={profiletoggle}
        />
      )}
      <Avatarwrapper>
        <IconButton
          onClick={() => {
            profiletoggler();
          }}
        >
          <img
            className="user-profile-image"
            src={userPhoto ? userPhoto : Avatar}
            alt=""
          />
        </IconButton>
        <IconButton onClick={() => HandleSubmit()}>
          <Badge color="success" badgeContent={count}>
            <NotificationsNoneSharpIcon />
          </Badge>
        </IconButton>
        <IconButton onClick={logout}>
          <ExitToAppIcon />
        </IconButton>
      </Avatarwrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: linear-gradient(90deg, #b224ef 0%, #7579ff 100%);
  box-shadow: -1px 5px 16px rgba(0, 0, 0, 0.13);
  @media screen and (max-width: 600px) {
    padding: 10px 20px;
  }
  @media screen and (max-width: 40px) {
    padding: 10px 5px;
  }
`;
const Logowrapper = styled.div`
  display: flex;
  padding: 15px;
`;
const Avatarwrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
export default Header;
