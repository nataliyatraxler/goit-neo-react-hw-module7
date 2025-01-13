import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "./redux/contactsOps";
import { selectContacts } from "./redux/contactsSlice";
import ContactList from "./components/ContactList/ContactList";
import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const loading = useSelector((state) => state.contacts.loading);
  const error = useSelector((state) => state.contacts.error);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="app">
      <h1>Phonebook</h1>
      {/* Форма добавления контакта */}
      <ContactForm />
      {/* Поле поиска */}
      <SearchBox />
      {/* Показ загрузки или ошибки */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {/* Список контактов */}
      <ContactList contacts={contacts} />
    </div>
  );
};

export default App;
