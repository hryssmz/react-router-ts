// view-transitions/App.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./routes/Home";
import Action, { action as actionAction } from "./routes/Action";
import Defer, { loader as deferLoader } from "./routes/Defer";
import DeferNoBoundary, {
  loader as deferNoBoundaryLoader,
} from "./routes/DeferNoBoundary";
import Image from "./routes/Image";
import Images from "./routes/Images";
import Layout from "./routes/Layout";
import Loader, { loader as loaderLoader } from "./routes/Loader";

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
        path: "loader",
        loader: loaderLoader,
        Component: Loader,
      },
      {
        path: "action",
        action: actionAction,
        Component: Action,
      },
      {
        path: "defer",
        loader: deferLoader,
        Component: Defer,
      },
      {
        path: "defer-no-boundary",
        loader: deferNoBoundaryLoader,
        Component: DeferNoBoundary,
      },
      {
        path: "images",
        Component: Images,
      },
      {
        path: "images/:id",
        Component: Image,
      },
    ],
  },
]);

export default function App() {
  return (
    <RouterProvider
      router={router}
      future={{
        // Wrap all state updates in React.startTransition()
        v7_startTransition: true,
      }}
    ></RouterProvider>
  );
}
