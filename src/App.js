import React, { lazy, Suspense, useEffect } from "react";
import { Switch } from "react-router";
import { connect } from "react-redux";
import { Flip, ToastContainer } from "react-toastify";

import TopBar from "./сomponents/AppBar/AppBar";
import authOperations from "./redux/auth/auth-operations";
import PrivateRoute from "./сomponents/PrivateRoute/PrivateRoute";
import PublicRoute from "./сomponents/PublicRoute/PublicRoute";
import { Preloader } from "./сomponents/Loader/Loader";
import authSelectors from "./redux/auth/auth-selectors";

const HomeView = lazy(() => import("./views/HomeView/HomeView"));
const RegisterView = lazy(() => import("./views/RegisterView/RegisterView"));
const LoginView = lazy(() => import("./views/LoginView/LoginView"));
const PhoneBookView = lazy(() => import("./views/PhoneBookView/PhoneBook"));

function App({ onGetCurrentUser, isLoading }) {
  useEffect(() => {
    onGetCurrentUser();
  }, [onGetCurrentUser]);

  return (
    <>
      {isLoading && <Preloader />}
      <ToastContainer
        transition={Flip}
        autoClose={2000}
        hideProgressBar={true}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
      <TopBar />
      <Suspense fallback={<Preloader />}>
        <Switch>
          <PublicRoute path="/" exact component={HomeView} />
          <PublicRoute
            path="/login"
            restricted
            redirectTo="/phonebook"
            component={LoginView}
          />
          <PublicRoute
            path="/register"
            restricted
            redirectTo="/"
            component={RegisterView}
          />
          <PrivateRoute path="/phonebook" component={PhoneBookView} />
        </Switch>
      </Suspense>
    </>
  );
}

const mapStateToProps = (state) => ({
  isLoading: authSelectors.isLoading(state),
});
const mapDispatchToProps = (dispatch) => ({
  onGetCurrentUser: () => dispatch(authOperations.getCurrentUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
