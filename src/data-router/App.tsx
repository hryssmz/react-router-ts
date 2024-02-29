// data-router/App.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Fallback from "./components/Fallback";
import TodosBoundary from "./components/TodosBoundary";
import DeferredPage, { loader as deferredLoader } from "./routes/DeferredPage";
import Home, { loader as homeLoader } from "./routes/Home";
import Layout from "./routes/Layout";
import Todo, { loader as todoLoader } from "./routes/Todo";
import TodosList, {
  action as todosAction,
  loader as todosLoader,
} from "./routes/TodosList";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        loader: homeLoader,
        Component: Home,
      },
      {
        path: "todos",
        action: todosAction,
        loader: todosLoader,
        Component: TodosList,
        ErrorBoundary: TodosBoundary,
        children: [
          {
            path: ":id",
            loader: todoLoader,
            Component: Todo,
          },
        ],
      },
      {
        path: "deferred",
        loader: deferredLoader,
        Component: DeferredPage,
      },
    ],
  },
]);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

export default function App() {
  return <RouterProvider router={router} fallbackElement={<Fallback />} />;
}
