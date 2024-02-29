// scroll-restoration/routes/Layout.tsx
import { useCallback } from "react";
import {
  Link,
  Outlet,
  ScrollRestoration,
  useMatches,
  useNavigation,
} from "react-router-dom";
import type { Location } from "react-router-dom";

export default function Layout() {
  const navigation = useNavigation();

  // You can provide a custom implementation of what "key" should be used to
  // cache scroll positions for a given location.  Using the location.key will
  // provide standard browser behavior and only restore on back/forward
  // navigations.  Using location.pathname will provide more aggressive
  // restoration and will also restore on normal link navigations to a
  // previously-accessed path.  Or - go nuts and lump many pages into a
  // single key (i.e., anything /wizard/* uses the same key)!
  const getKey = useCallback(
    (location: Location, matches: ReturnType<typeof useMatches>) => {
      const match = matches.find(m => (m.handle as any)?.scrollMode);
      if ((match?.handle as any)?.scrollMode === "pathname") {
        return location.pathname;
      }
      return location.key;
    },
    []
  );

  return (
    <>
      <div
        style={{
          display: navigation.state === "idle" ? "none" : "block",
          position: "fixed",
          top: 0,
          right: 0,
          padding: "5px",
          backgroundColor: "lightgreen",
        }}
      >
        Navigating...
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          padding: "1rem",
        }}
      >
        <div>
          <div
            style={{
              position: "fixed",
              maxWidth: "20%",
              height: "100%",
              padding: "1rem",
            }}
          >
            <nav>
              <ul>
                <li style={{ margin: "1rem 0" }}>
                  <Link to="/">Home</Link>
                </li>
                <li style={{ margin: "1rem 0" }}>
                  <Link to="/restore-by-key">
                    This page restores by location.key
                  </Link>
                </li>
                <li style={{ margin: "1rem 0" }}>
                  <Link to="/restore-by-pathname">
                    This page restores by location.pathname
                  </Link>
                </li>
                <li style={{ margin: "1rem 0" }}>
                  <Link to="/link-to-hash#heading">
                    This link will link to a nested heading via hash
                  </Link>
                </li>
                <li style={{ margin: "1rem 0" }}>
                  <Link to="/restore-by-key" preventScrollReset>
                    This link will not scroll to the top
                  </Link>
                </li>
                <li style={{ margin: "1rem 0" }}>
                  <a href="https://www.google.com">
                    This links to an external site (google)
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
      {/*
        Including this component inside a data router component tree is what
        enables restoration
       */}
      <ScrollRestoration getKey={getKey} />
    </>
  );
}
