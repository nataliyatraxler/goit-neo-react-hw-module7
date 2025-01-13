import { useDispatch, useSelector } from "react-redux";
import { selectContacts, selectFilter, deleteContact } from "../../redux/contactsSlice";
import styles from "./ContactList.module.css";

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);  // Получаем все контакты из Redux
  const filter = useSelector(selectFilter); // Получаем фильтр из Redux

  // Логируем контакты и фильтр
  console.log("Contacts:", contacts);
  console.log("Filter:", filter);

  // Фильтруем контакты по имени
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = (id) => {
    dispatch(deleteContact(id)); // Удаляем контакт
  };

  return (
    <ul className={styles.list}>
      {filteredContacts.map(({ id, name, number }) => (
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
