// basic-data-router/Home.tsx
import { useLoaderData } from "react-router-dom";

export function loader() {
  return { message: "Hello Data Router!" };
}

export default function Home() {
  const data = useLoaderData() as ReturnType<typeof loader>;
  return <h1>{data.message}</h1>;
}
