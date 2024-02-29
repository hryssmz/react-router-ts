// custom-filter-link/components/BrandLink.tsx
import { Link, useSearchParams } from "react-router-dom";
import type { LinkProps } from "react-router-dom";

export interface BrandLinkProps extends Omit<LinkProps, "to"> {
  brand: string;
}

export default function BrandLink({
  brand,
  children,
  ...props
}: BrandLinkProps) {
  const [searchParams] = useSearchParams();
  const isActive = searchParams.get("brand") === brand;

  return (
    <Link
      to={`/?brand=${brand}`}
      {...props}
      style={{ ...props.style, color: isActive ? "red" : "black" }}
    >
      {children}
    </Link>
  );
}
