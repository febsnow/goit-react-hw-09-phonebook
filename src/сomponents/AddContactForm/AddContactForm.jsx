import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import operations from "../../redux/contacts/contacts-operations";
import {
  getAllContacts,
  contactToEdit,
  isEditMode,
} from "../../redux/contacts/contacts-selectors";
import Button from "@material-ui/core/Button";

import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./AddContactForm.module.css";
import contactsActions from "../../redux/contacts/contacts-actions";


export default function AddContactForm() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const items = useSelector(getAllContacts);
  const contactIsEditing = useSelector(contactToEdit);
  const editMode = useSelector(isEditMode)

  const dispatch = useDispatch();

  useEffect(() => {
    setName(contactIsEditing.name);
    setNumber(contactIsEditing.number);
  }, [contactIsEditing.name, contactIsEditing.number]);

  const onExitEdit = () => dispatch(contactsActions.exitEditMode());

  function changeHandler(e) {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "number":
        setNumber(e.target.value);
        break;
      default:
        return;
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      items.find(
        (contact) =>
          contact.name.toLowerCase() === name.toLowerCase() &&
          contact.id !== contactIsEditing.id
      )
    ) {
      return toast.error(`${name} already exist`);
    }

    const contact = {
      name,
      number,
      id: contactIsEditing.id || null,
    };

    if (contact.id) {
      return dispatch(operations.editContact(contact));
    }
    dispatch(operations.addContact(contact));
    
    setName("");
    setNumber("");
  }
  

  return (
    <>
      <form className={styles.contactsForm} onSubmit={submitHandler}>
        <label htmlFor="contactName" className={styles.label}>
          Name
        </label>
        <input
          className={styles.formInput}
          type="text"
          value={name}
          name="name"
          id="contactName"
          placeholder="Enter name"
          required
          onChange={changeHandler}
        />
        <label htmlFor="contactNumber" className={styles.label}>
          Number
        </label>
        <input
          className={styles.formInput}
          type="tel"
          value={number}
          name="number"
          id="contactNumber"
          placeholder="Enter phone number"
          required
          onChange={changeHandler}
        />
        {editMode ? (
          <>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<EditIcon />}
              type="submit"
              size="small"
            >
              Save changes
            </Button>
            <Button
              variant="contained"
              color="default"
              startIcon={<CloseIcon />}
              type="button"
              size="small"
              onClick={onExitEdit}
            >
              Discard changes
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            size="medium"
            color="primary"
            startIcon={<SaveIcon />}
            type="submit"
          >
            Add contacts
          </Button>
        )}
      </form>
    </>
  );
}



