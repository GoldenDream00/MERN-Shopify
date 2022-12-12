import styled from "styled-components";
import CampaignTable from "../../../components/campaign/campaigntable";

const Campaign = () => {
  return (
    <Wrapper>
      <CampaignTable />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
`;

export default Campaign;
