// custom-link/App.tsx
import { Route, Routes } from "react-router-dom";
import About from "./routes/About";
import Home from "./routes/Home";
import Layout from "./routes/Layout";
import NoMatch from "./routes/NoMatch";

export default function App() {
  return (
    <div>
      <h1>Custom Link Example</h1>

      <p>
        This example demonstrates how to create a custom{" "}
        <code>&lt;Link&gt;</code> component that knows whether or not it is
        "active" using the low-level <code>useResolvedPath()</code> and{" "}
        <code>useMatch()</code> hooks.
      </p>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}
