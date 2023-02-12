import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetchers,
  useLoaderData,
} from "@remix-run/react";
import styles from "./tailwind.css";
import scaffold from "./css/scaffold.css"
import { getAllMenus } from "~/models/menus.server";
import Menu from "~/components/Menu";
import Header from "./components/Header";

import NProgress from "nprogress";
import nProgressStyles from "nprogress/nprogress.css";
import { useTransition } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import TaskManager from "./components/TaskManager";
import { menuItems } from "./mocks/items/menu-items";

export const loader: LoaderFunction = async () => {
  return getAllMenus();
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: scaffold },
  { rel: "stylesheet", href: nProgressStyles }
]

// Start mock on dev mode.
// if (process.env.NODE_ENV === 'development') {
//   if (typeof document === "undefined") {
//     const { server } = require("./mocks/server");
//     server.listen();
//   } else {
//     const { worker } = require("./mocks/browser");
//     worker.start();
//   }
// }

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "A Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const { items } = useLoaderData();
  const [ working, setWorking ] = useState(0)
  let transition = useTransition();
  let fetchers = useFetchers();

  /**
   * This gets the state of every fetcher active on the app and combine it with
   * the state of the global transition (Link and Form), then use them to
   * determine if the app is idle or if it's loading.
   * Here we consider both loading and submitting as loading.
   * 
   * https://sergiodxa.com/articles/use-nprogress-in-a-remix-app
   */
  let state = useMemo<"idle" | "loading">(
    function getGlobalState() {
      let states = [
        transition.state,
        ...fetchers.map((fetcher) => fetcher.state),
      ];
      if (states.every((state) => state === "idle")) return "idle";
      return "loading";
    },
    [transition.state, fetchers]
  );

  useEffect(() => {
    // and when it's something else it means it's either submitting a form or
    // waiting for the loaders of the next location so we start it
    if (state === "loading") {
      NProgress.start();
      setWorking(30)
      setTimeout(() => setWorking(0), 6000)
    }
    // when the state is idle then we can to complete the progress bar
    if (state === "idle") {
      NProgress.done();
      // setWorking(0)
    }
  }, [transition.state]);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
          <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
            <div className="py-4 text-gray-500 dark:text-gray-400">
              <a className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="/">
                E-share
              </a>
              <Menu items={items} preFetch={true}/>
            </div>
          </aside>

          <div className="flex flex-col flex-1 relative">
            <Header />
            <main className="h-full pb-16 overflow-y-auto">
              <div className="container px-6 mx-auto grid">
                <div className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                  <Outlet />
                </div>
              </div>
              {working > 0 &&
                <TaskManager percentage={working}/>
              }
            </main>
          </div>
          
        </div>
        
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
