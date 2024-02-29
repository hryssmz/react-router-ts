// notes/lib/notes.ts
export interface Note {
  id: string;
  title: string;
  content: string;
}

export function getNotes() {
  const notes: Note[] = JSON.parse(sessionStorage.getItem("notes") ?? "[]");
  return notes;
}

export function setNotes(notes: Note[]) {
  sessionStorage.setItem("notes", JSON.stringify(notes));
}

export function createNote({
  title,
  content,
}: Pick<Note, "title" | "content">) {
  const id = Math.random().toString(36).substring(2, 9);
  const note = { id, title, content };
  const notes = [note, ...getNotes()];
  setNotes(notes);
  return note;
}

export function getNote(id: string) {
  const notes = getNotes();
  const note = notes.find(note => note.id === id);
  return note;
}

export function deleteNote(id: string) {
  const notes = getNotes();
  const index = notes.findIndex(note => note.id === id);
  if (index > -1) {
    notes.splice(index, 1);
    setNotes(notes);
    return true;
  }
  return false;
}
