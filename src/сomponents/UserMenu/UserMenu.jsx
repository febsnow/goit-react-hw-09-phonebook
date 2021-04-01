import { useSelector, useDispatch } from "react-redux";
import authOperations from "../../redux/auth/auth-operations";
import authSelectors from "../../redux/auth/auth-selectors";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import styles from "./UserMenu.module.css";

export default function UserMenu () {
  const dispatch = useDispatch();
  const userName = useSelector(authSelectors.getUserName)
  function onLogout() { dispatch(authOperations.logoutUser()) }
  
  return (
    <div className={styles.userMenu}>
      <p>Account: {userName}</p>

      <Button
        className={styles.logout}
        variant="outlined"
        size="small"
        endIcon={<ExitToAppIcon />}
        type="button"
        disableElevation
        onClick={onLogout}
      >
        Logout
      </Button>
    </div>
  );
};

