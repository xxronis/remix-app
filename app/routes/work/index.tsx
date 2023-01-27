import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getAllWorks } from "~/models/works.server";

export const loader = async () => {
  return getAllWorks();
};

export default function WorkIndexRoute() {
  const { works } = useLoaderData();
  return (
    <div>
      <p>
        I was wondering why the frisbee was getting bigger,
        then it hit me.
      </p>
      <div className="gap-2 columns-3xs">
        <ul>
          {works && works.map((work) => (
            <li key={work.slug}>
              <Link
                to={work.slug}
                className="text-blue-600 underline"
              >
                {work.title}
                <img className="w-full" src={work.image} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Outlet />
    </div>
  );
}