// modal-route-with-outlet/routes/Home.tsx
import { Link, Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h2>Home</h2>
      <p>
        Click over to the <Link to="/gallery">Gallery</Link> route to see the
        modal in action
      </p>
      <Outlet />
    </div>
  );
}
