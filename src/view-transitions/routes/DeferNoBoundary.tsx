// view-transitions/routes/DeferNoBoundary.tsx
import { useEffect } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import type { LoaderFunctionArgs } from "react-router-dom";

export interface LoaderData extends Record<string, unknown> {
  value: string;
  critical: string;
  lazy: Promise<string>;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const value = new URL(request.url).searchParams.get("value") ?? "";
  const data: LoaderData = {
    value,
    critical: `CRITICAL PATH DATA - NO BOUNDARY ${value}`,
    lazy: new Promise<string>(r =>
      setTimeout(() => r(`LAZY DATA - NO BOUNDARY ${value}`), 1000)
    ),
  };
  return defer(data);
}

export default function DeferNoBoundary() {
  const data = useLoaderData() as LoaderData;

  useEffect(() => {
    document.title = "Defer (No Boundary)";
  }, []);

  return (
    <>
      <h1>Defer No Boundary {data.value}</h1>
      <p>Critical Data: {data.critical}</p>
      <div>
        <Await resolve={data.lazy}>{value => <p>Lazy Data: {value}</p>}</Await>
      </div>
    </>
  );
}
