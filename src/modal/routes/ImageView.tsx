// modal/routes/ImageView.tsx
import { useParams } from "react-router-dom";
import { getImageById } from "../lib/images";

export default function ImageView() {
  const { id } = useParams();
  const image = getImageById(Number(id));

  if (image === undefined) {
    return <div>Image not found</div>;
  }

  return (
    <div>
      <h1>{image.title}</h1>
      <img width={400} height={400} src={image.src} alt="" />
    </div>
  );
}
