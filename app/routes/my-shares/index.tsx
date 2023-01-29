import { Await, Link, NavLink, Outlet, useAsyncError, useAsyncValue, useFetcher, useLoaderData } from "@remix-run/react";
import { defer, LinksFunction, LoaderArgs, LoaderFunction } from "@remix-run/node";
// import work from "../css/work.css"
import { getMyShares } from "~/models/my-shares.server";
import Menu from "~/components/Menu";
import { Suspense, useEffect } from "react";

// export const loader: LoaderFunction = async () => {
//   const items = getMyShares();
  
//   return defer({
//     items
//   })
// };
export async function loader({ params }: LoaderArgs) {
  const items = await getMyShares();

  return defer({
    items
  })
}

export default function MySharesRoute() {
  // const sdf = useLoaderData();
  const {items} = useLoaderData();
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
        <Suspense fallback={<p>Loading shares...</p>}>
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
  return <p>There was an error loading reviews: {error.message}</p>;
}

function ItemList() {
  let {items} = useAsyncValue();
  console.log(items)
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