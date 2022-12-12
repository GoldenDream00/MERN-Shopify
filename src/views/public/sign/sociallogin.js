import React, { useEffect, useState, useContext } from "react";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { gapi } from "gapi-script";
import facebook from "../../../assets/images/facebook.png";
import google from "../../../assets/images/google.png";
import twitter from "../../../assets/images/twitter.png";
import styled from "styled-components";
import Dialog from "@mui/material/Dialog";
import { toast } from "react-toastify";
import axios from "axios";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "../../../components/button";
import { useHistory } from "react-router-dom";
import ButtonGroup from "../../../components/radiogroup";
import { AuthContext } from "../../../Context/AuthContext";
import ReactFlagsSelect from "react-flags-select";

const RadioOptions = [
  { name: "I am a Brand", value: "brand", default: true },
  { name: "I am an Influencer", value: "influencer" },
];

const Sociallogin = (location) => {
  const [open, setOpen] = useState(false);
  const [emails, setEmail] = useState("");
  const password = "";
  const [username, setUsername] = useState("");
  const [userimage, setUserimage] = useState("");
  const [isbrand, setIsbrand] = useState(true);
  const [country, setCountry] = useState("");
  const { setUserData } = useContext(AuthContext);
  const history = useHistory();

  const loginCall = async ({ email }) => {
    try {
      const loginUser = { email: email, password: password };
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
      history.push(location);
      setOpen(false);
      setEmail("");
      setUsername("");
      setUserimage("");
    } catch (err) {
      console.log(err);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSuccess = (response) => {
    const email = response.profileObj.email;
    const newSize = "300";
    const str = response.profileObj.imageUrl;
    const resphoto = str.split("=s96")[0] + "?=" + newSize;
    setEmail(email);
    setUsername(response.profileObj.name);
    setUserimage(resphoto);
    loginCall({ email });
  };
  const onFailure = (response) => {
    console.log("FAILED", response);
  };
  const responseFacebook = (response) => {
    console.log(response);
    if (response.status !== "unknown") {
      setEmail(response.email);
      setUsername(response.name);
      setUserimage(response.picture.data.url);
      const email = response.email;
      loginCall({ email });
    } else {
      console.log("again");
    }
  };
  const handlechange = () => {
    setIsbrand(!isbrand);
  };
  const handleForm = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      email: emails,
      photo: userimage,
      isBrand: isbrand,
      password: password,
      country: country,
    };
    const email = emails;

    try {
      await axios.post(process.env.REACT_APP_API + "/api/auth/signup", data);
      loginCall({ email });
    } catch (err) {
      toast(err.response.data);
      setEmail("");
      setUsername("");
      setUserimage("");
    }
  };
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_GG_APP_ID,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);
  return (
    <Signinicongroup>
      <Dialog open={open} onClose={handleClose} sx={{}}>
        <DialogTitle>Choose Your Role</DialogTitle>
        <Sign>
          <ReactFlagsSelect
            className="flagselect"
            selected={country}
            onSelect={(code) => setCountry(code)}
          />
          <ButtonGroup
            onChange={handlechange}
            options={RadioOptions}
            name="brand"
          />
        </Sign>
        <DialogActions>
          <Button onClick={handleForm} text="Submit" />
          <Button onClick={handleClose} text="Close" />
        </DialogActions>
      </Dialog>
      <GoogleLogin
        clientId={process.env.REACT_APP_GG_APP_ID}
        onSuccess={onSuccess}
        onFailure={onFailure}
        icon={false}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            style={{
              backgroundImage: `url(${google})`,
              width: "50px",
              height: "50px",
              border: "none",
              backgroundColor: "white",
              outline: "none",
            }}
          ></button>
        )}
      />
      <FacebookLogin
        appId={process.env.REACT_APP_FB_APP_ID}
        fields="name,email,picture"
        callback={responseFacebook}
        textButton={""}
        buttonStyle={{
          backgroundImage: `url(${facebook})`,
          width: "50px",
          height: "50px",
          border: "none",
          backgroundColor: "white",
          outline: "none",
        }}
      />
      <img src={twitter} alt="twitter" />
    </Signinicongroup>
  );
};
const Signinicongroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;
const Sign = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 30px;
  min-width: 350px;
`;
export default Sociallogin;
