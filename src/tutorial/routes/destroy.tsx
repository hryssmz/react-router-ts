// tutorial/routes/destroy.tsx
import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";
import type { ActionFunctionArgs } from "react-router-dom";

export async function action({ params }: ActionFunctionArgs) {
  await deleteContact(params.contactId!);
  return redirect("/");
}
