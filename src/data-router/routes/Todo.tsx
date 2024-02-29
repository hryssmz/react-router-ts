// data-router/routes/Todo.tsx
import { useLoaderData, useParams } from "react-router-dom";
import { sleep } from "../lib/utils";
import { getTodos } from "../lib/todos";
import type { LoaderFunctionArgs } from "react-router-dom";

export async function loader({ params }: LoaderFunctionArgs) {
  await sleep();
  const { id } = params;
  const todos = getTodos();
  if (id === undefined) {
    throw new Error("Expected params.id");
  }
  const todo = todos[id];
  if (!todo) {
    throw new Error(`Uh oh, I couldn't find a todo with id "${id}"`);
  }
  return todo;
}

export default function Todo() {
  const params = useParams();
  const todo = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  return (
    <>
      <h2>Nested Todo Route:</h2>
      <p>id: {params.id}</p>
      <p>todo: {todo}</p>
    </>
  );
}
