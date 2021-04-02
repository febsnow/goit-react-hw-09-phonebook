import { useSelector } from "react-redux";
import authSelectors from "../../redux/auth/auth-selectors";

export default function HomeView() {
const isLoggedIn = useSelector(authSelectors.getAuthorised)
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Phonebook aplication</h1>
      {isLoggedIn ? (
        <p>Now you are free to work with PhoneBook</p>
      ) : (
        <p>Please register or login to get access to PhoneBook</p>
      )}
    </div>
  );
}



