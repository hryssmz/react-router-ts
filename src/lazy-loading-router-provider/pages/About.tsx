// lazy-loading-router-provider/pages/About.tsx
import { useLoaderData } from "react-router-dom";

export async function loader() {
  await new Promise(r => setTimeout(r, 500));
  return "I came from the About.tsx loader function!";
}

export default function About() {
  const data = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  return (
    <div>
      <h2>About</h2>
      <p>{data}</p>
    </div>
  );
}

export { About as Component };
