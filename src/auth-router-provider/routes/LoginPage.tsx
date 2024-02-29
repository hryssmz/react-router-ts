// auth-router-provider/routes/LoginPage.tsx
import {
  Form,
  redirect,
  useActionData,
  useLocation,
  useNavigation,
} from "react-router-dom";
import { fakeAuthProvider } from "../lib/auth";
import type { ActionFunctionArgs } from "react-router-dom";

export async function loader() {
  if (fakeAuthProvider.isAuthenticated) {
    return redirect("/");
  }
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get("username") as string | null;
  if (!username) {
    return {
      error: "You must provide a username to log in",
    };
  }

  // Sign in and redirect to the proper destination if successful.
  try {
    await fakeAuthProvider.signin(username);
  } catch (error) {
    // Unused as of now but this is how you would handle invalid
    // username/password combinations - just like validating the inputs
    // above
    return {
      error: "Invalid login attempt",
    };
  }

  const redirectTo = formData.get("redirectTo") as string | null;
  return redirect(redirectTo || "/");
}

export default function LoginPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get("from") || "/";
  const navigation = useNavigation();
  const isLoggingIn = !!navigation.formData?.get("username");
  const actionData = useActionData() as Awaited<ReturnType<typeof action>>;

  return (
    <div>
      <p>You must log in to view the page at {from}</p>
      <Form method="post" replace>
        <input type="hidden" name="redirectTo" value={from} />
        <label>
          Username: <input name="username" />
        </label>{" "}
        <button type="submit" disabled={isLoggingIn}>
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
        {actionData && "error" in actionData && actionData.error && (
          <p style={{ color: "red" }}>{actionData.error}</p>
        )}
      </Form>
    </div>
  );
}
