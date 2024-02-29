// custom-filter-link/routes/SneakerGrid.tsx
import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { filterByBrand, sneakers as allSneakers } from "../lib/sneakers";

export default function SneakerGrid() {
  const [searchParams] = useSearchParams();
  const brand = searchParams.get("brand");

  const sneakers = useMemo(() => {
    if (!brand) return allSneakers;
    return filterByBrand(brand);
  }, [brand]);

  return (
    <main>
      <h2>Sneakers</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "12px 24px",
        }}
      >
        {sneakers.map(sneaker => {
          const name = `${sneaker.brand} ${sneaker.model} ${sneaker.colorway}`;
          return (
            <div key={sneaker.id} style={{ position: "relative" }}>
              <img
                width={200}
                height={200}
                src={sneaker.imageUrl}
                alt={name}
                style={{
                  borderRadius: "8px",
                  width: "100%",
                  height: "auto",
                  aspectRatio: "1 / 1",
                }}
              />
              <Link
                style={{ position: "absolute", inset: 0 }}
                to={`/sneakers/${sneaker.id}`}
              >
                <span style={{ visibility: "hidden" }}>{name}</span>
              </Link>
              <div>
                <p>{name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
