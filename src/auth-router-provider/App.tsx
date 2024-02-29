// auth-router-provider/App.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout, { loader as layoutLoader } from "./routes/Layout";
import LoginPage, {
  action as loginAction,
  loader as loginLoader,
} from "./routes/LoginPage";
import { action as logoutAction } from "./routes/Logout";
import ProtectedPage, {
  loader as protectedLoader,
} from "./routes/ProtectedPage";
import PublicPage from "./routes/PublicPage";

const router = createBrowserRouter([
  {
    path: "/",
    loader: layoutLoader,
    Component: Layout,
    children: [
      {
        index: true,
        Component: PublicPage,
      },
      {
        path: "login",
        loader: loginLoader,
        action: loginAction,
        Component: LoginPage,
      },
      {
        path: "protected",
        loader: protectedLoader,
        Component: ProtectedPage,
      },
    ],
  },
  {
    path: "/logout",
    action: logoutAction,
  },
]);

export default function App() {
  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
}
