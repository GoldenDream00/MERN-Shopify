import styled from "styled-components";
const NoPage = ({ src }) => {
  return <Wrapper src={src} />;
};
const Wrapper = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;
export default NoPage;
