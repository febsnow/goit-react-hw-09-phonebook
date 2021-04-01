import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import authOperations from "../../redux/auth/auth-operations";

import styles from "./LoginView.module.css";


export default function LoginView() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeHandler = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        return;
    }
  };

  function submitHandler(evt) {
    evt.preventDefault();
    const user = { email, password };

    dispatch(authOperations.loginUser(user))
    setEmail("");
    setPassword("");
  }

  return (
    <>
      <form className={styles.form} onSubmit={submitHandler}>
        <TextField
          type="email"
          value={email}
          name="email"
          placeholder="Enter your e-mail"
          autoComplete="off"
          label="E-mail"
          id="standard-required"
          onChange={changeHandler}
        />
        <TextField
          type="password"
          value={password}
          name="password"
          placeholder="Enter your password"
          autoComplete="off"
          id="standard-password-input"
          label="Password"
          onChange={changeHandler}
        />
        <Button
          className={styles.loginBtn}
          variant="contained"
          size="large"
          color="primary"
          type="submit"
        >
          Login
        </Button>
      </form>
    </>
  );
}

LoginView.propTypes = {
  onSubmit: PropTypes.func,
};

