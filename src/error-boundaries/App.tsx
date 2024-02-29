// error-boundaries/App.tsx
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./index.css";
import Fallback from "./routes/Fallback";
import Layout from "./routes/Layout";
import Project, { loader as projectLoader } from "./routes/Project";
import ProjectErrorBoundary from "./routes/ProjectErrorBoundary";
import RootErrorBoundary from "./routes/RootErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Outlet />,
        errorElement: <RootErrorBoundary />,
        children: [
          {
            path: "projects/:projectId",
            element: <Project />,
            errorElement: <ProjectErrorBoundary />,
            loader: projectLoader,
          },
        ],
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
