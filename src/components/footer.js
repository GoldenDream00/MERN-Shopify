import styled from "styled-components";
import { BiWorld } from "react-icons/bi";

const Footer = () => {
  return (
    <Wrapper>
      <Wrappercontent>
        <Wrappertext>Privacy Policy</Wrappertext>
        <Wrappertext>License</Wrappertext>
        <Wrappertext>API</Wrappertext>
        <Wrappertext1>© 2022 All rights reserved</Wrappertext1>
      </Wrappercontent>
      <Wrappercontent>
        <Wrappertext>Currency - USD</Wrappertext>
        <Wrappertext>
          English
          <BiWorld />
        </Wrappertext>
      </Wrappercontent>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(235, 240, 240, 0.5);
  font-size: 12px;
  font-weight: 700;
  padding: 30px;
  @media screen and (max-width: 600px) {
    padding: 30px 5px;
  }
`;
const Wrappercontent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
const Wrappertext = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
const Wrappertext1 = styled.div`
  color: #5d5d5b;
`;

export default Footer;
