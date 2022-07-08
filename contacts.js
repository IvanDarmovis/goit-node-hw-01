const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const list = JSON.parse(data);
  return list;
};

const getContactById = async (id) => {
  const list = await listContacts();
  console.log(id.toString());
  const contact = list.find((el) => el.id === id.toString());
  if (!contact) return null;
  return contact;
};

const removeContactById = async (id) => {
  const list = await listContacts();
  const contact = list.find((el) => el.id === id.toString());
  if (!contact) return null;
  const newList = list.filter((el) => el.id !== id.toString());
  await fs.writeFile(contactsPath, JSON.stringify(newList));
  return contact;
};

const addContact = async (name, email, phone) => {
  const list = await listContacts();
  const contact = { name, email, phone, id: v4() };
  const newList = [...list, contact];
  await fs.writeFile(contactsPath, JSON.stringify(newList));
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContactById,
  addContact
};
