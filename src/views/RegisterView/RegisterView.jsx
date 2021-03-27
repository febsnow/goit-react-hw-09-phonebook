import React, { useState } from "react";
import { connect } from "react-redux";
import authOperations from "../../redux/auth/auth-operations";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import styles from "./RegisterView.module.css";

function RegisterView({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function changeHandler(e) {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        return;
    }
  }
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  const submitHandler = (evt) => {
    evt.preventDefault();
    const user = {
      name,
      email,
      password,
    };
    onSubmit(user);
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <form className={styles.form} onSubmit={submitHandler} autoComplete="off">
        <TextField
          className={styles.formField}
          type="text"
          value={name}
          name="name"
          placeholder="Enter your name"
          label="User name"
          autoComplete="off"
          required
          variant="outlined"
          onChange={changeHandler}
        />
        <TextField
          className={styles.formField}
          type="email"
          value={email}
          name="email"
          placeholder="Enter your e-mail"
          label="E-mail"
          required
          variant="outlined"
          onChange={changeHandler}
        />
        <TextField
          className={styles.formField}
          type="password"
          value={password}
          name="password"
          placeholder="Enter your password"
          required
          label="Password"
          variant="outlined"
          onChange={changeHandler}
        />
        <Button
          className={styles.registerBtn}
          variant="contained"
          size="large"
          color="primary"
          type="submit"
        >
          Register
        </Button>
      </form>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (newUser) => {
    dispatch(authOperations.registerUser(newUser));
  },
});

// const mapDispatchToProps = {
//   onSubmit: operations.registerUser
// };

export default connect(null, mapDispatchToProps)(RegisterView);
