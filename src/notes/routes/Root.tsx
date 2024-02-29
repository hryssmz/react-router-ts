// notes/routes/Root.tsx
import { Link, Outlet, useLoaderData } from "react-router-dom";
import { getNotes } from "../lib/notes";

export function loader() {
  return getNotes();
}

export default function Root() {
  const notes = useLoaderData() as ReturnType<typeof loader>;

  return (
    <div style={{ display: "flex" }}>
      <div style={{ padding: "0 2rem", borderRight: "solid 1px #ccc" }}>
        <h1>Notes!</h1>
        <p>
          <Link to="new">Create Note</Link>
        </p>
        <ul>
          {notes.map(note => (
            <li>
              <Link to={`/note/${note.id}`}>{note.title}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ flex: 1, padding: "0 2rem" }}>
        <Outlet />
      </div>
    </div>
  );
}
