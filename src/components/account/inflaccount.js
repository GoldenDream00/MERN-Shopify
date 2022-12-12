import styled from "styled-components";
import React from "react";
import Background from "../../assets/images/Image.png";
import AccountDetail from "./accountdetail";
import Inputtag from "../input";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";

const Influaccount = () => {
  const { user } = useContext(AuthContext);

  return (
    <Wrapper>
      <Wrapperimage />
      <AccountDetail />
      <Inputtag
        text="Full Address"
        value={user.user.deliveryaddress}
        placeholder="1 St Mary's St Whitchurch Shropshire SY13 1QU United Kingdom"
      />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;
  width: 100%;
  overflow: auto;
  height: 100%;
`;

const Wrapperimage = styled.div`
  background-image: url(${Background});
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 150px;
  width: 100%;
`;

export default Influaccount;
