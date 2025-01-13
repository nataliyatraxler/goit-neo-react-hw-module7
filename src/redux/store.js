import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contactsSlice"; // Путь к вашему редьюсеру

// Создаем store
const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});

export { store }; // Экспортируем store как именованный экспорт
