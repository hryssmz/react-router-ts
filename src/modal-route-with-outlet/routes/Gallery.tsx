// modal-route-with-outlet/routes/Gallery.tsx
import { Link, Outlet } from "react-router-dom";
import { images } from "../lib/images";

export default function Gallery() {
  return (
    <div style={{ padding: "0 24px" }}>
      <h2>Gallery</h2>
      <p>
        Click on an image, you'll notice that you still see this route behind
        the modal. The URL will also change as its a child route of{" "}
        <pre style={{ display: "inline" }}>/gallery</pre>{" "}
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "24px",
        }}
      >
        {images.map(image => (
          <Link key={image.id} to={`img/${image.id}`}>
            <img
              width={200}
              height={200}
              style={{
                width: "100%",
                aspectRatio: "1 / 1",
                height: "auto",
                borderRadius: "8px",
              }}
              src={image.src}
              alt={image.title}
            />
          </Link>
        ))}
        <Outlet />
      </div>
    </div>
  );
}
