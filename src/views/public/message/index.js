import styled from "styled-components";
import Home from "./home";
const Message = () => {
  return (
    <Wrapper>
      <Home />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 10px;
`;
export default Message;
