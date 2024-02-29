// data-router/routes/Home.tsx
import { useLoaderData } from "react-router-dom";
import { sleep } from "../lib/utils";

export async function loader() {
  await sleep();
  return {
    date: new Date().toISOString(),
  };
}

export default function Home() {
  const data = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  return (
    <>
      <h2>Home</h2>
      <p>Date from loader: {data.date}</p>
    </>
  );
}
