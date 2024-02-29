// scroll-restoration/routes/LongPage.tsx
import { useLoaderData, useLocation } from "react-router-dom";

export async function loader() {
  await new Promise(r => setTimeout(r, 1000));
  return {
    arr: new Array(100).fill(null).map((_, i) => i),
  };
}

export default function LongPage() {
  const data = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const location = useLocation();
  return (
    <>
      <h2>Long Page</h2>
      {data.arr.map(n => (
        <p key={n}>
          Item {n} on {location.pathname}
        </p>
      ))}
      <h3 id="heading">This is a linkable heading</h3>
      {data.arr.map(n => (
        <p key={n}>
          Item {n + 100} on {location.pathname}
        </p>
      ))}
    </>
  );
}
