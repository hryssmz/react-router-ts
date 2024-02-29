// error-boundaries/routes/Project.tsx
import { json, useLoaderData } from "react-router-dom";
import type { LoaderFunctionArgs } from "react-router-dom";

export interface LoaderData {
  project: {
    id: string;
    name: string;
    owner: string;
    deadline: string;
    cost: string;
  };
}

export function loader({ params }: LoaderFunctionArgs) {
  if (params.projectId === "unauthorized") {
    throw json({ contactEmail: "administrator@fake.com" }, { status: 401 });
  }

  if (params.projectId === "broken") {
    // Uh oh - in this flow we somehow didn't get our data nested under `project`
    // and instead got it at the root - this will cause a render error!
    return json({
      id: params.projectId,
      name: "Break Some Stuff",
      owner: "The Joker",
      deadline: "June 2022",
      cost: "FREE",
    });
  }

  return json({
    project: {
      id: params.projectId,
      name: "Build Some Stuff",
      owner: "Joe",
      deadline: "June 2022",
      cost: "$5,000 USD",
    },
  });
}

export default function Project() {
  const { project } = useLoaderData() as LoaderData;

  return (
    <>
      <h1>Project Name: {project.name}</h1>
      <p>Owner: {project.owner}</p>
      <p>Deadline: {project.deadline}</p>
      <p>Cost: {project.cost}</p>
    </>
  );
}
