// navigation-blocking/App.tsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./routes/Layout";
import ImportantForm, {
  action as importantFormAction,
} from "./routes/ImportantForm";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<h2>Index</h2>} />
      <Route path="one" element={<h2>One</h2>} />
      <Route path="two" element={<h2>Two</h2>} />
      <Route
        path="three"
        action={importantFormAction}
        element={
          <>
            <h2>Three</h2>
            <ImportantForm />
          </>
        }
      />
      <Route path="four" element={<h2>Four</h2>} />
      <Route path="five" element={<h2>Five</h2>} />
    </Route>
  )
);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

export default function App() {
  return <RouterProvider router={router} />;
}
