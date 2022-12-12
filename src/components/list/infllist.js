import styled from "styled-components";
import { MdCampaign, MdMessage, MdOutlineAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  PUBLIC_ACCOUNT,
  PUBLIC_INFLUENCER,
  PUBLIC_CAMPAIGN,
  PUBLIC_MESSAGE,
} from "../../configs/router-config";

const Infllist = () => {
  return (
    <>
      <Wrapper1>
        <Wrapperbutton to={PUBLIC_INFLUENCER + PUBLIC_CAMPAIGN}>
          <MdCampaign />
          Campaigns
        </Wrapperbutton>
        <Wrapperbutton to={PUBLIC_INFLUENCER + PUBLIC_MESSAGE}>
          <MdMessage />
          Messages
        </Wrapperbutton>
        <Wrapperbutton to={PUBLIC_INFLUENCER + PUBLIC_ACCOUNT}>
          <MdOutlineAccountCircle />
          Account Details
        </Wrapperbutton>
      </Wrapper1>
      <Wrapper2>
        <Wrapperbutton to={PUBLIC_INFLUENCER + PUBLIC_CAMPAIGN}>
          <MdCampaign />
        </Wrapperbutton>
        <Wrapperbutton to={PUBLIC_INFLUENCER + PUBLIC_MESSAGE}>
          <MdMessage />
        </Wrapperbutton>
        <Wrapperbutton to={PUBLIC_INFLUENCER + PUBLIC_ACCOUNT}>
          <MdOutlineAccountCircle />
        </Wrapperbutton>
      </Wrapper2>
    </>
  );
};
const Wrapper1 = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  border-right: 5px solid rgba(235, 240, 240, 0.9);
  padding: 50px 20px;
  max-width: 250px;
  width: 100%;
  height: 80%;
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
    overflow: auto;
  }
`;
const Wrapperbutton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: none;
  color: #5d5d5b;
  font-weight: 700;
  font-size: 14px;
  gap: 10px;
  text-decoration: none;
  margin: 30px 30px;
`;
export default Infllist;
