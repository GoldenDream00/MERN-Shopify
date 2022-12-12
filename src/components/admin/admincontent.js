import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import {
  ADMIN_PREFIX,
  PUBLIC_BRAND,
  PUBLIC_INFLUENCER,
  PUBLIC_SUBSCRIPTION,
} from "../../configs/router-config";
import BrandTable from "./BrandTable";
import SearchHeader from "./header";
import InfluencerTable from "./influencerTable";
import SubScriptionTable from "./subscription";
const AdminContent = () => {
  return (
    <>
      <Wrapper>
        <SearchHeader />
        <Switch>
          <Route exact path={ADMIN_PREFIX + PUBLIC_BRAND}>
            <BrandTable />
          </Route>
          <Route exact path={ADMIN_PREFIX + PUBLIC_INFLUENCER}>
            <InfluencerTable />
          </Route>
          <Route exact path={ADMIN_PREFIX + PUBLIC_SUBSCRIPTION}>
            <SubScriptionTable />
          </Route>
        </Switch>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 50px 50px 50px;
  width: 100%;
  gap: 50px;
  box-sizing: border-box;
`;
export default AdminContent;
