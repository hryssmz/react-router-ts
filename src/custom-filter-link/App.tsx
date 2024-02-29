// custom-filter-link/App.tsx
import { Route, Routes } from "react-router-dom";
import Layout from "./routes/Layout";
import NoMatch from "./routes/NoMatch";
import SneakerGrid from "./routes/SneakerGrid";
import SneakerView from "./routes/SneakerView";

export default function App() {
  return (
    <div>
      <h1>Custom Filter Link Example</h1>

      <p>
        This example demonstrates how to create a "filter link" like one that is
        commonly used to filter a list of products on an e-commerce website. The
        <code>&lt;BrandLink&gt;</code> component is a custom{" "}
        <code>&lt;Link&gt;</code> that knows whether or not it is currently
        "active" by what is in the URL query string.
      </p>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SneakerGrid />} />
          <Route path="/sneakers/:id" element={<SneakerView />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}
