import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import authSelectors from "../../redux/auth/auth-selectors";
import styles from "./Navigation.module.css";

export default function Navigation() {
  const isLoggedIn = useSelector(authSelectors.getAuthorised);
  return (
    <nav className={styles.nav}>
      <Link className={styles.link} to="/">
        Home
      </Link>
      {isLoggedIn && (
        <Link className={styles.link} to="/phonebook">
          PhoneBook
        </Link>
      )}
    </nav>
  );
};
