// data-router/components/TodosBoundary.tsx
import { useRouteError } from "react-router-dom";

export default function TodosBoundary() {
  const error = useRouteError() as Error;
  return (
    <>
      <h2>Error 💥</h2>
      <p>{error.message}</p>
    </>
  );
}
