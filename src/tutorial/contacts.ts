// tutorial/contacts.ts
export interface Contact {
  id: string;
  first?: string;
  last?: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite?: boolean;
  createdAt?: number;
}

const cache = new Set<string>();

export async function getContacts(query?: string): Promise<Contact[]> {
  await fakeNetwork(`getContacts:${query ?? ""}`);
  const contacts: Contact[] = JSON.parse(
    sessionStorage.getItem("contacts") ?? "[]"
  );
  if (query === undefined) {
    return contacts;
  }
  return contacts.filter(
    ({ first, last }) =>
      first?.toLowerCase().includes(query.toLowerCase()) ||
      last?.toLowerCase().includes(query.toLowerCase())
  );
}

export async function createContact() {
  await fakeNetwork();
  const id = Math.random().toString(36).substring(2, 9);
  const contact: Contact = { id, createdAt: Date.now() };
  const contacts: Contact[] = JSON.parse(
    sessionStorage.getItem("contacts") ?? "[]"
  );
  contacts.unshift(contact);
  sessionStorage.setItem("contacts", JSON.stringify(contacts));
  return contact;
}

export async function getContact(id: string) {
  await fakeNetwork(`contact:${id}`);
  const contacts: Contact[] = JSON.parse(
    sessionStorage.getItem("contacts") ?? "[]"
  );
  const contact = contacts.find(contact => contact.id === id);
  return contact;
}

export async function updateContact(id: string, updates: Partial<Contact>) {
  await fakeNetwork();
  const contacts: Contact[] = JSON.parse(
    sessionStorage.getItem("contacts") ?? "[]"
  );
  const contact = contacts.find(contact => contact.id === id);
  if (!contact) {
    throw new Error(`No contact found for ${id}`);
  }
  Object.assign(contact, updates);
  sessionStorage.setItem("contacts", JSON.stringify(contacts));
  return contact;
}

export async function deleteContact(id: string) {
  const contacts: Contact[] = JSON.parse(
    sessionStorage.getItem("contacts") ?? "[]"
  );
  const index = contacts.findIndex(contact => contact.id === id);
  if (index > -1) {
    contacts.splice(index, 1);
    sessionStorage.setItem("contacts", JSON.stringify(contacts));
    return true;
  }
  return false;
}

async function fakeNetwork(key?: string) {
  if (key === undefined) {
    cache.clear();
    await new Promise(resolve => setTimeout(resolve, Math.random() * 800));
    return;
  }
  if (cache.has(key)) {
    return;
  }
  cache.add(key);
  await new Promise(resolve => setTimeout(resolve, Math.random() * 800));
  return;
}
