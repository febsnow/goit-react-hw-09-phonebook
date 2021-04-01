import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import authSelectors from "../../redux/auth/auth-selectors";

export default function PrivateRoute({ component: Component, ...routeProps }) {
  const isLoggedIn = useSelector(authSelectors.getAuthorised);
  return <Route {...routeProps} render={(props) => (isLoggedIn ? <Component {...props} /> : <Redirect to="/" />)} />;
}
