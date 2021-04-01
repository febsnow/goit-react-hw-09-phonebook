import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../redux/contacts/contacts-actions";
import { getFilter } from "../../redux/contacts/contacts-selectors";
import styles from "./Filter.module.css";



export default function Filter() {
  const dispatch = useDispatch();
  const value = useSelector(getFilter);
  const onFilterChange = (e) => dispatch(actions.filterContacts(e.target.value))
  
  return (
    <div className={styles.filter}>
      <label htmlFor="filter" className={styles.label}>
        Find contacts by name
      </label>
      <input
        className={styles.formInput}
        type="text"
        id="filter"
        name="filter"
        value={value}
        onChange={onFilterChange}
        autoComplete="off"
      ></input>
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};


