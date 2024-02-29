// scroll-restoration/App.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./routes/Layout";
import LongPage, { loader as getArrayLoader } from "./routes/LongPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <h2>Home</h2>,
      },
      {
        path: "restore-by-key",
        loader: getArrayLoader,
        element: <LongPage />,
      },
      {
        path: "restore-by-pathname",
        loader: getArrayLoader,
        element: <LongPage />,
        handle: { scrollMode: "pathname" },
      },
      {
        path: "link-to-hash",
        loader: getArrayLoader,
        element: <LongPage />,
      },
    ],
  },
]);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
