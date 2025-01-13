import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContactToApi, selectContacts } from "../../redux/contactsSlice";
import styles from "./ContactForm.module.css";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверка на уникальность имени
    if (
      contacts.some(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      setError(`${name} already exists in contacts.`);
      return;
    }

    // Валидация имени
    if (name.length < 3) {
      setError("The name should be at least 3 symbols.");
      return;
    }

    // Валидация номера телефона
    const phoneRegex = /^\d{3}-\d{2}-\d{2}$/;
    if (!phoneRegex.test(number)) {
      setError("The number must be in format 123-45-67.");
      return;
    }

    // Добавление контакта в Redux
    dispatch(addContactToApi({ name, number }));

    // Очистка формы
    setName("");
    setNumber("");
    setError("");
  };

  return (
    <form className={styles["contact-form"]} onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className={styles.input}
        />
      </label>
      <label>
        Number:
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="123-45-67"
          required
          className={styles.input}
        />
      </label>
      {error && <p className={styles["error-message"]}>{error}</p>}
      <button type="submit" className={styles.button}>
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
