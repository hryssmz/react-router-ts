// data-router/components/RenderAwaitedData.tsx
import { useAsyncValue } from "react-router-dom";

export default function RenderAwaitedData() {
  const data = useAsyncValue() as string;
  return <p>{data}</p>;
}
