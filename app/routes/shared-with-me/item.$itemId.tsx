import { Link, useLoaderData } from "@remix-run/react";
import { getShare } from "~/models/my-shares.server";

export const loader = async (guid: string) => {
  return getShare(guid);
};

export default function ShareItemRoute() {
  const {items} = useLoaderData()
    return (
      <div>
        <h1>{items[0].name} Full Preview</h1>
      </div>
    );
  }