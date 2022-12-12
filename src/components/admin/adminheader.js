import styled from "styled-components";
import { MdCampaign, MdOutlineSocialDistance, MdAccountBalanceWallet } from "react-icons/md";
import { NavLink as Link } from "react-router-dom";
import {
  PUBLIC_INFLUENCER,
  ADMIN_PREFIX,
  PUBLIC_BRAND,
  PUBLIC_SUBSCRIPTION,
} from "../../configs/router-config";
import Logo from "../../assets/images/1.png";
import Logo2 from "../../assets/images/3.png";

const AdminHeader = () => {
  return (
    <>
      <Wrapper1>
        <div style={{ padding: "20px" }}>
          <img style={{ width: "150px" }} src={Logo} alt="logo" />
        </div>
        <Wrapperbutton to={ADMIN_PREFIX + PUBLIC_BRAND}>
          <MdCampaign />
          Brand
        </Wrapperbutton>
        <Wrapperbutton to={ADMIN_PREFIX + PUBLIC_INFLUENCER}>
          <MdOutlineSocialDistance />
          Influencers
        </Wrapperbutton>
        <Wrapperbutton to={ADMIN_PREFIX + PUBLIC_SUBSCRIPTION}>
          <MdAccountBalanceWallet />
          Subscription
        </Wrapperbutton>
      </Wrapper1>
      <Wrapper2>
        <div style={{ padding: "20px" }}>
          <img src={Logo2} alt="logo" />
        </div>
        <Wrapperbutton to={ADMIN_PREFIX + PUBLIC_BRAND}>
          <MdCampaign />
        </Wrapperbutton>
        <Wrapperbutton to={ADMIN_PREFIX + PUBLIC_INFLUENCER}>
          <MdOutlineSocialDistance />
        </Wrapperbutton>
        <Wrapperbutton to={ADMIN_PREFIX + PUBLIC_SUBSCRIPTION}>
          <MdAccountBalanceWallet />
        </Wrapperbutton>
      </Wrapper2>
    </>
  );
};
const Wrapper1 = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: 50px 20px;
  max-width: 200px;
  width: 100%;
  background: #1d1932;
  overflow: auto;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;
const Wrapper2 = styled.div`
  display: none;
  @media screen and (max-width: 1000px) {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    align-items: center;
    border-right: 5px solid rgba(235, 240, 240, 0.9);
    padding: 50px 20px;
    max-width: 20px;
    background: #1d1932;
    overflow: auto;
  }
`;

const Wrapperbutton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: none;
  color: #ffffff;
  font-weight: 700;
  font-size: 18px;
  gap: 20px;
  text-decoration: none;
  margin: 30px 20px;

  &:hover {
    color:  #ff66ff;
  }
  &.active {
    color: #ff66fe;
    position: relative;
    --bc: #ff66fe;
  }
  
`;

export default AdminHeader;
