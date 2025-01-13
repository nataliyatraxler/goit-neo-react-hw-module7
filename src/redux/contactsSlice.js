import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// MockAPI URL
const API_URL = "https://678415ac8b6c7a1316f6aa51.mockapi.io/contacts";

// Fetch contacts from MockAPI
export const fetchContacts = createAsyncThunk("contacts/fetchContacts", async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch contacts");
  }
  return response.json();
});

// Add contact to MockAPI
export const addContactToApi = createAsyncThunk("contacts/addContact", async (contact) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });
  if (!response.ok) {
    throw new Error("Failed to add contact");
  }
  return response.json();
});

// Delete contact from MockAPI
export const deleteContact = createAsyncThunk("contacts/deleteContact", async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete contact");
  }
  return id;
});

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    filter: "",  // Добавляем фильтр
    status: "idle",
    error: null,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload; // Устанавливаем значение фильтра
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addContactToApi.fulfilled, (state, action) => {
        state.items.push(action.payload); // Добавляем новый контакт в список
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter((contact) => contact.id !== action.payload);
      });
  },
});

// Selector for contacts
export const selectContacts = (state) => state.contacts.items;
export const selectFilter = (state) => state.contacts.filter; // Селектор для фильтра

// Export actions
export const { setFilter } = contactsSlice.actions;

export default contactsSlice.reducer;
