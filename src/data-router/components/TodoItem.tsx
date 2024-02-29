// data-router/components/TodoItem.tsx
import { Link, useFetcher } from "react-router-dom";

export interface TodoItemProps {
  id: string;
  todo: string;
}

export default function TodoItem({ id, todo }: TodoItemProps) {
  const fetcher = useFetcher();
  const isDeleting = !!fetcher.formData;

  return (
    <>
      <Link to={`/todos/${id}`}>{todo}</Link>
      &nbsp;
      <fetcher.Form method="post" style={{ display: "inline" }}>
        <input type="hidden" name="action" value="delete" />
        <button type="submit" name="todoId" value={id} disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </fetcher.Form>
    </>
  );
}
