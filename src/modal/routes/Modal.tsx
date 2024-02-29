// modal/routes/Modal.tsx
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import { getImageById } from "../lib/images";

export default function Modal() {
  const navigate = useNavigate();
  const { id } = useParams();
  const image = getImageById(Number(id));
  const buttonRef = useRef<HTMLButtonElement>(null);

  function onDismiss() {
    navigate(-1);
  }

  if (image === undefined) {
    return null;
  }

  return (
    <Dialog
      open
      aria-labelledby="label"
      onClose={onDismiss}
      TransitionProps={{onEntering: () => buttonRef.current?.focus()}}
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
      </div>
    </Dialog>
  );
}
