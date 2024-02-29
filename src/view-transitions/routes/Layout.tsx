// view-transitions/routes/Layout.tsx
import { Outlet, useNavigation } from "react-router-dom";
import Nav from "../components/Nav";

export default function Layout() {
  const navigation = useNavigation();
  return (
    <>
      {navigation.state !== "idle" && (
        <div className="is-loading">Loading...</div>
      )}
      <Nav />
      <div className="content">
        <Outlet />
      </div>
    </>
  );
}
