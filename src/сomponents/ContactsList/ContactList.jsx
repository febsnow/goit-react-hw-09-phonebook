import React from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import operations from "../../redux/contacts/contacts-operations";
import {
  getAllContacts,
  getFilteredContacts,
} from "../../redux/contacts/contacts-selectors";
import "./ContactList.css";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import IconButton from "@material-ui/core/IconButton";
import contactsActions from "../../redux/contacts/contacts-actions";
// import ErrorPrompt from "../ErrorPrompt/ErrorPrompt";

ContactList.propTypes = {
  items: PropTypes.array,
  handleRemove: PropTypes.func,
  pickContactToEdit: PropTypes.func,
};


export default function ContactList() {
  const dispatch = useDispatch();
  const allContacts = useSelector(getAllContacts);
  const filteredContacts = useSelector(getFilteredContacts);

  let items = allContacts;
  
  if (filteredContacts && filteredContacts.length > 0) {
   items = filteredContacts ;
  }
  if (filteredContacts && filteredContacts.length === 0) {
    items = null;
  }

  

  const handleRemove = id => dispatch(operations.removeContact(id));

  const pickContactToEdit = (id, name, number) =>
      dispatch(contactsActions.pickContactToEdit(id, name, number)) 

  return (
    <>
      {items === null && <p>Nothing found</p>}
      <TransitionGroup component="ul" className="list">
        {items &&
          items.map((contact) => {
            return (
              <CSSTransition
                appear={true}
                key={contact.id}
                timeout={650}
                classNames="item"
                unmountOnExit
              >
                <li className="listItem">
                  <span className="info">{contact.name}:</span>
                  <span className="info">{contact.number}</span>
                  <ButtonGroup>
                    <IconButton
                      variant="outlined"
                      size="small"
                      color="default"
                      type="button"
                      onClick={()=>pickContactToEdit(
                          contact.id,
                          contact.name,
                          contact.number
                        )
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      variant="contained"
                      size="small"
                      color="secondary"
                      type="button"
                      onClick={()=>
                        handleRemove(contact.id)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ButtonGroup>
                </li>
              </CSSTransition>
            );
          })}
      </TransitionGroup>
    </>
  );
}



