import React, { Suspense, useContext, Fragment } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import {
  PUBLIC_SIGNIN,
  PUBLIC_SIGNUP,
  FORGOT,
  RESET,
  ADMIN_PREFIX,
  ADMIN_SIGN,
} from "../configs/router-config";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";
import { Offline, Online } from "react-detect-offline";
import LoadingPage from "./loading";
import Forgot from "./forgot";
import Reset from "./reset";

const Signin = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./public/sign/signin")), 1500);
  });
});
const Signup = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./public/sign/signup")), 1500);
  });
});
const Publiclayout = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("../layout/public")), 1500);
  });
});
const Adminlayout = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("../layout/admin")), 1500);
  });
});
export default function Views({ arrivalMessage }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  return (
    <Fragment>
      <Suspense fallback={<LoadingPage />}>
        <Online>
          <Switch location={location}>
            <Route exact path={PUBLIC_SIGNIN}>
              {user.user ? <Redirect to="/" /> : <Signin location={location} />}
            </Route>{" "}
            <Route exact path={PUBLIC_SIGNUP}>
              {user.user ? <Redirect to="/" /> : <Signup />}
            </Route>
            <Route exact path={FORGOT} component={Forgot} />
            <Route exact path={RESET + "/:token"} component={Reset} />
            <Route path={ADMIN_PREFIX} component={Adminlayout} />
            <Route path="/">
              {user.user ? <Publiclayout /> : <Signin location={location} />}
            </Route>
          </Switch>
        </Online>
        <Offline>
          <LoadingPage />
        </Offline>
        <ToastContainer />
      </Suspense>
    </Fragment>
  );
}
