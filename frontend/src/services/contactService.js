// frontend/src/services/contactService.js
import API from "./api";

/**
 * Contacts can be of type 'client', 'supplier' or 'ol'.
 */
export async function fetchContacts() {
  const resp = await API.get("/contacts");
  return resp.data;
}

export async function createContact(contact) {
  const resp = await API.post("/contacts", contact);
  return resp.data;
}

export async function deleteContact(id) {
  await API.delete(`/contacts/${id}`);
}
