
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";
import styles from "./Contact.module.css";

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <li className={styles["contact-card"]}>
      <div className={styles["contact-info"]}>
        <span className={styles["contact-icon"]}>👤</span>
        <p className={styles["contact-name"]}>{name}</p>
      </div>
      <div className={styles["contact-info"]}>
        <span className={styles["contact-icon"]}>📞</span>
        <p className={styles["contact-phone"]}>{number}</p>
      </div>
      <button className={styles["delete-button"]} onClick={handleDelete}>
        🗑️
      </button>
    </li>
  );
};

export default Contact;
