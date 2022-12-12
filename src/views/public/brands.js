import { Switch, Route, Redirect } from "react-router-dom";
import {
  PUBLIC_ACCOUNT,
  PUBLIC_BRAND,
  PUBLIC_CAMPAIGN,
  PUBLIC_CATALOGUE,
  PUBLIC_HELP,
  PUBLIC_INFLUENCER,
  PUBLIC_MESSAGE,
  PUBLIC_TUTORIALS,
} from "../../configs/router-config";
import Account from "./account";
import Message from "./message";
import Campaign from "./campaign";
import Catalogue from "./catalogue";
import Influencer from "./influencer/index";
import Tutorials from "./tutorials";
import Help from "./help";
import NoPage from "./404page";
import Nopagepng from "../../assets/images/404.jpg";
export default function PublicViews() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to={PUBLIC_BRAND + PUBLIC_CAMPAIGN} />
      </Route>
      <Route exact path={PUBLIC_BRAND + PUBLIC_CAMPAIGN} component={Campaign} />
      <Route exact path={PUBLIC_BRAND + PUBLIC_MESSAGE} component={Message} />
      <Route exact path={PUBLIC_BRAND + PUBLIC_HELP} component={Help} />
      <Route exact path={PUBLIC_BRAND + PUBLIC_ACCOUNT} component={Account} />
      <Route
        exact
        path={PUBLIC_BRAND + PUBLIC_CATALOGUE}
        component={Catalogue}
      />
      <Route
        exact
        path={PUBLIC_BRAND + PUBLIC_INFLUENCER}
        component={Influencer}
      />
      <Route
        exact
        path={PUBLIC_BRAND + PUBLIC_TUTORIALS}
        component={Tutorials}
      />
      <Route path={"/*"} component={() => <NoPage src={Nopagepng} />} />
    </Switch>
  );
}
