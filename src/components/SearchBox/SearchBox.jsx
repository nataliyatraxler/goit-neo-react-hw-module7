
import { useDispatch, useSelector } from "react-redux";
import { setFilter, selectFilter } from "../../redux/contactsSlice";
import styles from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleChange = (e) => {
    dispatch(setFilter(e.target.value)); 
  };

  return (
    <input
      type="text"
      value={filter}
      onChange={handleChange}
      placeholder="Search contacts"
      className={styles.searchInput}
    />
  );
};

export default SearchBox;
