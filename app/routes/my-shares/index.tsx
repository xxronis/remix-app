import { Await, Link, NavLink, Outlet, useAsyncError, useAsyncValue, useFetcher, useLoaderData } from "@remix-run/react";
import { defer, LoaderArgs, LoaderFunction } from "@remix-run/node";
import { getMyShares } from "~/models/my-shares.server";
import Menu, { MenuItem } from "~/components/Menu";
import { Suspense, useEffect } from "react";
import { getSharesMenu } from "~/models/menus.server";
import Spinner from "~/components/Spinner";

export async function loader({ params }: LoaderArgs) {
  const items = getMyShares();
  const sharesMenu = await getSharesMenu();

  return defer({
    items,
    sharesMenu
  })
}

export default function MySharesRoute() {
  const {items, sharesMenu} = useLoaderData();
  // const { load: loadSharesData, ...mySharesFetcher } = useFetcher();

  // useEffect(() => {
  //   if (mySharesFetcher.type === "init") {
  //     loadSharesData('/my-shares-fetch');
  //   }
  // }, [mySharesFetcher]);

  return (
    <div>
      <main>
        <h1>My Shares</h1>
        <div>
        <Suspense fallback={<Spinner text="Loading shares menu..."/>}>
          <Await resolve={sharesMenu} errorElement={<SharesMenuError/>}>
            <SharesMenu/>
          </Await>
        </Suspense>

        <Suspense fallback={<Spinner text="Loading shares..."/>}>
          <Await resolve={items} errorElement={<SharesError/>}>
            <ItemList/>
          </Await>
        </Suspense>
            {/* <ul>
              {mySharesFetcher.state !== 'idle' && 
                <h2>Loading...</h2>
              }
              {mySharesFetcher.data && mySharesFetcher.data.items && mySharesFetcher.data.items.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={`/my-shares/item/${item.guid}`}
                    className="text-blue-600 underline"
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul> */}
        </div>
        <Outlet />
      </main>
    </div>
  );
}

function SharesError() {
  let error = useAsyncError<UseDataFunctionReturn<typeof loader>["items"]>(); // Get the rejected value
  return <p>There was an error loading items: {error.message}</p>;
}

function SharesMenuError() {
  let error = useAsyncError<UseDataFunctionReturn<typeof loader>["sharesMenu"]>(); // Get the rejected value
  return <p>There was an error loading shares menu: {error.message}</p>;
}

function ItemList() {
  let { items } = useAsyncValue();

  return (
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
        ))
      }
    </ul>
  );
}

function SharesMenu() {
  let { items } = useAsyncValue();

  return (
    <div className="h-80 clear-both">
      <Menu items={items}/>
    </div>
  );
}