// view-transitions/routes/Home.tsx
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return <h1>Home</h1>;
}
