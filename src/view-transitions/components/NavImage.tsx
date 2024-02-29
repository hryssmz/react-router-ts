// view-transitions/components/NavImage.tsx
import { Link } from "react-router-dom";
import { unstable_useViewTransitionState } from "react-router-dom";

export interface NavImageProps {
  src: string;
  idx: number;
}

export default function NavImage({ src, idx }: NavImageProps) {
  const href = `/images/${idx}`;
  const vt = unstable_useViewTransitionState(href);
  return (
    <>
      <Link to={href} unstable_viewTransition>
        <p style={{ viewTransitionName: vt ? "image-title" : "" }}>
          Image Number {idx}
        </p>
        <img
          src={src}
          alt={`Img ${idx}`}
          style={{ viewTransitionName: vt ? "image-expand" : "" }}
        />
      </Link>
    </>
  );
}
