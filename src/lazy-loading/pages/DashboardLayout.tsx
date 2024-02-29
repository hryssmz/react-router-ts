// lazy-loading/pages/DashboardLayout.tsx
import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard Home</Link>
          </li>
          <li>
            <Link to="/dashboard/messages">Messages</Link>
          </li>
        </ul>
      </nav>
      <br />
      <Outlet />
    </div>
  );
}
