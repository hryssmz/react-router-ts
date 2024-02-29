// custom-filter-link/routes/Layout.tsx
import { Link, Outlet } from "react-router-dom";
import BrandLink from "../components/BrandLink";
import { brands } from "../lib/sneakers";

export default function Layout() {
  return (
    <div>
      <nav>
        <h3>Filter by brand</h3>
        <ul>
          <li>
            <Link to="/">All</Link>
          </li>
          {brands.map(brand => (
            <li key={brand}>
              <BrandLink brand={brand}>{brand}</BrandLink>
            </li>
          ))}
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
