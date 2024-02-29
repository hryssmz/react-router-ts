// notes/routes/Note.tsx
import { Form, redirect, useLoaderData } from "react-router-dom";
import { deleteNote, getNote } from "../lib/notes";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom";

export function loader({ params }: LoaderFunctionArgs) {
  const note = getNote(params.noteId!);
  if (note === undefined) {
    throw new Response("", { status: 404 });
  }
  return note;
}

export function action({ params }: ActionFunctionArgs) {
  deleteNote(params.noteId!);
  return redirect("/new");
}

export default function Note() {
  const note = useLoaderData() as ReturnType<typeof loader>;
  return (
    <div>
      <h2>{note.title}</h2>
      <div>{note.content}</div>
      <Form method="post" style={{ marginTop: "2rem" }}>
        <button type="submit">Delete</button>
      </Form>
    </div>
  );
}
