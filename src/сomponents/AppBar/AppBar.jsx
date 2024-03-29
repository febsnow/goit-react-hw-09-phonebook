import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { useSelector } from "react-redux";
import Navigation from "../Navigation/Navigation";
import authSelectors from "../../redux/auth/auth-selectors";
import UserMenu from "../UserMenu/UserMenu";
import LoginMenu from "../LoginMenu/LoginMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function TopBar() {
  const isLoggedIn = useSelector(authSelectors.getAuthorised);
  const classes = useStyles();

  return (
    <header className={classes.root}>
      <AppBar position="relative">
        <Toolbar style={{ width: "80%", margin: "0 auto" }} variant="dense">
          <Navigation />
          {isLoggedIn ? <UserMenu /> : <LoginMenu />}
        </Toolbar>
      </AppBar>
    </header>
  );
}
