// view-transitions/routes/Defer.tsx
import { Suspense, useEffect } from "react";
import { Await, defer, useLoaderData, useLocation } from "react-router-dom";

export interface LoaderData extends Record<string, unknown> {
  critical: string;
  lazy: Promise<string>;
}

export async function loader() {
  const data: LoaderData = {
    critical: "CRITICAL PATH DATA",
    lazy: new Promise<string>(r => setTimeout(() => r("LAZY DATA"), 1000)),
  };
  return defer(data);
}

export default function Defer() {
  const data = useLoaderData() as LoaderData;
  const location = useLocation();

  useEffect(() => {
    document.title = "Defer";
  }, []);

  return (
    <>
      <h1>Defer</h1>
      <p>Critical Data: {data.critical}</p>
      <Suspense
        fallback={<p>Suspense boundary in the route...</p>}
        key={location.key}
      >
        <Await resolve={data.lazy}>{value => <p>Lazy Data: {value}</p>}</Await>
      </Suspense>
    </>
  );
}
