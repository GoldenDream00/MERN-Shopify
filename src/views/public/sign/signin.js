import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import background from "../../../assets/images/2.png";
import Logo from "../../../assets/images/Logo.jpg";
import { FiMail, FiEyeOff, FiEye } from "react-icons/fi";
import { PUBLIC_SIGNUP, FORGOT } from "../../../configs/router-config";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import Sociallogin from "./sociallogin";
import ImgSize from "../../../components/imgsize";

const Signin = (location) => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [emails, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserData } = useContext(AuthContext);

  const handleForm = async (e) => {
    e.preventDefault();
    if (password === "") {
      return toast("Enter your password");
    }
    try {
      const loginUser = { email: emails, password: password };
      const res = await axios.post(
        process.env.REACT_APP_API + "/api/auth/signin",
        loginUser
      );
      setUserData({
        token: res.data.token,
        user: res.data.user,
      });
      localStorage.setItem("auth-token", res.data.token);
      toast("Login Success");
      setShow(false);
      setEmail("");
      setPassword("");
      history.push(location);
    } catch (err) {
      toast(err.response.data);
    }
  };
  const handleClick = (e) => {
    setShow(!show);
  };

  return (
    <Wrapper>
      <ImgWrapper>
        <ImgWrapperContent>
          Influencer Gifting Automation Platform
        </ImgWrapperContent>
      </ImgWrapper>
      <SigninWrapper>
        <SigninWrapperContent>
          <ImgSize
            url={Logo}
            alt="logo"
            maxwidth="200px"
            width="100%"
            radius="0"
          />
          <Signintext2>
            Take the next step and sign in to your account
          </Signintext2>
          <Signinput>
            <Signinputdiv>
              <Signinputinput
                type="email"
                placeholder="Enter Email"
                name="username"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <FiMail />
            </Signinputdiv>
          </Signinput>
          <Signinput>
            <Signinputdiv id="password" isRequired>
              <Signinputinput
                minLength="6"
                placeholder="Enter Password"
                name="psw"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type={show ? "text" : "password"}
              />
              <div onClick={handleClick}>{show ? <FiEyeOff /> : <FiEye />}</div>
            </Signinputdiv>
          </Signinput>
          <Signinremem>
            <Signinremember>
              <Signinrememberinput type="checkbox" />
              Remember me
            </Signinremember>
            <Signinrecover to={FORGOT}>forgot password</Signinrecover>
          </Signinremem>
          <Signinbutton onClick={handleForm}>Sign In</Signinbutton>
          <Sociallogin location={location} />
          <Signintext2>
            Don’t have an account?
            <Signinsignup to={PUBLIC_SIGNUP}>Sign up</Signinsignup>
          </Signintext2>
        </SigninWrapperContent>
      </SigninWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
`;
const ImgWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center right;
  height: 100vh;
  width: 100%;
  @media screen and (max-width: 800px) {
    display: none;
  }
`;
const ImgWrapperContent = styled.div`
  font-weight: 600;
  font-size: 34px;
  color: white;
  width: 350px;
  flex-wrap: wrap;
  margin: 30px;
`;

const SigninWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: auto;
`;
const SigninWrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  max-width: 380px;
  margin: auto;
  width: 100%;
`;

const Signintext1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  font-size: 38px;
`;
const Signintext2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  font-size: 14px;
  color: #5d5d5b;
`;
const Signinput = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 10;
  width: 100%;
`;
const Signinputdiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(207, 219, 213, 0.6);
  border-radius: 23px;
  padding: 5px 20px;
`;
const Signinputinput = styled.input`
  padding: 10px;
  border: 0;
  font-weight: 700;
  font-size: 14px;
  outline: none;
  background: none;
  width: 90%;
`;
const Signinremem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: 12px;
  width: 100%;
`;
const Signinremember = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5d5d5b;
  padding: 0px 10px;
  gap: 5px;
`;
const Signinrememberinput = styled.input`
  color: #5d5d5b;
`;
const Signinrecover = styled(Link)`
  padding: 0px 10px;
  text-decoration: none;
`;
const Signinbutton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #7a52f4;
  padding: 10px;
  border: none;
  color: #ffffff;
  border-radius: 23px;
  width: 100%;
  font-weight: 700;
`;

const Signinsignup = styled(Link)`
  padding: 0 10px;
  text-decoration: none;
  color: #6941c6;
  font-weight: 400;
  font-size: 14px;
`;
export default Signin;
