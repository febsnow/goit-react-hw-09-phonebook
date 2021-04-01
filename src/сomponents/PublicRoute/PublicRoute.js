import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import authSelectors from "../../redux/auth/auth-selectors";

export default function PublicRoute({ component: Component, redirectTo, ...routeProps }) {
  const isLoggedIn = useSelector(authSelectors.getAuthorised);
  return (
    <Route
      {...routeProps}
      render={(props) =>
        isLoggedIn && routeProps.restricted ? <Redirect to={redirectTo} /> : <Component {...props} />
      }
    />
  );
}
