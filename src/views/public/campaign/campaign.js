import styled from "styled-components";
import InfluencerTable from "../../../components/campaign/inflcampaign";

const Campaign = () => {
  return (
    <Wrapper>
      <InfluencerTable />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100%;
`;

export default Campaign;
