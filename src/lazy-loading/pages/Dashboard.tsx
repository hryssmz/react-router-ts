// lazy-loading/pages/Dashboard.tsx
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import DashboardIndex from "./DashboardIndex";
import Messages from "./Messages";

export default function Dashboard() {
  // These routes are defined when this component is loaded on demand via
  // dynamic import() on the home page!
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<DashboardIndex />} />
        <Route path="messages" element={<Messages />} />
      </Route>
    </Routes>
  );
}
