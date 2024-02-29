// view-transitions/routes/Action.tsx
import { useEffect } from "react";
import { json, useActionData } from "react-router-dom";

export interface ActionData {
  message: string;
}

export async function action() {
  await new Promise(r => setTimeout(r, 1000));
  const data: ActionData = { message: "ACTION DATA" };
  return json(data);
}

export default function Action() {
  const data = useActionData() as ActionData | undefined;
  useEffect(() => {
    document.title = "Action";
  }, []);
  return (
    <>
      <h1>Action Page</h1>
      <p>Action Data: {data?.message}</p>
    </>
  );
}
