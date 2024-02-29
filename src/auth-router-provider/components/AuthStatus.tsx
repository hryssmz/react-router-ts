// auth-router-provider/components/AuthStatus.ts
import { useFetcher } from "react-router-dom";

export interface AuthStatusProps {
  user: string | null;
}

export default function AuthStatus({ user }: AuthStatusProps) {
  const fetcher = useFetcher();

  if (!user) {
    return <p>You are not logged in.</p>;
  }

  const isLoggingOut = !!fetcher.formData;

  return (
    <div>
      <p>Welcome {user}!</p>
      <fetcher.Form method="post" action="/logout">
        <button type="submit" disabled={isLoggingOut}>
          {isLoggingOut ? "Signing out..." : "Sign out"}
        </button>
      </fetcher.Form>
    </div>
  );
}
