import ImgSize from "../components/imgsize";
import loading from "../assets/images/loading2.gif";
import styled from "styled-components";
const LoadingPage = () => {
  return (
    <Wrapper>
      <ImgSize url={loading} width="300px" height="300px" />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
export default LoadingPage;
