// navigation-blocking/routes/ImportantForm.tsx
import { useCallback, useEffect, useState } from "react";
import { Form, json, useActionData, useBlocker } from "react-router-dom";
import ConfirmNavigation from "../components/ConfirmNavigation";
import type { BlockerFunction } from "react-router-dom";

export function action() {
  return json({ ok: true });
}

export default function ImportantForm() {
  const actionData = useActionData() as { ok: boolean } | undefined;
  const [value, setValue] = useState("");
  // Allow the submission navigation to the same route to go through
  const shouldBlock = useCallback<BlockerFunction>(
    ({ currentLocation, nextLocation }) =>
      value !== "" && currentLocation.pathname !== nextLocation.pathname,
    [value]
  );
  const blocker = useBlocker(shouldBlock);

  // Clean the input after a successful submission
  useEffect(() => {
    if (actionData?.ok) {
      setValue("");
    }
  }, [actionData]);

  // Reset the blocker if the user cleans the form
  useEffect(() => {
    if (blocker.state === "blocked" && value === "") {
      blocker.reset();
    }
  }, [blocker, value]);

  return (
    <>
      <p>
        Is the form dirty?{" "}
        {value !== "" ? (
          <span style={{ color: "red" }}>Yes</span>
        ) : (
          <span style={{ color: "green" }}>No</span>
        )}
      </p>
      <Form method="post">
        <label>
          Enter some important data:
          <input
            name="data"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </label>
        <button type="submit">Save</button>

        {blocker && <ConfirmNavigation blocker={blocker} />}
      </Form>
    </>
  );
}
