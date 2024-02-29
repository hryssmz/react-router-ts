// auth-router-provider/routes/Logout.tsx
import { redirect } from "react-router-dom";
import { fakeAuthProvider } from "../lib/auth";

export async function action() {
  await fakeAuthProvider.signout();
  return redirect("/");
}
