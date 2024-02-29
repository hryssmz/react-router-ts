// lazy-loading-router-provider/pages/DashboardMessages.tsx
import { useLoaderData } from "react-router-dom";

export async function loader() {
  await new Promise(r => setTimeout(r, 500));
  return {
    messages: [
      "Message 1 from Dashboard.tsx loader",
      "Message 2 from Dashboard.tsx loader",
      "Message 3 from Dashboard.tsx loader",
    ],
  };
}

export default function DashboardMessages() {
  const { messages } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map(m => (
          <li key={m}>{m}</li>
        ))}
      </ul>
    </div>
  );
}

export { DashboardMessages as Component };
