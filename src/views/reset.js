import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import forgotimage from "../assets/images/forgot.jpg";
import Button from "../components/button";
import Inputtag from "../components/input";
import { useHistory, useParams } from "react-router-dom";
import Logo from "../assets/images/Logo.jpg";
import ImgSize from "../components/imgsize";

const Reset = () => {
  const history = useHistory();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const sendemail = async () => {
    try {
      if (password === "") {
        toast("please enter your password");
      } else {
        axios
          .post(process.env.REACT_APP_API + "/api/mail/reset/" + token, {
            password: password,
          })
          .then((res) => toast("Your password has been updated."))
          .catch((err) => {
            toast(err.response.data.message);
          });
        history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Wrapper>
      <WrapperContent>
        <ImgSize
          url={Logo}
          alt="logo"
          maxwidth="200px"
          width="100%"
          radius="0"
        />
        <TextContent>
          Please select a new password
          <TextContent2>
            Hey, it happens to the best of us. Please enter your new password
            below
          </TextContent2>
        </TextContent>
        <InputButton>
          <Inputtag
            type="password"
            placeholder="enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            text="Save New Password"
            width="100%"
            onClick={sendemail}
            radius="4px"
          />
        </InputButton>
      </WrapperContent>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${forgotimage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
`;
const WrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 4px;
  gap: 20px;
  background: rgb(0, 0, 0, 0.25);
  width: 330px;
  height: 450px;
  padding: 30px 20px;
`;

const InputButton = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;
const TextContent = styled.div`
  font-weight: 800;
  font-size: 24px;
  color: rgb(255, 255, 255, 0.75);
  text-align: center;
`;
const TextContent2 = styled.div`
  font-weight: 550;
  font-size: 16px;
  color: rgb(255, 255, 255, 0.75);
  padding: 30px 30px 0px 30px;
`;
export default Reset;
