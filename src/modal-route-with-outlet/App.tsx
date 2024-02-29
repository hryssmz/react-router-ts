// modal-route-with-outlet/App.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Gallery from "./routes/Gallery";
import Home from "./routes/Home";
import ImageView from "./routes/ImageView";
import Layout from "./routes/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "gallery",
        Component: Gallery,
        children: [
          {
            path: "img/:id",
            Component: ImageView,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
