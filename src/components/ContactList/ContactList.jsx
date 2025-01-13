import { useDispatch, useSelector } from "react-redux";
import { deleteContact, selectFilteredContacts } from "../../redux/contactsSlice";
import styles from "./ContactList.module.css";

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);  // Используем селектор для фильтрации

  const handleDelete = (id) => {
    dispatch(deleteContact(id)); // Удаляем контакт
  };

  return (
    <ul className={styles.list}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={styles.contactCard}>
          <div className={styles.contactInfo}>
            <span className={styles.icon}>👤</span>
            <p>{name}</p>
          </div>
          <div className={styles.contactInfo}>
            <span className={styles.icon}>📞</span>
            <p>{number}</p>
          </div>
          <button
            className={styles.deleteButton}
            onClick={() => handleDelete(id)}
          >
            🗑️
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
