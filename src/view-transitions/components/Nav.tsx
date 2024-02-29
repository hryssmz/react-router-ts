// view-transitions/components/Nav.tsx
import { Form, Link, useNavigate, useSubmit } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  const submit = useSubmit();
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" unstable_viewTransition>
            Home
          </Link>
          <ul>
            <li>
              The / route has no loader is should be an immediate/synchronous
              transition
            </li>
          </ul>
        </li>
        <li>
          <Link to="/loader" unstable_viewTransition>
            Loader with delay
          </Link>{" "}
          <button
            style={{ display: "inline-block" }}
            onClick={() =>
              navigate("/loader", { unstable_viewTransition: true })
            }
          >
            via useNavigate
          </button>
          <ul>
            <li>
              The /loader route has a 1 second loader delay, and updates the DOM
              synchronously upon completion
            </li>
          </ul>
        </li>
        <li>
          <Form
            method="post"
            action="/action"
            style={{ display: "inline-block" }}
            unstable_viewTransition
          >
            <button type="submit" style={{ display: "inline-block" }}>
              Action with delay
            </button>
          </Form>{" "}
          <button
            style={{ display: "inline-block" }}
            onClick={() =>
              submit(
                {},
                {
                  method: "post",
                  action: "/action",
                  unstable_viewTransition: true,
                }
              )
            }
          >
            via useSubmit
          </button>
          <ul>
            <li>
              The /action route has a 1 second action delay, and updates the DOM
              synchronously upon completion
            </li>
          </ul>
        </li>
        <li>
          <Link to="/images" unstable_viewTransition>
            Image Gallery Example
          </Link>
        </li>
        <li>
          <Link to="/defer" unstable_viewTransition>
            Deferred Data
          </Link>
          <ul>
            <li>
              The /defer route has 1s defer call that suspends and has it's own
              Suspense boundary
            </li>
          </ul>
        </li>
        <li>
          <Link to="/defer-no-boundary" unstable_viewTransition>
            Deferred Data (without boundary)
          </Link>
          <ul>
            <li>
              The /defer-no-boundary route has a 1s defer that suspends without
              a Suspense boundary in the destination route. This relies on
              React.startTransition to "freeze" the current UI until the
              deferred data resolves
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
