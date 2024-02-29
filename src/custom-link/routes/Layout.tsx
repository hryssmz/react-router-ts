// custom-link/routes/Layout.tsx
import { Outlet } from "react-router-dom";
import CustomLink from "../components/CustomLink";

export default function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <CustomLink to="/">Home</CustomLink>
          </li>
          <li>
            <CustomLink to="/about">About</CustomLink>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
