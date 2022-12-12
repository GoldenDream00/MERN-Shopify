import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import InstagramLogin from "react-instagram-login";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import styled from "styled-components";
import Instagram from "../../../assets/images/instagramlogo.svg";
import Bginstagram from "../../../assets/images/bginsta.png";
import ImgSize from "../../../components/imgsize";
import loadingpng from "../../../assets/images/loading1.gif";

const InstaConnect = (location) => {
  const history = useHistory();
  const [code, setCode] = useState("");
  const { user, setUserData } = useContext(AuthContext);
  const userId = user.user._id;
  const [loading, setLoading] = useState(false);
  const responseInstagram = (response) => {
    setCode(response);
  };

  const getUserProfile = async (accessToken, userIds) => {
    setLoading(true);
    try {
      const data = {
        accessToken: accessToken,
        userId: userIds,
      };
      const result = await axios.post(
        process.env.REACT_APP_API + "/api/users/getuser",
        data
      );
      const response = result.data;
      const temp = response.data;
      await axios.post(process.env.REACT_APP_API + "/api/users/getuserinfo", {
        username: temp.data[0].username,
        userid: userId,
      });
      const results = await axios.get(
        process.env.REACT_APP_API + "/api/users/" + userId
      );
      const token = localStorage.getItem("auth-token");
      setUserData({
        token,
        user: results.data,
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);

    history.push(location);
  };

  const getAccessToken = async (code) => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API}/api/users/insta/${code}`
      );

      const response = result.data;
      getUserProfile(response.data.access_token, response.data.user_id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (code) {
      getAccessToken(code);
    }
  }, [code]);

  return (
    <>
      {loading === false ? (
        <Wrapper>
          <ImgWrapper src={Instagram} alt="" />
          <TextContent>
            Please verify your identity by linking with your Instagram account.
          </TextContent>
          <InstagramLogin
            className="loginBtn"
            clientId="752600142585429"
            redirectUri="https://gifterly.herokuapp.com/"
            scope="user_profile,user_media"
            onSuccess={responseInstagram}
            onFailure={responseInstagram}
            cssClass="instagramcss"
          >
            Connect
          </InstagramLogin>
        </Wrapper>
      ) : (
        <Wrapp>
          <ImgSize url={loadingpng} width="300px" height="300px" />
        </Wrapp>
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  background-image: url(${Bginstagram});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 24px;
  margin: auto;
  width: 350px;
  height: 550px;
`;
const ImgWrapper = styled.img`
  width: 200px;
  height: 200px;
  margin: auto;
`;
const TextContent = styled.div`
  color: white;
  font-weight: 800;
  font-size: 18px;
  text-align: center;
  margin: 20px;
`;
const Wrapp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
export default InstaConnect;
