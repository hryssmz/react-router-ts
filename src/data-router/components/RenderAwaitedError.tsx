// data-router/components/RenderAwaitedError.tsx
import { useAsyncError } from "react-router-dom";

export default function RenderAwaitedError() {
  const error = useAsyncError() as Error;
  return (
    <p style={{ color: "red" }}>
      Error (errorElement)!
      <br />
      {error.message} {error.stack}
    </p>
  );
}
