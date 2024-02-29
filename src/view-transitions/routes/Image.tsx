// view-transitions/routes/Image.tsx
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { images } from "../lib/images";

export default function Image() {
  const params = useParams();

  useEffect(() => {
    document.title = `Image ${params.id}`;
  }, [params.id]);

  return (
    <div className="image-detail">
      <h1>Image Number {params.id}</h1>
      <img src={images[Number(params.id)]} alt={`${params.id}`} />
    </div>
  );
}
