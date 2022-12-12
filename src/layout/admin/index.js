import AdminContent from "../../components/admin/admincontent";
import AdminHeader from "../../components/admin/adminheader";
import styled from "styled-components";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  box-sizing: border-box;
`;
const WrapperContent = styled.div`
  display: flex;
  height: 100%;
  justify-content: flex-start;
  background: #131129;
`;

const Adminlayout = () => {
  return (
    <Wrapper>
      <WrapperContent>
        <AdminHeader />
        <AdminContent />
      </WrapperContent>
    </Wrapper>
  );
};
export default Adminlayout;
