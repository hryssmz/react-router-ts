// view-transitions/routes/Loader.tsx
import { useEffect } from "react";
import { json, useLoaderData } from "react-router-dom";

export interface LoaderData {
  message: string;
}

export async function loader() {
  await new Promise(r => setTimeout(r, 1000));
  const data: LoaderData = { message: "LOADER DATA" };
  return json(data);
}

export default function Loader() {
  const data = useLoaderData() as LoaderData;
  useEffect(() => {
    document.title = "Loader";
  }, []);
  return (
    <>
      <h1>Loader Page</h1>
      <p>Loader Data: {data.message}</p>
    </>
  );
}
