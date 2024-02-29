// notes/App.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import NewNote, { action as newNoteAction } from "./routes/NewNote";
import Note, {
  action as noteAction,
  loader as noteLoader,
} from "./routes/Note";
import Root, { loader as rootLoader } from "./routes/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    children: [
      {
        path: "new",
        element: <NewNote />,
        action: newNoteAction,
      },
      {
        path: "note/:noteId",
        element: <Note />,
        loader: noteLoader,
        action: noteAction,
        errorElement: <h2>Note not found</h2>,
      },
    ],
  },
]);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

export default function App() {
  return <RouterProvider router={router} />;
}
