// basic-data-router/App.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home, { loader as homeLoader } from "./Home";

const router = createBrowserRouter([
  {
    path: "/",
    loader: homeLoader,
    Component: Home,
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
