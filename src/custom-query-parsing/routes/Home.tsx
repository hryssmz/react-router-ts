// custom-query-parsing/routes/Home.tsx
import { Fragment } from "react";
import { useQueryParam } from "../lib/hooks";
import type { Pizza } from "../lib/types";

export default function Home() {
  const [pizza, setPizza] = useQueryParam<Pizza>("pizza");

  function handleChange(event: React.ChangeEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const formData = new FormData(form);

    // This complex data structure is preserved in the URL in the
    // `pizza` query parameter each time a value in the form changes!
    const newPizza: Pizza = {
      toppings: formData.getAll("toppings") as string[],
      crust: formData.get("crust") as string,
      extraSause: formData.get("extraSause") === "on",
    };

    setPizza(newPizza, { replace: true });
  }

  const toppings = [
    { label: "Pepperoni", value: "pepperoni" },
    { label: "Bell Peppers", value: "bell-peppers" },
    { label: "Olives", value: "olives" },
  ];

  const crusts = [
    { label: "Regular Crust", value: "regular" },
    { label: "Thin Crust", value: "thin" },
    { label: "Deep Dish", value: "deep-dish" },
  ];

  return (
    <div>
      <form onChange={handleChange}>
        <p>What would you like on your pizza?</p>

        <p>
          {toppings.map(({ label, value }, i) => (
            <Fragment key={value}>
              <label>
                <input
                  defaultChecked={pizza?.toppings.includes(value)}
                  type="checkbox"
                  name="toppings"
                  value={value}
                />{" "}
                {label}
              </label>
              {i < toppings.length - 1 && <br />}
            </Fragment>
          ))}
        </p>

        <p>
          {crusts.map(({ label, value }, i) => (
            <Fragment key={value}>
              <label>
                <input
                  type="radio"
                  name="crust"
                  value={value}
                  defaultChecked={pizza?.crust === value}
                />{" "}
                {label}
              </label>
              {i < crusts.length - 1 && <br />}
            </Fragment>
          ))}
        </p>

        <p>
          <label>
            <input
              type="checkbox"
              name="extraSause"
              defaultChecked={pizza?.extraSause}
            />{" "}
            Extra Sause
          </label>
        </p>
      </form>

      <hr />

      <p>The current form values are:</p>

      <pre>{JSON.stringify(pizza, null, 2)}</pre>
    </div>
  );
}
