import styled from "styled-components";
const Card = ({ header, text }) => {
  return (
    <Wrapper>
      <Wrapperheader>{header}</Wrapperheader>
      <Wrappertext>{text}</Wrappertext>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 40px;
  gap: 10px;
  @media screen and (max-width: 1000px) {
    padding: 20px;
  }
`;
const Wrapperheader = styled.div`
  font-weight: 500;
  font-size: 24px;
  @media screen and (max-width: 1000px) {
    font-size: 18px;
  }
`;
const Wrappertext = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  color: #5d5d5b;
  @media screen and (max-width: 1000px) {
    font-size: 14px;
  }
`;

export default Card;
