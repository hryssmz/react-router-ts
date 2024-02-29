// error-boundaries/routes/ProjectErrorBoundary.tsx
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ProjectErrorBoundary() {
  const error = useRouteError();

  // We only care to handle 401's at this level, so if this is not a 401
  // ErrorResponse, re-throw to let the RootErrorBoundary handle it
  if (!isRouteErrorResponse(error) || error.status !== 401) {
    throw error;
  }

  return (
    <>
      <h1>You do not have access to this project</h1>
      Please reach out to{" "}
      <a href={`mailto:${error.data.contactEmail}`}>
        {error.data.contactEmail}
      </a>{" "}
      to obtain access.
    </>
  );
}
