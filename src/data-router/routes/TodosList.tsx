// data-router/routes/TodosList.tsx
import { useEffect, useRef, useState } from "react";
import {
  Form,
  Link,
  Outlet,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import TodoItem from "../components/TodoItem";
import { addTodo, deleteTodo, getTodos } from "../lib/todos";
import { sleep } from "../lib/utils";
import type { ActionFunctionArgs } from "react-router-dom";

export async function loader() {
  await sleep();
  return getTodos();
}

export async function action({ request }: ActionFunctionArgs) {
  await sleep();
  const formData = await request.formData();

  // Deletion via fetcher
  if (formData.get("action") === "delete") {
    const id = formData.get("todoId");
    if (typeof id === "string") {
      deleteTodo(id);
      return { ok: true };
    }
  }

  // Addition via <Form>
  const todo = formData.get("todo");
  if (typeof todo === "string") {
    addTodo(todo);
  }

  return new Response(null, {
    status: 302,
    headers: { Location: "/todos" },
  });
}

export default function TodosList() {
  const todos = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const navigation = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);

  // If we add and then we delete - this will keep isAdding=true until the
  // fetcher completes it's revalidation
  const [isAdding, setIsAdding] = useState(false);
  useEffect(() => {
    if (navigation.formData?.get("action") === "add") {
      setIsAdding(true);
    } else if (navigation.state === "idle") {
      setIsAdding(false);
      formRef.current?.reset();
    }
  }, [navigation]);

  return (
    <>
      <h2>Todos</h2>
      <p>
        This todo app uses a &lt;Form&gt; to submit new todos and a
        &lt;fetcher.form&gt; to delete todos. Click on a todo item to navigate
        to the /todos/:id route.
      </p>
      <ul>
        <li>
          <Link to="/todos/junk">
            Click this link to force an error in the loader
          </Link>
        </li>
        {Object.entries(todos).map(([id, todo]) => (
          <li key={id}>
            <TodoItem id={id} todo={todo} />
          </li>
        ))}
      </ul>
      <Form method="post" ref={formRef}>
        <input type="hidden" name="action" value="add" />
        <input name="todo" />
        <button type="submit" disabled={isAdding}>
          {isAdding ? "Adding..." : "Add"}
        </button>
      </Form>
      <Outlet />
    </>
  );
}
