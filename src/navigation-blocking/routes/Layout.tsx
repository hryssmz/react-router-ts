// navigation-blocking/routes/Layout.tsx
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const [historyIndex, setHistoryIndex] = useState<number>(
    window.history.state?.idx ?? -1
  );
  const location = useLocation();

  useEffect(() => {
    // Expose the underlying history index in the UI for debugging
    setHistoryIndex(window.history.state?.idx ?? -1);
    // Give us meaningful document titles for popping back/forward more than 1 entry
    document.title = location.pathname;
  }, [location]);

  return (
    <>
      <h1>Navigation Blocking Example</h1>
      <nav>
        <Link to="/">Index</Link>&nbsp;&nbsp;
        <Link to="/one">One</Link>&nbsp;&nbsp;
        <Link to="/two">Two</Link>&nbsp;&nbsp;
        <Link to="/three">Three (Form with blocker)</Link>&nbsp;&nbsp;
        <Link to="/four">Four</Link>&nbsp;&nbsp;
        <Link to="/five">Five</Link>&nbsp;&nbsp;
      </nav>
      <p>
        Current location (index): {location.pathname} ({historyIndex})
      </p>
      <Outlet />
    </>
  );
}
