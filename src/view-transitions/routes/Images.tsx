// view-transition/routes/Images.tsx
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { images } from "../lib/images";

export default function Images() {
  useEffect(() => {
    document.title = "Images";
  }, []);

  return (
    <div className="image-list">
      <h1>Image List</h1>
      <div>
        {images.map((src, idx) => (
          // Adds 'transitioning' class to the <a> during the transition
          <NavLink key={src} to={`/images/${idx}`} unstable_viewTransition>
            <p>Image Number {idx}</p>
            <img src={src} alt={`Img ${idx}`} />
          </NavLink>

          // Render prop approach similar to isActive/isPending
          // <NavLink
          //   key={src}
          //   to={`/images/${idx}`}
          //   unstable_viewTransition
          // >
          //   {({ isTransitioning }) => (
          //     <div className={isTransitioning ? "transitioning" : ""}>
          //       <p>Image Number {idx}</p>
          //       <img src={src} alt={`Img ${idx}`} />
          //     </div>
          //   )}
          // </NavLink>

          // Manual hook based approach
          // <NavImage key={src} src={src} idx={idx} />
        ))}
      </div>
    </div>
  );
}
