// modal-route-with-outlet/routes/ImageView.tsx
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import { getImageById } from "../lib/images";

export default function ImageView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const image = getImageById(Number(id));
  const buttonRef = useRef<HTMLButtonElement>(null);

  if (image === undefined) {
    throw new Error(`No image found with id: ${id}`);
  }

  function onDismiss() {
    navigate(-1);
  }

  return (
    <Dialog
      open
      aria-labelledby="label"
      onClose={onDismiss}
      TransitionProps={{ onEntering: () => buttonRef.current?.focus() }}
    >
      <div
        style={{
          display: "grid",
          justifyContent: "center",
          padding: "8px 8px",
        }}
      >
        <h1 id="label" style={{ margin: 0 }}>
          {image.title}
        </h1>
        <img
          style={{
            margin: "16px 0",
            borderRadius: "8px",
            width: "100%",
            height: "auto",
          }}
          width={400}
          height={400}
          src={image.src}
          alt=""
        />
        <button
          style={{ display: "block" }}
          ref={buttonRef}
          onClick={onDismiss}
        >
          Close
        </button>
      </div>
    </Dialog>
  );
}
