import { Link, useLoaderData } from "@remix-run/react";
import { getWork } from "~/models/works.server";

export const loader = async (slug: string) => {
  return getWork(slug);
};

export default function WorkRoute() {
  const item = useLoaderData()
    return (
      <div>
        <p>{item.title} Full Preview</p>
        <img src={item.image}/>
      </div>
    );
  }