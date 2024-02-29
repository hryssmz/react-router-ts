// data-router/routes/DeferredPage.tsx
import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import RenderAwaitedData from "../components/RenderAwaitedData";
import RenderAwaitedError from "../components/RenderAwaitedError";

const rand = () => Math.round(Math.random() * 100);
const resolve = (d: string, ms: number) =>
  new Promise(r => setTimeout(() => r(`${d} - ${rand()}`), ms));
const reject = (d: Error | string, ms: number) =>
  new Promise((_, r) =>
    setTimeout(() => {
      if (d instanceof Error) {
        d.message += ` - ${rand()}`;
      } else {
        d += ` - ${rand()}`;
      }
      r(d);
    }, ms)
  );

export interface DeferredRouteLoaderData {
  critical1: string;
  critical2: string;
  lazyResolved: Promise<string>;
  lazy1: Promise<string>;
  lazy2: Promise<string>;
  lazy3: Promise<string>;
  lazyError: Promise<string>;
}

export async function loader() {
  return defer({
    critical1: await resolve("Critical 1", 250),
    critical2: await resolve("Critical 2", 500),
    lazyResolved: Promise.resolve("Lazy Data immediately resolved - " + rand()),
    lazy1: resolve("Lazy 1", 1000),
    lazy2: resolve("Lazy 2", 1500),
    lazy3: resolve("Lazy 3", 2000),
    lazyError: reject(new Error("Kabbom!"), 2500),
  });
}

export default function DeferredPage() {
  const data = useLoaderData() as DeferredRouteLoaderData;
  return (
    <div>
      {/* Critical data renders immediately */}
      <p>{data.critical1}</p>
      <p>{data.critical2}</p>

      {/* Pre-resolved deferred data never triggers the fallback */}
      <Suspense fallback={<p>should not see me!</p>}>
        <Await resolve={data.lazyResolved}>
          <RenderAwaitedData />
        </Await>
      </Suspense>

      {/* Deferred data can be rendered using a component + the useAsyncValue() hook */}
      <Suspense fallback={<p>loading 1...</p>}>
        <Await resolve={data.lazy1}>
          <RenderAwaitedData />
        </Await>
      </Suspense>

      <Suspense fallback={<p>loading 2...</p>}>
        <Await resolve={data.lazy2}>
          <RenderAwaitedData />
        </Await>
      </Suspense>

      {/* Or you can bypass the hook and use a render function */}
      <Suspense fallback={<p>loading 3...</p>}>
        <Await resolve={data.lazy3}>{(data: string) => <p>{data}</p>}</Await>
      </Suspense>

      {/* Deferred rejections render using the useAsyncError hook */}
      <Suspense fallback={<p>loading (error)...</p>}>
        <Await resolve={data.lazyError} errorElement={<RenderAwaitedError />}>
          <RenderAwaitedData />
        </Await>
      </Suspense>
    </div>
  );
}
