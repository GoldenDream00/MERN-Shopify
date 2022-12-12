import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import background from "../../../assets/images/2.png";
import Logo from "../../../assets/images/Logo.jpg";
import { FiUsers, FiEyeOff, FiEye, FiMail } from "react-icons/fi";
import { PUBLIC_SIGNIN, FORGOT } from "../../../configs/router-config";
import { toast } from "react-toastify";
import axios from "axios";
import styled from "styled-components";
import Sociallogin from "./sociallogin";
import ButtonGroup from "../../../components/radiogroup";
import ImgSize from "../../../components/imgsize";
import ReactFlagsSelect from "react-flags-select";
import ReCAPTCHA from "react-google-recaptcha";
import { AuthContext } from "../../../Context/AuthContext";

const RadioOptions = [
  { name: "I am a Brand", value: "brand", default: true },
  { name: "I am an Influencer", value: "influencer" },
];

const Signup = () => {
  const [show, setShow] = useState(false);
  const [emails, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [isbrand, setIsbrand] = useState(true);
  const [robot, setRobot] = useState(false);
  const { setUserData } = useContext(AuthContext);
  const history = useHistory();

  const handleClick = () => setShow(!show);
  const onChangeCaptcha = async (value) => {
    const res = await axios.post(
      process.env.REACT_APP_API + "/api/auth/checkbot",
      {
        YOUR_PRIVATE_KEY: process.env.REACT_APP_PRIVATE_KEY,
        captchaToken: value,
      }
    );
    setRobot(res.data.success);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      username: username,
      email: emails,
      password: password,
      isBrand: isbrand,
      country: country,
    };

    if (username === "") {
      return toast("please enter your username");
    }
    if (emails === "") {
      return toast("please enter your email");
    }
    if (password === "") {
      return toast("please enter your password");
    }
    if (country === "") {
      return toast("please enter your country");
    }
    if (robot === false) {
      return toast("please verify yourself");
    }
    try {
      await axios.post(process.env.REACT_APP_API + "/api/auth/signup", data);
      const loginResponse = await axios.post(
        process.env.REACT_APP_API + "/api/auth/signin",
        { email: emails, password: password }
      );
      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });
      localStorage.setItem("auth-token", loginResponse.data.token);
      setShow(false);
      setEmail("");
      setPassword("");
      setUsername("");
      setCountry("");
      setIsbrand(true);
      setRobot(false);
      history.push("/");
    } catch (err) {
      toast(err.response.data);
    }
    setLoading(false);
  };
  const handlechange = () => {
    setIsbrand(!isbrand);
  };

  return (
    <Wrapper>
      <ImgWrapper>
        <ImgWrapperContent>
          Influencer Gifting Automation Platform
        </ImgWrapperContent>
      </ImgWrapper>
      <SignupWrapper>
        <SignupWrapperContent>
          <ImgSize
            url={Logo}
            alt="logo"
            maxwidth="200px"
            width="100%"
            radius="0"
          />
          <Signuptext2>
            Take the next step and sign in to your account
          </Signuptext2>
          <Signupput>
            <Signupputdiv id="first-name" isRequired>
              <Signupputinput
                type="text"
                placeholder="Enter Your Username"
                name="username"
                required
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <FiUsers />
            </Signupputdiv>
          </Signupput>
          <Signupput>
            <Signupputdiv id="email" isRequired>
              <Signupputinput
                type="email"
                placeholder="Enter Email"
                name="email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <FiMail />
            </Signupputdiv>
          </Signupput>
          <Signupput>
            <Signupputdiv id="password" isRequired>
              <Signupputinput
                type={show ? "text" : "password"}
                placeholder="Enter Password"
                minLength="6"
                name="psw"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div onClick={handleClick}>{show ? <FiEyeOff /> : <FiEye />}</div>
            </Signupputdiv>
          </Signupput>
          <Signupput>
            <ReactFlagsSelect
              className="flagselect"
              selected={country}
              onSelect={(code) => setCountry(code)}
            />
          </Signupput>
          <Signupput>
            <ButtonGroup
              onChange={handlechange}
              options={RadioOptions}
              name="brand"
            />
          </Signupput>
          <Signupremem>
            <Signupremember>
              <Signuprememberinput type="checkbox" />
              Remember me
            </Signupremember>

            <Signuprecover to={FORGOT}>forgot password</Signuprecover>
          </Signupremem>
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_SITEKEY}
            onChange={onChangeCaptcha}
          />
          <Signupbutton onClick={handleForm} isLoading={loading}>
            Sign Up
          </Signupbutton>
          <Sociallogin />
          <Signuptext2>
            Do you already have an account?
            <Signupsignup to={PUBLIC_SIGNIN}>Sign in</Signupsignup>
          </Signuptext2>
        </SignupWrapperContent>
      </SignupWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
`;
const ImgWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-end;
  height: 100vh;
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center right;
  width: 100%;
  @media screen and (max-width: 900px) {
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

const SignupWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  overflow: auto;
  padding: 10px;
`;
const SignupWrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  max-width: 500px;
  margin: auto;
  width: 100%;
`;

const Signuptext2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  font-size: 14px;
  color: #5d5d5b;
`;
const Signupput = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 10;
  width: 100%;
`;

const Signupputdiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(207, 219, 213, 0.6);
  border-radius: 23px;
  padding: 5px 20px;
`;
const Signupputinput = styled.input`
  padding: 10px;
  border: 0;
  font-weight: 700;
  font-size: 14px;
  outline: none;
  width: 90%;
`;
const Signupremem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: 12px;
  width: 100%;
`;
const Signupremember = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5d5d5b;
  padding: 0px 10px;
  gap: 5px;
`;
const Signuprememberinput = styled.input`
  color: #5d5d5b;
`;

const Signuprecover = styled(Link)`
  padding: 0px 10px;
  text-decoration: none;
`;
const Signupbutton = styled.button`
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

const Signupsignup = styled(Link)`
  padding: 0 10px;
  text-decoration: none;
  color: #6941c6;
`;
export default Signup;
