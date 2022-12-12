import styled from "styled-components";
import Button from "./button";
import PaypalIntegration from "./paypal";
import "../assets/css/Subscrption.css";
import { useState } from "react";
import { Modal } from "@mui/material";
import ImgSize from "./imgsize";
import paypaljpg from "../assets/images/paypal.jpg";

const Subscription = ({ amount, text, flag, paddingbt, token, ispackage }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <Wrapper paddingbt={paddingbt}>
      <WrapperText1>
        <WrapperText1Content>{text}</WrapperText1Content>
        {flag === "" && <Recommanded>Current Package</Recommanded>}
      </WrapperText1>
      <WrapperText2>${amount} per Month</WrapperText2>
      <Contentcheckboxgroup>
        <label className="container">
          All features and premium support
          <span className="checkmark" />
        </label>
        <label className="container">
          All features and premium support
          <span className="checkmark" />
        </label>
        <label className="container">
          All features and premium support
          <span className="checkmark" />
        </label>
        <label className="container">
          All features and premium support
          <span className="checkmark" />
        </label>
        <label className="container">
          All features and premium support
          <span className="checkmark" />
        </label>
      </Contentcheckboxgroup>
      <Button
        text="Buy now"
        width="200px"
        fsize="18px"
        onClick={() => setIsOpen(true)}
        radius="4px"
      />

      <Modal
        open={modalIsOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <InputContent>
          <WrapperInput>
            <Wrapper2>
              <ImgSize
                url={paypaljpg}
                width="100%"
                height="100%"
                radius="4px"
              />
            </Wrapper2>
            <PaypalIntegration
              amount={amount}
              plantoken={token}
              ispackage={ispackage}
            />
          </WrapperInput>
        </InputContent>
      </Modal>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 18.83px 47.08px rgba(47, 50, 125, 0.1);
  border-radius: 4px;
  gap: 50px;
  padding: ${(props) => (props.paddingbt ? props.paddingbt : "30px")};
  margin: auto;
`;
const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  width: 100%;
  box-shadow: 0px 18.83px 47.08px rgba(47, 50, 125, 0.1);
  border-radius: 4px;
  width: 300px;
  height: 300px;
`;
const WrapperText1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const WrapperText1Content = styled.div`
  font-weight: 800;
  font-size: 24px;
  color: #b224ef;
`;

const WrapperText2 = styled.div`
  font-weight: 800;
  font-size: 40px;
`;
const Contentcheckboxgroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const WrapperInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: white;
  padding: 30px;
  overflow: auto;
  height: 500px;
  border-radius: 4px;
`;

const InputContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
const Recommanded = styled.div`
  background: linear-gradient(90deg, #b224ef 0%, #7579ff 100%);
  padding: 2px 10px;
  color: white;
`;
export default Subscription;
