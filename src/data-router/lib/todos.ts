// data-router/lib/todos.ts
export interface Todos {
  [key: string]: string;
}

const TODOS_KEY = "todos";

export const uuid = () => Math.random().toString(36).substring(2, 9);

export function saveTodos(todos: Todos): void {
  return sessionStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

export function resetTodos(): Todos {
  const todos: Todos = new Array(10)
    .fill(null)
    .reduce(
      (acc, _val, index) =>
        Object.assign(acc, { [uuid()]: `Seeded Todo #${index + 1}` }),
      {}
    );
  saveTodos(todos);
  return todos;
}

export function getTodos(): Todos {
  try {
    const todos: Todos = JSON.parse(sessionStorage.getItem(TODOS_KEY) ?? "[]");
    return todos;
  } catch (e) {
    return resetTodos();
  }
}

export function addTodo(todo: string): void {
  const newTodos = { ...getTodos(), [uuid()]: todo };
  saveTodos(newTodos);
}

export function deleteTodo(id: string): void {
  const newTodos = { ...getTodos() };
  delete newTodos[id];
  saveTodos(newTodos);
}
