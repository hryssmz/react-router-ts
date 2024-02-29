// notes/routes/NewNote.tsx
import { Form, redirect } from "react-router-dom";
import { createNote } from "../lib/notes";
import type { ActionFunctionArgs } from "react-router-dom";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const note = createNote({
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  });
  return redirect(`/note/${note.id}`);
}

export default function NewNote() {
  return (
    <Form method="post">
      <p>
        <label>
          Title
          <br />
          <input type="text" name="title" />
        </label>
        <br />
        <label>
          <label htmlFor="content">Content</label>
          <br />
          <textarea name="content" id="content" cols={30} rows={10} />
        </label>
      </p>
    </Form>
  );
}
