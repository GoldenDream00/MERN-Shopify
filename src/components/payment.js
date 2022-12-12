import styled from "styled-components";
import Subscription from "./subscription";
const SubscriptionTotal = ({ ispackage }) => {
  return (
    <Wrapper>
      {ispackage === "1" ? (
        <Subscription
          amount="100"
          text="Basic"
          flag=""
          paddingbt="50px 30px"
          token="P-0KW07900GM927923CMLKDXEY"
          ispackage="1"
        />
      ) : (
        <Subscription
          amount="100"
          text="Basic"
          token="P-0KW07900GM927923CMLKDXEY"
          ispackage="1"
        />
      )}
      {ispackage === "2" ? (
        <Subscription
          amount="200"
          text="Advance"
          flag=""
          paddingbt="50px 30px"
          token="P-53391604FJ3228607MLKDXTQ"
          ispackage="2"
        />
      ) : (
        <Subscription
          amount="200"
          text="Advance"
          token="P-53391604FJ3228607MLKDXTQ"
          ispackage="2"
        />
      )}
      {ispackage === "3" ? (
        <Subscription
          amount="300"
          text="Pro"
          flag=""
          paddingbt="50px 30px"
          ispackage="3"
          token="P-53391604FJ3228607MLKDXTQ"
        />
      ) : (
        <Subscription
          amount="300"
          text="Pro"
          ispackage="3"
          token="P-53391604FJ3228607MLKDXTQ"
        />
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  padding: 40px;
  margin: auto;
`;

export default SubscriptionTotal;
