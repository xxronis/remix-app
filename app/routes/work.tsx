import { Link, Outlet } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import work from "../css/work.css"

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: work }
];

export default function WorkRoute() {
  return (
    <div>
      <Link to="/">Home</Link>
      <h1>W🤪RK</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
}