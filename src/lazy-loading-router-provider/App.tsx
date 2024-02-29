// lazy-loading-router-provider/App.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import Layout from "./routes/Layout";
import NoMatch from "./routes/NoMatch";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        lazy: () => import("./pages/About"),
      },
      {
        path: "dashboard",
        lazy: () => import("./pages/DashboardLayout"),
        children: [
          {
            index: true,
            lazy: () => import("./pages/DashboardIndex"),
          },
          {
            path: "messages",
            lazy: () => import("./pages/DashboardMessages"),
          },
        ],
      },
      {
        path: "*",
        element: <NoMatch />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
