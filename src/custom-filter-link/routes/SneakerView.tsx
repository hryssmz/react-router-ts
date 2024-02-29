// custom-filter-link/routes/SneakerView.tsx
import { useParams } from "react-router-dom";
import { getSneakerById } from "../lib/sneakers";
import NoMatch from "./NoMatch";

export default function SneakerView() {
  const { id } = useParams();

  if (id === undefined) {
    return <NoMatch />;
  }

  const sneaker = getSneakerById(id);

  if (sneaker === undefined) {
    return <NoMatch />;
  }

  const name = `${sneaker.brand} ${sneaker.model} ${sneaker.colorway}`;

  return (
    <div>
      <h2>{name}</h2>
      <img
        width={400}
        height={400}
        style={{
          borderRadius: "8px",
          maxWidth: "100%",
          aspectRatio: "1 / 1",
        }}
        src={sneaker.imageUrl}
        alt={name}
      />
    </div>
  );
}
