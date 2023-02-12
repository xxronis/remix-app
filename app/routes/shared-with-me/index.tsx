import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { LinksFunction, LoaderFunction } from "@remix-run/node";
// import work from "../css/work.css"
import { getMyShares } from "~/models/my-shares.server";
import Menu from "~/components/Menu";

export const loader: LoaderFunction = async () => {
  return getMyShares();
};

// export const links: LinksFunction = () => [
//   { rel: "stylesheet", href: work }
// ];

export default function SharedWithMeRoute() {
  const { items } = useLoaderData();
  return (
    <div>
      <main>
      <h1>Shared with me</h1>
    <div>
        <ul>
          {items && items.map((item) => (
            <li key={item.name}>
              <NavLink
                to={`/my-shares/item/${item.guid}`}
                className="text-blue-600 underline"
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
    </div>
        <Outlet />
      </main>
    </div>
  );
}